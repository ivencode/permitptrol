import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Resend } from 'resend';
import { generateComplianceReportEmail } from '@/lib/emailTemplate';

const DATA_FILE = path.join(process.cwd(), 'leads.json');

// Debug: Log environment variables
console.log('🔑 RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
console.log('📧 RESEND_FROM_EMAIL:', process.env.RESEND_FROM_EMAIL || 'not set');

// Initialize Resend
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
console.log('📬 Resend initialized:', !!resend);

type Lead = {
    name: string;
    email: string;
    city: string;
    country: string;
    timestamp: string;
    emailSent: boolean;
};

function getLeads(): Lead[] {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf-8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Error reading leads:', error);
    }
    return [];
}

function saveLeads(leads: Lead[]): void {
    fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2));
}

export async function POST(request: NextRequest) {
    console.log('📥 POST /api/leads received');

    try {
        const body = await request.json();
        console.log('📦 Request body:', body);

        const { name, email, city, country } = body;

        if (!name || !email || !city || !country) {
            console.log('❌ Missing fields:', { name: !!name, email: !!email, city: !!city, country: !!country });
            return NextResponse.json({ error: 'Name, email, city and country are required' }, { status: 400 });
        }

        const leads = getLeads();

        // Check for duplicate
        const existingLead = leads.find(lead => lead.email === email);
        if (existingLead) {
            console.log('⚠️ Duplicate email:', email);
            return NextResponse.json({ message: 'Email already registered', duplicate: true }, { status: 200 });
        }

        let emailSent = false;

        // Send email if Resend is configured
        if (resend) {
            console.log('📤 Attempting to send email to:', email);
            try {
                const fromEmail = process.env.RESEND_FROM_EMAIL || 'PermitPatrol <onboarding@resend.dev>';
                console.log('📨 From:', fromEmail);

                const result = await resend.emails.send({
                    from: fromEmail,
                    to: email,
                    subject: `Your Free STR Compliance Report for ${city}, ${country}`,
                    html: generateComplianceReportEmail(name, city)
                });

                console.log('✅ Email sent successfully:', result);
                emailSent = true;
            } catch (emailError: any) {
                console.error('❌ Email sending failed:', emailError);
                console.error('❌ Error details:', emailError?.message || emailError);
            }
        } else {
            console.log('⚠️ Resend not configured - skipping email');
        }

        // Add new lead
        leads.push({
            name,
            email,
            city,
            country,
            timestamp: new Date().toISOString(),
            emailSent
        });

        saveLeads(leads);
        console.log('💾 Lead saved:', { name, email, city, country, emailSent });

        return NextResponse.json({
            message: 'Report sent successfully!',
            emailSent,
            count: leads.length
        }, { status: 201 });
    } catch (error: any) {
        console.error('❌ Error processing request:', error);
        console.error('❌ Error stack:', error?.stack);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const leads = getLeads();
        return NextResponse.json({ leads, count: leads.length });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
    }
}
