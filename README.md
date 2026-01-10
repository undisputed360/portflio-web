# Portfolio Backend Setup

This portfolio includes a Node.js backend for handling contact form submissions.

## Prerequisites

- Node.js (v14 or higher)
- npm

## Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:
   Create a `.env` file in the root directory:

```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
```

For Gmail, you'll need to:

- Enable 2-factor authentication
- Generate an App Password: https://support.google.com/accounts/answer/185833
- Use the App Password as EMAIL_PASS

## Running the Server

```bash
node server.js
```

The server will start on http://localhost:3000

## API Endpoints

- `GET /` - Main portfolio page
- `GET /demo` - Web3 demo page
- `GET /cyber` - Cybersecurity demo page
- `GET /fashion` - Fashion demo page
- `POST /contact` - Main portfolio contact form
- `POST /demo-contact` - Web3 demo contact
- `POST /cyber-contact` - Cyber demo contact
- `POST /fashion-contact` - Fashion demo contact

## Features

- Email notifications for contact form submissions
- Static file serving for all assets
- CORS enabled for frontend requests
- Error handling and validation

## Deployment

For production deployment, consider:

- Using environment variables for email credentials
- Setting up a proper email service (SendGrid, Mailgun, etc.)
- Adding rate limiting
- Implementing proper logging
- Using a process manager like PM2

## Security Notes

- Never commit `.env` files to version control
- Use strong app passwords for email
- Consider implementing CAPTCHA for forms
- Validate and sanitize all input data
