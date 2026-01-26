# TŪN Website

Landing page for TŪN Music-Centered Wellness sound bath meditation sessions.

## Setup Instructions

### 1. Set up Resend

1. Sign up for a free account at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. (Optional) Add and verify your custom domain for branded emails

### 2. Configure Vercel Environment Variables

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:
   - `RESEND_API_KEY` = your Resend API key
   - `CONTACT_EMAIL` = the email address that should receive form submissions

### 3. Deploy

Push your changes to GitHub and Vercel will automatically deploy:

```bash
git add .
git commit -m "Add contact form with htmx and Resend"
git push
```

## How It Works

- The contact form uses **htmx** to submit form data without a page reload
- Form submissions POST to `/api/contact.js` (Vercel serverless function)
- The serverless function sends an email via **Resend**
- Success/error messages are displayed inline on the page

## Local Development

To test the contact form locally:

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel dev` to start local development server
3. Create a `.env` file with your environment variables:
   ```
   RESEND_API_KEY=your_api_key_here
   CONTACT_EMAIL=your_email@example.com
   ```

## Custom Domain Email (Optional)

Once you verify a domain in Resend, update the `from` field in `/api/contact.js`:

```javascript
from: 'TŪN Contact Form <contact@yourdomain.com>',
```
