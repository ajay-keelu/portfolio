import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Simple server-side email validation regex
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, botfield } = body;

    // 1. Honeypot check for spam bots
    // if (botfield && botfield.trim() !== '') {
    //   console.warn('[SPAM BLOCK] Honeypot field filled. Silently ignoring submission.');
    //   // Return 200 success to trick bots into thinking it succeeded
    //   return NextResponse.json(
    //     {
    //       success: true,
    //       message: 'Message processed successfully.',
    //     },
    //     { status: 200 }
    //   );
    // }

    // 2. Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters long.' },
        { status: 400 }
      );
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
      return NextResponse.json(
        { error: 'Subject must be at least 3 characters long.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 0) {
      return NextResponse.json(
        { error: 'Please enter a message.' },
        { status: 400 }
      );
    }

    // 3. Extract environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;

    // Check if SMTP details are fully configured
    const isSmtpConfigured = !!(smtpHost && smtpPort && smtpUser && smtpPassword);

    // Format HTML email body
    const emailHtml = `
      <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              color: #f3f4f6;
              background-color: #0b0f19;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: rgba(14, 26, 52, 0.93);
              border: 1px solid rgba(255, 255, 255, 0.08);
              border-radius: 16px;
              padding: 32px;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            }
            .header {
              border-bottom: 2px solid rgba(6, 182, 212, 0.2);
              padding-bottom: 16px;
              margin-bottom: 24px;
            }
            .title {
              font-size: 24px;
              font-weight: 700;
              margin: 0;
              background: linear-gradient(to right, #22d3ee, #c084fc);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .meta-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 16px;
              background: rgba(255, 255, 255, 0.03);
              padding: 16px;
              border-radius: 12px;
              border: 1px solid rgba(255, 255, 255, 0.05);
              margin-bottom: 24px;
            }
            .meta-item {
              margin-bottom: 8px;
            }
            .meta-label {
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              color: #9ca3af;
              margin-bottom: 2px;
            }
            .meta-value {
              font-size: 14px;
              font-weight: 600;
              color: #ffffff;
            }
            .meta-value a {
              color: #22d3ee;
              text-decoration: none;
            }
            .message-box {
              background: rgba(255, 255, 255, 0.02);
              border: 1px dashed rgba(255, 255, 255, 0.1);
              padding: 20px;
              border-radius: 12px;
              font-size: 15px;
              line-height: 1.6;
              white-space: pre-wrap;
              color: #e5e7eb;
            }
            .footer {
              margin-top: 32px;
              font-size: 12px;
              color: #6b7280;
              text-align: center;
              border-top: 1px solid rgba(255, 255, 255, 0.05);
              padding-top: 16px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 class="title">New Message Received!</h1>
            </div>
            
            <div class="meta-grid">
              <div class="meta-item">
                <div class="meta-label">From</div>
                <div class="meta-value">${name}</div>
              </div>
              <div class="meta-item">
                <div class="meta-label">Email</div>
                <div class="meta-value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="meta-item" style="grid-column: span 2;">
                <div class="meta-label">Subject</div>
                <div class="meta-value">${subject}</div>
              </div>
            </div>

            <div class="meta-label" style="margin-bottom: 8px;">Message Content</div>
            <div class="message-box">${message}</div>

            <div class="footer">
              <p>Sent from Ajay Keelu's Portfolio Contact Form</p>
              <p>${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} IST</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // 4. Handle when SMTP is not configured
    if (!isSmtpConfigured) {
      console.log('─────────────────────────────────────────────────────────────');
      console.log('📧 CONTACT FORM SUBMISSION (SMTP NOT CONFIGURED IN .ENV.LOCAL)');
      console.log(`From: ${name} <${email}>`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${message}`);
      console.log('─────────────────────────────────────────────────────────────');

      return NextResponse.json(
        {
          success: true,
          mode: 'preview',
          message: 'Form verified. Set up SMTP_PASSWORD in .env.local to receive emails.',
        },
        { status: 200 }
      );
    }

    // 5. Send real email using Nodemailer
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort || '587'),
      secure: smtpPort === '465', // true for 465, false for 587
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: `"${name} (Portfolio)" <${smtpUser}>`, // To avoid being marked as spam/DMARC failure, send from SMTP credentials
      to: receiverEmail,
      replyTo: email, // Allow replying directly to the user who filled out the form
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: emailHtml,
    });

    console.log(`[EMAIL SENT] Successfully sent message from ${name} to ${receiverEmail}`);

    return NextResponse.json(
      {
        success: true,
        mode: 'production',
        message: 'Your message has been sent successfully.',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[CONTACT API ERROR]', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
