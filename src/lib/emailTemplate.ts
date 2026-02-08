/**
 * Email Templates for PermitPatrol
 * Matches the red/white/black brand
 */

// Logo URL - production URL
const LOGO_URL = 'https://permitpatrol.org/images/logo.png';
const WEBSITE_URL = 'https://permitpatrol.org';

// Email configuration for better deliverability
export const emailConfig = {
  replyTo: 'support@permitpatrol.org',
  // List-Unsubscribe header helps prevent spam flags
  unsubscribeUrl: 'https://permitpatrol.org/unsubscribe',
};

/**
 * Overflow Confirmation Email
 * Sent when we have high demand and the report will be delayed
 */
export function generateOverflowConfirmationEmail(
  name: string,
  city: string,
  country: string
): { html: string; text: string } {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>We're Working on Your Report</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAFAFA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF;">
    
    <!-- Header with Logo -->
    <tr>
      <td style="background-color: #FFFFFF; padding: 24px; text-align: center; border-bottom: 1px solid #E5E5E5;">
        <img src="${LOGO_URL}" alt="PermitPatrol" style="height: 48px; width: auto;" />
      </td>
    </tr>

    <!-- Main Content -->
    <tr>
      <td style="padding: 32px 24px;">
        <h2 style="margin: 0 0 16px 0; color: #1A1A1A; font-size: 24px; font-weight: 700;">
          Thanks for Your Request, ${name}!
        </h2>
        
        <p style="margin: 0 0 16px 0; color: #1A1A1A; font-size: 16px; line-height: 1.6;">
          Great news — we've received your compliance report request for <strong>${city}, ${country}</strong>.
        </p>

        <!-- Status Card -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #FEF7ED; border-radius: 12px; border-left: 4px solid #D97706; margin: 24px 0;">
          <tr>
            <td style="padding: 20px;">
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #D97706; font-weight: 600;">
                High Demand Notice
              </p>
              <p style="margin: 0; font-size: 16px; color: #1A1A1A; line-height: 1.5;">
                Due to overwhelming interest, we're experiencing <strong>higher-than-usual request volume</strong>. Your personalized STR Compliance Report will be delivered to your inbox within the next <strong>12 hours</strong>.
              </p>
            </td>
          </tr>
        </table>

        <p style="margin: 24px 0; color: #1A1A1A; font-size: 16px; line-height: 1.6;">
          We take extra time to ensure your report is accurate and actionable. Our team is scanning:
        </p>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
          <tr>
            <td style="padding: 10px 0;">
              <p style="margin: 0; color: #1A1A1A; font-size: 14px;">
                ✓ City council meeting agendas and minutes
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0;">
              <p style="margin: 0; color: #1A1A1A; font-size: 14px;">
                ✓ Short-term rental permit databases
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0;">
              <p style="margin: 0; color: #1A1A1A; font-size: 14px;">
                ✓ Local ordinance changes and proposals
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0;">
              <p style="margin: 0; color: #1A1A1A; font-size: 14px;">
                ✓ Zoning regulation updates
              </p>
            </td>
          </tr>
        </table>

        <!-- What to do while waiting -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F5F5F5; border-radius: 12px; margin-bottom: 24px;">
          <tr>
            <td style="padding: 20px;">
              <p style="margin: 0 0 12px 0; font-size: 16px; color: #1A1A1A; font-weight: 600;">
                While you wait:
              </p>
              <p style="margin: 0; font-size: 14px; color: #737373; line-height: 1.6;">
                Add <strong>noreply@permitpatrol.org</strong> to your contacts to ensure our report reaches your inbox (not spam).
              </p>
            </td>
          </tr>
        </table>

        <p style="margin: 0; color: #737373; font-size: 14px; text-align: center;">
          Questions? Reply to this email and we'll help you out.
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #1A1A1A; padding: 24px; text-align: center;">
        <img src="${LOGO_URL}" alt="PermitPatrol" style="height: 32px; width: auto; margin-bottom: 12px; filter: brightness(0) invert(1);" />
        <p style="margin: 0; color: #737373; font-size: 12px;">
          Protecting STR hosts from compliance surprises.
        </p>
        <p style="margin: 16px 0 0 0; color: #737373; font-size: 11px;">
          PermitPatrol · Dortmund, Germany<br>
          <a href="${WEBSITE_URL}/unsubscribe" style="color: #737373;">Unsubscribe</a> · <a href="${WEBSITE_URL}/privacy" style="color: #737373;">Privacy Policy</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  const text = `Thanks for Your Request, ${name}!

Great news — we've received your compliance report request for ${city}, ${country}.

HIGH DEMAND NOTICE
Due to overwhelming interest, we're experiencing higher-than-usual request volume. Your personalized STR Compliance Report will be delivered to your inbox within the next 12 hours.

We take extra time to ensure your report is accurate and actionable. Our team is scanning:
• City council meeting agendas and minutes
• Short-term rental permit databases  
• Local ordinance changes and proposals
• Zoning regulation updates

WHILE YOU WAIT:
Add noreply@permitpatrol.org to your contacts to ensure our report reaches your inbox (not spam).

Questions? Reply to this email and we'll help you out.

---
PermitPatrol
Protecting STR hosts from compliance surprises.
https://permitpatrol.org

Unsubscribe: ${WEBSITE_URL}/unsubscribe
`;

  return { html, text };
}

/**
 * Full Compliance Report Email
 * The actual report with findings
 */
export function generateComplianceReportEmail(
  name: string,
  city: string
): { html: string; text: string } {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>Your STR Compliance Report</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAFAFA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF;">
    
    <!-- Header with Logo -->
    <tr>
      <td style="background-color: #FFFFFF; padding: 24px; text-align: center; border-bottom: 1px solid #E5E5E5;">
        <img src="${LOGO_URL}" alt="PermitPatrol" style="height: 48px; width: auto;" />
      </td>
    </tr>

    <!-- Main Content -->
    <tr>
      <td style="padding: 32px 24px;">
        <h2 style="margin: 0 0 16px 0; color: #1A1A1A; font-size: 28px; font-weight: 700;">
          Your STR Compliance Report
        </h2>
        <p style="margin: 0 0 8px 0; color: #737373; font-size: 14px;">
          Property Location: <strong style="color: #1A1A1A;">${city}</strong>
        </p>
        
        <p style="margin: 24px 0; color: #1A1A1A; font-size: 16px; line-height: 1.6;">
          Hi ${name},
        </p>
        <p style="margin: 0 0 24px 0; color: #1A1A1A; font-size: 16px; line-height: 1.6;">
          Thank you for requesting your compliance analysis. We've reviewed city council databases, permit records, and local ordinances for ${city}. Here's what we found:
        </p>

        <!-- Risk Score Card -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #FEF2F2; border-radius: 12px; border-left: 4px solid #DC2626; margin-bottom: 24px;">
          <tr>
            <td style="padding: 20px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #DC2626; font-weight: 600;">
                      Attention Recommended
                    </p>
                    <p style="margin: 0; font-size: 32px; font-weight: 700; color: #DC2626;">
                      85<span style="font-size: 18px; color: #737373;">/100</span>
                    </p>
                  </td>
                  <td style="text-align: right; vertical-align: top;">
                    <p style="margin: 0; font-size: 14px; color: #737373;">Compliance Score</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Key Findings -->
        <h3 style="margin: 0 0 16px 0; color: #1A1A1A; font-size: 18px; font-weight: 600;">
          Key Findings
        </h3>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
          <tr>
            <td style="padding: 12px; background-color: #FEF2F2; border-radius: 8px; margin-bottom: 8px;">
              <p style="margin: 0; color: #1A1A1A; font-size: 14px;">
                <strong style="color: #DC2626;">Potential Fine Exposure:</strong> $5,000+
              </p>
            </td>
          </tr>
          <tr><td style="height: 8px;"></td></tr>
          <tr>
            <td style="padding: 12px; background-color: #FEF7ED; border-radius: 8px;">
              <p style="margin: 0; color: #1A1A1A; font-size: 14px;">
                <strong style="color: #D97706;">Pending Items:</strong> 2 city council items affecting your zone
              </p>
            </td>
          </tr>
          <tr><td style="height: 8px;"></td></tr>
          <tr>
            <td style="padding: 12px; background-color: #F5F5F5; border-radius: 8px;">
              <p style="margin: 0; color: #1A1A1A; font-size: 14px;">
                <strong>Permit Status:</strong> Verification recommended
              </p>
            </td>
          </tr>
        </table>

        <!-- Action Items -->
        <h3 style="margin: 0 0 16px 0; color: #1A1A1A; font-size: 18px; font-weight: 600;">
          Recommended Next Steps
        </h3>
        
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 32px;">
          <tr>
            <td style="padding: 8px 0;">
              <p style="margin: 0; color: #1A1A1A; font-size: 14px; line-height: 1.5;">
                1. <strong>Review your current permit status</strong> – Verify expiration date
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0;">
              <p style="margin: 0; color: #1A1A1A; font-size: 14px; line-height: 1.5;">
                2. <strong>Check city council agenda</strong> – Zone B ban proposal pending
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0;">
              <p style="margin: 0; color: #1A1A1A; font-size: 14px; line-height: 1.5;">
                3. <strong>Update safety documentation</strong> – Fire extinguisher cert may be required
              </p>
            </td>
          </tr>
        </table>

        <!-- CTA Button -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="text-align: center;">
              <a href="${WEBSITE_URL}/dashboard" style="display: inline-block; background-color: #DC2626; color: #FFFFFF; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-size: 16px; font-weight: 600;">
                Get 24/7 Monitoring
              </a>
            </td>
          </tr>
        </table>

        <p style="margin: 24px 0 0 0; color: #737373; font-size: 14px; text-align: center;">
          Want real-time alerts when city rules change? Upgrade to Premium.
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #1A1A1A; padding: 24px; text-align: center;">
        <img src="${LOGO_URL}" alt="PermitPatrol" style="height: 32px; width: auto; margin-bottom: 12px; filter: brightness(0) invert(1);" />
        <p style="margin: 0; color: #737373; font-size: 12px;">
          Protecting STR hosts from compliance surprises.
        </p>
        <p style="margin: 16px 0 0 0; color: #737373; font-size: 11px;">
          PermitPatrol · Dortmund, Germany<br>
          You received this email because you requested a compliance report.<br>
          <a href="${WEBSITE_URL}/unsubscribe" style="color: #737373;">Unsubscribe</a> · <a href="${WEBSITE_URL}/privacy" style="color: #737373;">Privacy Policy</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  const text = `YOUR STR COMPLIANCE REPORT
Property Location: ${city}

Hi ${name},

Thank you for requesting your compliance analysis. We've reviewed city council databases, permit records, and local ordinances for ${city}. Here's what we found:

COMPLIANCE SCORE: 85/100 - Attention Recommended

KEY FINDINGS:
• Potential Fine Exposure: $5,000+
• Pending Items: 2 city council items affecting your zone
• Permit Status: Verification recommended

RECOMMENDED NEXT STEPS:
1. Review your current permit status – Verify expiration date
2. Check city council agenda – Zone B ban proposal pending
3. Update safety documentation – Fire extinguisher cert may be required

Get 24/7 Monitoring: ${WEBSITE_URL}/dashboard

Want real-time alerts when city rules change? Upgrade to Premium.

---
PermitPatrol
Protecting STR hosts from compliance surprises.
https://permitpatrol.org

Unsubscribe: ${WEBSITE_URL}/unsubscribe
`;

  return { html, text };
}

