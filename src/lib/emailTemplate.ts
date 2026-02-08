/**
 * Email Template for STR Compliance Report
 * Matches the red/white/black brand of PermitPatrol
 */

// Logo URL - update this to your production URL after deployment
const LOGO_URL = 'https://permitpatrol.org/images/logo.png';

export function generateComplianceReportEmail(
  name: string,
  city: string
): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
          Your Free STR Compliance Report
        </h2>
        <p style="margin: 0 0 8px 0; color: #737373; font-size: 14px;">
          Property Location: <strong style="color: #1A1A1A;">${city}</strong>
        </p>
        
        <p style="margin: 24px 0; color: #1A1A1A; font-size: 16px; line-height: 1.6;">
          Hi ${name},
        </p>
        <p style="margin: 0 0 24px 0; color: #1A1A1A; font-size: 16px; line-height: 1.6;">
          Thank you for requesting your compliance risk analysis. We've scanned city council databases, permit records, and local ordinances for ${city}. Here's what we found:
        </p>

        <!-- Risk Score Card -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #FEF2F2; border-radius: 12px; border-left: 4px solid #DC2626; margin-bottom: 24px;">
          <tr>
            <td style="padding: 20px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #DC2626; font-weight: 600;">
                      ⚠️ HIGH RISK DETECTED
                    </p>
                    <p style="margin: 0; font-size: 32px; font-weight: 700; color: #DC2626;">
                      85<span style="font-size: 18px; color: #737373;">/100</span>
                    </p>
                  </td>
                  <td style="text-align: right; vertical-align: top;">
                    <p style="margin: 0; font-size: 14px; color: #737373;">Risk Score</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Key Findings -->
        <h3 style="margin: 0 0 16px 0; color: #1A1A1A; font-size: 18px; font-weight: 600;">
          📋 Key Findings
        </h3>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
          <tr>
            <td style="padding: 12px; background-color: #FEF2F2; border-radius: 8px; margin-bottom: 8px;">
              <p style="margin: 0; color: #1A1A1A; font-size: 14px;">
                <strong style="color: #DC2626;">Estimated Fine Exposure:</strong> $5,000+
              </p>
            </td>
          </tr>
          <tr><td style="height: 8px;"></td></tr>
          <tr>
            <td style="padding: 12px; background-color: #FEF7ED; border-radius: 8px;">
              <p style="margin: 0; color: #1A1A1A; font-size: 14px;">
                <strong style="color: #D97706;">Pending Threats:</strong> 2 city council items affecting your zone
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
          ✅ Recommended Actions
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
              <a href="https://permitpatrol.org/dashboard" style="display: inline-block; background-color: #DC2626; color: #FFFFFF; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-size: 16px; font-weight: 600;">
                Get 24/7 Monitoring →
              </a>
            </td>
          </tr>
        </table>

        <p style="margin: 24px 0 0 0; color: #737373; font-size: 14px; text-align: center;">
          Want real-time alerts when city rules change? Upgrade to Premium.
        </p>
      </td>
    </tr>

    <!-- Footer with Logo -->
    <tr>
      <td style="background-color: #1A1A1A; padding: 24px; text-align: center;">
        <img src="${LOGO_URL}" alt="PermitPatrol" style="height: 32px; width: auto; margin-bottom: 12px; filter: brightness(0) invert(1);" />
        <p style="margin: 0; color: #737373; font-size: 12px;">
          Protecting STR hosts from compliance surprises.
        </p>
        <p style="margin: 16px 0 0 0; color: #737373; font-size: 11px;">
          You received this email because you requested a free compliance report.
          <br>
          <a href="#" style="color: #737373;">Unsubscribe</a> | <a href="#" style="color: #737373;">Privacy Policy</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
