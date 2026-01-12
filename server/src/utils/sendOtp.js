import transporter from "./emailTransport.js";

export const sendOtp = async (email, otp) => {
  await transporter.sendMail({
    from: `"ThesisAlibi Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your One-Time Password (OTP)",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OTP Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px 0;">
    <tr>
      <td align="center">
        <table width="100%" max-width="500" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background:#4CAF50; padding:20px; text-align:center; color:#ffffff;">
              <h1 style="margin:0; font-size:22px;">Email Verification</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; font-family:Arial, Helvetica, sans-serif; color:#333;">
              <p style="font-size:16px; margin:0 0 10px;">
                Hello,
              </p>

              <p style="font-size:15px; line-height:1.6; margin:0 0 20px;">
                Use the following One-Time Password (OTP) to verify your email address.
                This code is valid for <strong>10 minutes</strong>.
              </p>

              <!-- OTP Box -->
              <div style="text-align:center; margin:30px 0;">
                <span style="
                  display:inline-block;
                  padding:15px 30px;
                  font-size:28px;
                  letter-spacing:6px;
                  font-weight:bold;
                  background:#f0fdf4;
                  color:#2e7d32;
                  border:2px dashed #4CAF50;
                  border-radius:6px;
                ">
                  ${otp}
                </span>
              </div>

              <p style="font-size:14px; color:#666; line-height:1.6;">
                If you did not request this verification, please ignore this email.
              </p>

              <p style="font-size:14px; color:#666; margin-top:20px;">
                — ThesisAlibi Team Team
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; padding:15px; text-align:center; font-size:12px; color:#999;">
              © ${new Date().getFullYear()} ThesisAlibi Team. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  });
};

export const sendProfileCreatedEmail = async (email, firstName) => {
  await transporter.sendMail({
    from: `"ThesisAlibi Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Profile Created Successfully 🎉",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Profile Created</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px 0;">
    <tr>
      <td align="center">
        <table width="100%" max-width="500" cellpadding="0" cellspacing="0"
          style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background:#2563eb; padding:20px; text-align:center; color:#ffffff;">
              <h1 style="margin:0; font-size:22px;">Profile Created</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; font-family:Arial, Helvetica, sans-serif; color:#333;">
              <p style="font-size:16px; margin-bottom:10px;">
                Hello ${firstName || "User"},
              </p>

              <p style="font-size:15px; line-height:1.6;">
                🎉 Your profile has been <strong>successfully created</strong>.
              </p>

              <p style="font-size:14px; line-height:1.6; color:#555;">
                You can now access all features associated with your account.
              </p>

              <div style="margin:25px 0; text-align:center;">
                <span style="
                  display:inline-block;
                  padding:12px 25px;
                  background:#e0e7ff;
                  color:#1e3a8a;
                  font-weight:bold;
                  border-radius:6px;
                ">
                  Profile Status: Active ✅
                </span>
              </div>

              <p style="font-size:14px; color:#666;">
                If you have any questions, feel free to contact our support team.
              </p>

              <p style="font-size:14px; margin-top:20px;">
                — ThesisAlibi Team Team
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; padding:15px; text-align:center; font-size:12px; color:#999;">
              © ${new Date().getFullYear()} ThesisAlibi Team. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  });
};
