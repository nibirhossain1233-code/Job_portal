const nodemailer = require("nodemailer");

// ==========================================
// 1. Create Nodemailer Transporter
// ==========================================

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ==========================================
// 2. Escape HTML (Security)
// ==========================================

const escapeHtml = (value) => {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// ==========================================
// 3. Email Content Configuration
// ==========================================

const emailContents = {
  "signup-otp": {
    subject: "Verify Your Email | JobBoard",
    section: "Account verification",
    heading: "Verify your email address",
    message:
      "Welcome to JobBoard! Thank you for creating your account. To complete your registration and get started, please verify your email address using the one-time verification code below.",
    otpLabel: "YOUR VERIFICATION CODE",
    instruction:
      "Enter this code on the verification page to activate your account. If the code expires, you can request a new one from the website.",
    warning:
      "Didn't create a JobBoard account? No action is required. You can safely ignore this email.",
    footer:
      "This is an automated email sent regarding your account registration. Please do not reply to this message.",
  },

  "otp-resend": {
    subject: "Resend Verification Code | JobBoard",
    section: "Account verification",
    heading: "Your new verification code",
    message:
      "As requested, we've generated a new verification code for your JobBoard account. Please use the one-time verification code below to complete your email verification.",
    otpLabel: "YOUR NEW VERIFICATION CODE",
    instruction:
      "Enter this new code on the verification page to activate your account. Your previous verification code is no longer valid.",
    warning:
      "Didn't request a new verification code? No action is required. You can safely ignore this email.",
    footer:
      "This is an automated email sent regarding your account verification. Please do not reply to this message.",
  },

  "forgot-password": {
    subject: "Forgot Password | JobBoard",
    section: "Password recovery",
    heading: "Reset your password",
    message:
      "We received a request to reset the password for your JobBoard account. To continue and create a new password, please use the one-time verification code below.",
    otpLabel: "YOUR PASSWORD RESET CODE",
    instruction:
      "Enter this code on the password reset page to verify your identity and create a new password. If the code expires, you can request a new one from the website.",
    warning:
      "Didn't request a password reset? No action is required. You can safely ignore this email. Your password will remain unchanged.",
    footer:
      "This is an automated email sent regarding your account security. Please do not reply to this message.",
  },
};

// ==========================================
// 4. Email HTML Template
// ==========================================

const generateEmailTemplate = (name, otp, otpType) => {
  const content = emailContents[otpType];

  // Check OTP type
  if (!content) {
    throw new Error(`Invalid email type: ${otpType}`);
  }

  // Escape dynamic values
  const safeName = escapeHtml(name);
  const safeOtp = escapeHtml(otp);

  return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.subject}</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #f1f5f9;
  font-family: Arial, Helvetica, sans-serif;
  color: #334155;
">

  <table
    border="0"
    cellpadding="0"
    cellspacing="0"
    role="presentation"
    width="100%"
    style="background-color: #f1f5f9; padding: 32px 12px;"
  >

    <tr>
      <td align="center">

        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          width="100%"
          style="
            max-width: 600px;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
          "
        >

          <!-- Header -->

          <tr>
            <td style="
              background-color: #172554;
              padding: 30px 32px;
            ">

              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                width="100%"
              >

                <tr>
                  <td align="left">

                    <p style="
                      margin: 0;
                      color: #ffffff;
                      font-size: 29px;
                      line-height: 1.3;
                      font-weight: 700;
                      letter-spacing: -0.8px;
                    ">
                      Job<span style="color: #60a5fa;">Board</span>
                    </p>

                    <p style="
                      margin: 7px 0 0;
                      color: #cbd5e1;
                      font-size: 13px;
                      line-height: 1.6;
                    ">
                      Your next career starts here.
                    </p>

                  </td>
                </tr>

              </table>

            </td>
          </tr>

          <!-- Main Content -->

          <tr>
            <td style="padding: 36px 32px 32px;">

              <p style="
                margin: 0 0 12px;
                color: #2563eb;
                font-size: 12px;
                font-weight: 700;
                letter-spacing: 1.5px;
                text-transform: uppercase;
              ">
                ${content.section}
              </p>

              <h1 style="
                margin: 0 0 20px;
                color: #172554;
                font-size: 27px;
                line-height: 1.35;
                font-weight: 700;
              ">
                ${content.heading}
              </h1>

              <p style="
                margin: 0 0 14px;
                color: #334155;
                font-size: 15px;
                line-height: 1.8;
              ">
                Hello ${safeName},
              </p>

              <p style="
                margin: 0 0 26px;
                color: #475569;
                font-size: 15px;
                line-height: 1.8;
              ">
                ${content.message}
              </p>

              <!-- OTP Box -->

              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                width="100%"
                style="
                  background-color: #eff6ff;
                  border: 1px solid #bfdbfe;
                  border-radius: 10px;
                "
              >

                <tr>
                  <td align="center" style="padding: 28px 16px;">

                    <p style="
                      margin: 0 0 16px;
                      color: #475569;
                      font-size: 11px;
                      line-height: 1.5;
                      font-weight: 700;
                      letter-spacing: 2px;
                    ">
                      ${content.otpLabel}
                    </p>

                    <p style="
                      margin: 0;
                      color: #1d4ed8;
                      font-size: 36px;
                      line-height: 1.4;
                      font-weight: 700;
                      letter-spacing: 8px;
                    ">
                      ${safeOtp}
                    </p>

                    <p style="
                      margin: 16px 0 0;
                      color: #475569;
                      font-size: 13px;
                      line-height: 1.7;
                    ">
                      This code expires in <strong>5 minutes</strong>.
                    </p>

                  </td>
                </tr>

              </table>

              <!-- Instruction -->

              <p style="
                margin: 24px 0;
                color: #475569;
                font-size: 14px;
                line-height: 1.8;
              ">
                ${content.instruction}
              </p>

              <!-- Security Notice -->

              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                width="100%"
                style="
                  background-color: #f8fafc;
                  border-left: 3px solid #3b82f6;
                "
              >

                <tr>
                  <td style="padding: 16px 18px;">

                    <p style="
                      margin: 0 0 6px;
                      color: #172554;
                      font-size: 14px;
                      font-weight: 700;
                    ">
                      Keep your account secure
                    </p>

                    <p style="
                      margin: 0;
                      color: #64748b;
                      font-size: 13px;
                      line-height: 1.8;
                    ">
                      Never share this code with anyone. JobBoard will never ask you to disclose your verification code over the phone or through a personal message.
                    </p>

                  </td>
                </tr>

              </table>

              <!-- Warning -->

              <p style="
                margin: 26px 0 0;
                color: #64748b;
                font-size: 13px;
                line-height: 1.8;
              ">
                ${content.warning}
              </p>

              <!-- Regards -->

              <p style="
                margin: 28px 0 0;
                color: #475569;
                font-size: 14px;
                line-height: 1.8;
              ">
                Best regards,<br>
                <strong style="color: #172554;">
                  The JobBoard Team
                </strong>
              </p>

            </td>
          </tr>

          <!-- Footer -->

          <tr>
            <td
              align="center"
              style="
                background-color: #f8fafc;
                border-top: 1px solid #e2e8f0;
                padding: 24px 20px;
              "
            >

              <p style="
                margin: 0;
                color: #172554;
                font-size: 21px;
                font-weight: 700;
              ">
                Job<span style="color: #3b82f6;">Board</span>
              </p>

              <p style="
                margin: 8px 0 16px;
                color: #64748b;
                font-size: 12px;
                line-height: 1.7;
              ">
                Connecting talent with opportunity.
              </p>

              <p style="
                margin: 0;
                color: #94a3b8;
                font-size: 11px;
                line-height: 1.8;
              ">
                ${content.footer}
              </p>

              <p style="
                margin: 16px 0 0;
                color: #94a3b8;
                font-size: 11px;
                line-height: 1.7;
              ">
                © 2026 JobBoard. All rights reserved.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>

  </table>

</body>
</html>
  `;
};

// ==========================================
// 5. Plain Text Email Template
// ==========================================

const generatePlainText = (name, otp, otpType) => {
  const content = emailContents[otpType];

  return `
JobBoard

Your next career starts here.

${content.heading}

Hello ${name},

${content.message}

${content.otpLabel}: ${otp}

This code expires in 5 minutes.

${content.instruction}

Keep your account secure.

Never share this code with anyone. JobBoard will never ask you to disclose your verification code over the phone or through a personal message.

${content.warning}

Best regards,
The JobBoard Team

Connecting talent with opportunity.

${content.footer}

© 2026 JobBoard. All rights reserved.
  `.trim();
};

// ==========================================
// 6. Send Email Function
// ==========================================

exports.sendEmail = async (email, otp, name, otpType) => {
  // Validate required fields

  if (!email || !otp || !name || !otpType) {
    throw new Error("Email, OTP, name and OTP type are required");
  }

  // Validate email format

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new Error("Invalid email address");
  }

  // Validate OTP type

  if (!emailContents[otpType]) {
    throw new Error(`Invalid OTP email type: ${otpType}`);
  }

  // Validate SMTP configuration

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error(
      "SMTP_USER or SMTP_PASS is missing in environment variables",
    );
  }

  // Generate email content

  const emailHtml = generateEmailTemplate(name, otp, otpType);

  const emailText = generatePlainText(name, otp, otpType);

  const emailSubject = emailContents[otpType].subject;

  try {
    // Send Email

    const info = await transporter.sendMail({
      from: {
        name: "JobBoard",
        address: process.env.SMTP_USER,
      },

      to: email,

      subject: emailSubject,

      text: emailText,

      html: emailHtml,
    });
    console.log("Message sent: %s", info.messageId);
    // Return success response

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Error while sending mail:", error);

    throw error;
  }
};
