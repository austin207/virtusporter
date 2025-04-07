
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

// Initialize Resend with API key
const resend = new Resend(Deno.env.get("RESEND_API_KEY"))

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    })
  }

  try {
    const { type, email, data } = await req.json()

    // Ensure required fields are present
    if (!type || !email) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      )
    }

    // VirtusCo HTML email template
    const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirm Your VirtusCo Account</title>
      <style>
        /* Base styles */
        body, html {
          margin: 0;
          padding: 0;
          font-family: 'Arial', sans-serif;
          background-color: #000000;
          color: #ffffff;
        }
        
        * {
          box-sizing: border-box;
        }
        
        /* Main container */
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #000000;
          padding: 20px;
        }
        
        /* Header */
        .header {
          padding: 30px 20px;
          text-align: center;
        }
        
        .logo-container {
          margin-bottom: 40px;
        }
        
        .logo {
          font-size: 32px;
          font-weight: bold;
          color: #ffffff;
          letter-spacing: 1px;
        }
        
        .logo span {
          color: #e63946;
        }
        
        .tagline {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 5px;
        }
        
        /* Content */
        .content {
          padding: 20px;
          text-align: center;
        }
        
        h1 {
          font-size: 24px;
          font-weight: normal;
          margin-bottom: 30px;
          color: #ffffff;
        }
        
        p {
          margin-bottom: 20px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 16px;
          line-height: 1.6;
        }
        
        /* Loading bar */
        .loading-container {
          margin: 50px auto;
          text-align: center;
        }
        
        .loading-text {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 15px;
        }
        
        .loading-bar {
          height: 4px;
          width: 100%;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
          position: relative;
        }
        
        .loading-progress {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 0;
          background: linear-gradient(90deg, #e63946, #ff8c94);
          animation: progress 3s forwards;
        }
        
        @keyframes progress {
          0% { width: 0; }
          100% { width: 60%; }
        }
        
        .loading-percentage {
          position: relative;
          width: 50px;
          height: 50px;
          margin: 20px auto;
          border-radius: 50%;
          background-color: transparent;
          border: 2px solid rgba(255, 255, 255, 0.1);
        }
        
        .loading-percentage:before {
          content: "60%";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 14px;
          color: #e63946;
          font-weight: bold;
        }
        
        .loading-percentage:after {
          content: "";
          position: absolute;
          top: -2px;
          left: -2px;
          width: calc(100% + 4px);
          height: calc(100% + 4px);
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: #e63946;
          animation: spin 1.5s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Button */
        .button-container {
          margin: 40px 0;
          text-align: center;
        }
        
        .button {
          display: inline-block;
          background-color: transparent;
          color: #ffffff !important;
          text-decoration: none;
          padding: 12px 30px;
          border: 1px solid #e63946;
          font-weight: normal;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 14px;
          transition: background-color 0.3s;
        }
        
        .button:hover {
          background-color: rgba(230, 57, 70, 0.1);
        }
        
        /* Verification code */
        .verification-container {
          margin: 40px 0;
          padding: 20px;
          background-color: rgba(255, 255, 255, 0.05);
        }
        
        .verification-title {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 15px;
        }
        
        .verification-code {
          font-family: monospace;
          font-size: 24px;
          letter-spacing: 5px;
          color: #e63946;
        }
        
        /* Terminal section */
        .terminal {
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          padding: 20px;
          margin: 30px 0;
          font-family: monospace;
          text-align: left;
          position: relative;
        }
        
        .terminal:before {
          content: "SYSTEM";
          position: absolute;
          top: -10px;
          left: 10px;
          background-color: #000000;
          padding: 0 10px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
        }
        
        .terminal-line {
          margin: 10px 0;
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
        }
        
        .terminal-prompt {
          color: #e63946;
        }
        
        .terminal-command {
          color: #ffffff;
        }
        
        .terminal-response {
          color: rgba(255, 255, 255, 0.5);
        }
        
        /* Footer */
        .footer {
          margin-top: 60px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
        }
        
        /* Responsive */
        @media only screen and (max-width: 600px) {
          .email-container {
            width: 100%;
          }
          
          .button {
            display: block;
            width: 100%;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <!-- Header -->
        <div class="header">
          <div class="logo-container">
            <div class="logo">Virtus<span>Co</span></div>
            <div class="tagline">Intelligent Robot Assistant</div>
          </div>
        </div>
        
        <!-- Content -->
        <div class="content">
          <h1>System Access Authorization Required</h1>
          
          <p>Thank you for initiating your VirtusCo account setup. To complete the system integration and activate your access, verification is required.</p>
          
          <!-- Loading Animation -->
          <div class="loading-container">
            <div class="loading-text">Initializing VirtusCo systems...</div>
            <div class="loading-bar">
              <div class="loading-progress"></div>
            </div>
            <div class="loading-percentage"></div>
          </div>
          
          <p>Your account is 60% initialized. Complete the verification process to finalize setup.</p>
          
          <!-- Terminal Section -->
          <div class="terminal">
            <div class="terminal-line">
              <span class="terminal-prompt">system:~$</span> 
              <span class="terminal-command">user.verify</span>
            </div>
            <div class="terminal-line terminal-response">Verification required to proceed with system access...</div>
            <div class="terminal-line">
              <span class="terminal-prompt">system:~$</span> 
              <span class="terminal-command">auth.generate_token</span>
            </div>
            <div class="terminal-line terminal-response">Token generated successfully. Awaiting confirmation...</div>
          </div>
          
          <!-- CTA Button -->
          <div class="button-container">
            <a href="${data.confirmation_url || data.action_url || ''}" class="button">Authorize Access</a>
          </div>
          
          <!-- Verification Code -->
          <div class="verification-container">
            <div class="verification-title">Authorization Code</div>
            <div class="verification-code">${data.token || ''}</div>
          </div>
          
          <p>If the authorization button is not responsive, copy the link below into your browser:</p>
          <p style="font-size: 12px; word-break: break-all; color: rgba(255, 255, 255, 0.5);">${data.confirmation_url || data.action_url || ''}</p>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <p>&copy; 2025 VirtusCo | Intelligent Robot Assistant</p>
          <p>This is an automated system message. Please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
    `

    // Set up the email subject based on the type
    let subject = "VirtusCo - Action Required"
    
    if (type === "signup" || type === "confirmation") {
      subject = "Welcome to VirtusCo - Complete Your Registration"
    } else if (type === "recovery") {
      subject = "VirtusCo - Password Reset Request"
    } else if (type === "email_change") {
      subject = "VirtusCo - Email Change Confirmation"
    } else if (type === "magiclink") {
      subject = "VirtusCo - Your Magic Link"
    }

    // Send the email using Resend
    const { data: resendData, error } = await resend.emails.send({
      from: "VirtusCo <no-reply@virtusco.in>", // Update with your domain
      to: [email],
      subject: subject,
      html: emailHtml,
    })

    if (error) {
      console.error("Error sending email:", error)
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: error }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      )
    }

    console.log(`Email sent to ${email} with type ${type}`)
    return new Response(
      JSON.stringify({ success: true, id: resendData?.id }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    )

  } catch (error) {
    console.error("Error in send-email function:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    )
  }
})
