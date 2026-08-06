import nodemailer from "nodemailer";

export async function sendWelcomeEmail(
  to: string,
  data: { name: string; memberId: string; department: string; whatsappLink: string }
) {
  // We expect SMTP_USER and SMTP_PASS in the env variables
  const { SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_USER || !SMTP_PASS) {
    console.warn("SMTP credentials not provided. Skipping welcome email.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail", // Assuming Gmail for simplicity as discussed
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const cardLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/card/${data.memberId}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      <div style="background-color: #071333; padding: 30px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 1px;">Welcome to KSU!</h1>
        <p style="margin: 10px 0 0; color: #9db9ff; font-size: 14px;">Campus Connect • UCE</p>
      </div>
      <div style="padding: 30px; background-color: #ffffff;">
        <p style="font-size: 16px; color: #333;">Hi <strong>${data.name}</strong>,</p>
        <p style="font-size: 16px; color: #333; line-height: 1.5;">
          Your registration is completely successful! We are absolutely thrilled to have you as a verified member of KSU at UCE. 
        </p>
        
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 25px 0;">
          <h3 style="margin: 0 0 15px; color: #071333; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Your Official Details</h3>
          <p style="margin: 5px 0; color: #475569; font-size: 14px;"><strong>Member ID:</strong> <span style="color: #456be5; font-family: monospace; font-size: 16px;">${data.memberId}</span></p>
          <p style="margin: 5px 0; color: #475569; font-size: 14px;"><strong>Department:</strong> ${data.department}</p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${cardLink}" style="display: inline-block; background-color: #071333; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold; font-size: 16px;">
            View Your Digital ID Card
          </a>
        </div>

        ${data.whatsappLink ? `
        <div style="text-align: center; margin-top: 20px;">
          <a href="${data.whatsappLink}" style="display: inline-block; background-color: #25D366; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold; font-size: 16px;">
            Join KSU WhatsApp Group
          </a>
        </div>
        ` : ""}
      </div>
      <div style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b;">
        This is an automated message from the KSU Campus Connect platform.
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"KSU Campus Connect" <${SMTP_USER}>`,
    to,
    subject: `Welcome to KSU! Your Digital Member ID is ready.`,
    html,
  });
}
