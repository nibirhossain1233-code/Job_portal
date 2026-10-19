const nodemailer = require("nodemailer");

exports.sendEmail = async (email, otp, name) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Verify Your Email | JobBoard",
      text: "Hello world?",
      html: `<!doctypehtml><html lang=en><meta charset=UTF-8><meta content="width=device-width,initial-scale=1"name=viewport><title>Verify Your Email | JobBoard</title><body style=margin:0;padding:0;background-color:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#334155><table border=0 cellpadding=0 cellspacing=0 role=presentation width=100% style="background-color:#f1f5f9;padding:32px 12px"><tr><td align=center><table border=0 cellpadding=0 cellspacing=0 role=presentation width=100% style=max-width:600px;background-color:#fff;border-radius:12px;overflow:hidden><tr><td style="background-color:#172554;padding:30px 32px"><table border=0 cellpadding=0 cellspacing=0 role=presentation width=100%><tr><td align=left><p style=margin:0;color:#fff;font-size:29px;line-height:1.3;font-weight:700;letter-spacing:-.8px>Job<span style=color:#60a5fa>Board</span><p style="margin:7px 0 0;color:#cbd5e1;font-size:13px;line-height:1.6">Your next career starts here.</table></tr><tr><td style="padding:36px 32px 32px"><p style="margin:0 0 12px;color:#2563eb;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase">Account verification<h1 style="margin:0 0 20px;color:#172554;font-size:27px;line-height:1.35;font-weight:700">Verify your email address</h1><p style="margin:0 0 14px;color:#334155;font-size:15px;line-height:1.8">Hello ${name},<p style="margin:0 0 26px;color:#475569;font-size:15px;line-height:1.8">Welcome to JobBoard! Thank you for creating your account. To complete your registration and get started, please verify your email address using the one-time verification code below.</p><table border=0 cellpadding=0 cellspacing=0 role=presentation width=100% style="background-color:#eff6ff;border:1px solid #bfdbfe;border-radius:10px"><tr><td style="padding:28px 16px"align=center><p style="margin:0 0 16px;color:#475569;font-size:11px;line-height:1.5;font-weight:700;letter-spacing:2px">YOUR VERIFICATION CODE<p style=margin:0;color:#1d4ed8;font-size:36px;line-height:1.4;font-weight:700;letter-spacing:8px>${otp}<p style="margin:16px 0 0;color:#475569;font-size:13px;line-height:1.7">This code expires in <strong>5 minutes</strong>.</table><p style="margin:24px 0;color:#475569;font-size:14px;line-height:1.8">Enter this code on the verification page to activate your account. If the code expires, you can request a new one from the website.</p><table border=0 cellpadding=0 cellspacing=0 role=presentation width=100% style="background-color:#f8fafc;border-left:3px solid #3b82f6"><tr><td style="padding:16px 18px"><p style="margin:0 0 6px;color:#172554;font-size:14px;font-weight:700">Keep your account secure<p style=margin:0;color:#64748b;font-size:13px;line-height:1.8>Never share this code with anyone. JobBoard will never ask you to disclose your verification code over the phone or through a personal message.</table><p style="margin:26px 0 0;color:#64748b;font-size:13px;line-height:1.8">Didn't create a JobBoard account? No action is required. You can safely ignore this email.<p style="margin:28px 0 0;color:#475569;font-size:14px;line-height:1.8">Best regards,<br><strong style=color:#172554>The JobBoard Team</strong></tr><tr><td style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 20px"align=center><p style=margin:0;color:#172554;font-size:21px;font-weight:700>Job<span style=color:#3b82f6>Board</span><p style="margin:8px 0 16px;color:#64748b;font-size:12px;line-height:1.7">Connecting talent with opportunity.<p style=margin:0;color:#94a3b8;font-size:11px;line-height:1.8>This is an automated email sent regarding your account registration. Please do not reply to this message.<p style="margin:16px 0 0;color:#94a3b8;font-size:11px;line-height:1.7">© 2026 JobBoard. All rights reserved.</table></table>`,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error("Error while sending mail:", err.message);
  }
};
