import { Resend } from 'resend';

export default async function handler(req, res) {
  // Set content type to HTML for htmx
  res.setHeader('Content-Type', 'text/html');

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(200).send(
      '<div class="form-message error">Method not allowed.</div>'
    );
  }

  try {
    // Initialize Resend with API key
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(200).send(
        '<div class="form-message error">All fields are required.</div>'
      );
    }

    // Send email using Resend
    await resend.emails.send({
      from: 'TŪN Contact Form <api@resend.dev>', // You'll update this with your domain
      to: process.env.CONTACT_EMAIL, // Your email address
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email, // Allow you to reply directly to the sender
    });

    return res.status(200).send(
      '<div class="form-message success">Thank you for your message! We will get back to you soon.</div>'
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(200).send(
      '<div class="form-message error">Failed to send message. Please try again later.</div>'
    );
  }
}
