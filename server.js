const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Health check endpoint for Railway
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Serve static files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/demo", (req, res) => {
  res.sendFile(path.join(__dirname, "demo.html"));
});

app.get("/cyber", (req, res) => {
  res.sendFile(path.join(__dirname, "cyber.html"));
});

app.get("/fashion", (req, res) => {
  res.sendFile(path.join(__dirname, "fashion.html"));
});

// Contact form submission
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Create transporter for email
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Portfolio Contact Form - Message from ${name}`,
    text: `
Name: ${name}
Email: ${email}
Message: ${message}
        `,
    html: `
<h3>New Contact Form Submission</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message}</p>
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error.message);
    console.error("Full error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again.",
    });
  }
});

// Demo contact forms
app.post("/demo-contact", async (req, res) => {
  // Handle Web3 demo contact
  console.log("Web3 Demo Contact:", req.body);
  res.json({ success: true, message: "Demo contact received!" });
});

app.post("/cyber-contact", async (req, res) => {
  // Handle Cyber demo contact
  console.log("Cyber Demo Contact:", req.body);
  res.json({
    success: true,
    message: "Security consultation request received!",
  });
});

app.post("/fashion-contact", async (req, res) => {
  // Handle Fashion demo contact
  console.log("Fashion Demo Contact:", req.body);
  res.json({
    success: true,
    message: "Consultation booked! We'll contact you soon.",
  });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Portfolio server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Server listening on 0.0.0.0:${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});
