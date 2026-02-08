import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateComplianceReportEmail } from '@/lib/emailTemplate';

// In-memory storage for leads (resets on cold start, but email sending is the priority)
// For persistent storage, consider using Vercel KV, Supabase, or Neon
let inMemoryLeads: Lead[] = [];

type Lead = {
    name: string;
    email: string;
    city: string;
    country: string;
    timestamp: string;
    emailSent: boolean;
};

export async function POST(request: NextRequest) {
    console.log('📥 POST /api/leads received');

    // Debug environment variables (logged on each request for Vercel)
    console.log('🔑 RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    console.log('🔑 RESEND_API_KEY length:', process.env.RESEND_API_KEY?.length || 0);
    console.log('📧 RESEND_FROM_EMAIL:', process.env.RESEND_FROM_EMAIL || 'not set');

    try {
        const body = await request.json();
        console.log('📦 Request body:', body);

        const { name, email, city, country } = body;

        if (!name || !email || !city || !country) {
            console.log('❌ Missing fields:', { name: !!name, email: !!email, city: !!city, country: !!country });
            return NextResponse.json({ error: 'Name, email, city and country are required' }, { status: 400 });
        }

        // Check for duplicate in memory
        const existingLead = inMemoryLeads.find(lead => lead.email === email);
        if (existingLead) {
            console.log('⚠️ Duplicate email (in-memory):', email);
            // Still allow re-sending email if requested
        }

        let emailSent = false;
        let emailError: string | null = null;

        // Initialize Resend client for this request
        const apiKey = process.env.RESEND_API_KEY;

        if (!apiKey) {
            console.error('❌ RESEND_API_KEY is not configured in Vercel environment variables!');
            emailError = 'Email service not configured';
        } else {
            const resend = new Resend(apiKey);
            const fromEmail = process.env.RESEND_FROM_EMAIL || 'PermitPatrol <onboarding@resend.dev>';

            console.log('📤 Attempting to send email to:', email);
            console.log('📨 From:', fromEmail);

            try {
                const result = await resend.emails.send({
                    from: fromEmail,
                    to: email,
                    subject: `Your Free STR Compliance Report for ${city}, ${country}`,
                    html: generateComplianceReportEmail(name, city)
                });

                console.log('✅ Email API response:', JSON.stringify(result, null, 2));

                if (result.error) {
                    console.error('❌ Resend API error:', result.error);
                    emailError = result.error.message || 'Unknown email error';
                } else if (result.data?.id) {
                    console.log('✅ Email sent successfully! ID:', result.data.id);
                    emailSent = true;
                }
            } catch (sendError: any) {
                console.error('❌ Email sending exception:', sendError);
                console.error('❌ Error name:', sendError?.name);
                console.error('❌ Error message:', sendError?.message);
                console.error('❌ Error stack:', sendError?.stack);
                emailError = sendError?.message || 'Failed to send email';
            }
        }

        // Store lead in memory (temporary - for production, use a database)
        const newLead: Lead = {
            name,
            email,
            city,
            country,
            timestamp: new Date().toISOString(),
            emailSent
        };

        if (!existingLead) {
            inMemoryLeads.push(newLead);
        }

        console.log('💾 Lead processed:', { name, email, city, country, emailSent, emailError });

        // Return success even if email failed (so user gets feedback)
        // But include emailSent status so frontend can handle it
        return NextResponse.json({
            message: emailSent ? 'Report sent successfully!' : 'Registered, but email may be delayed',
            emailSent,
            emailError: emailError || undefined,
            lead: newLead
        }, { status: 201 });

    } catch (error: any) {
        console.error('❌ Error processing request:', error);
        console.error('❌ Error stack:', error?.stack);
        return NextResponse.json({
            error: 'Failed to process request',
            details: error?.message
        }, { status: 500 });
    }
}

export async function GET() {
    // Return in-memory leads (for debugging)
    return NextResponse.json({
        leads: inMemoryLeads,
        count: inMemoryLeads.length,
        note: 'In-memory storage - resets on cold start'
    });
}
