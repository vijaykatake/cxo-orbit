const adminTemplate = (data) => `
<div style="font-family: Arial, sans-serif; background:#F8F6F2; padding:20px;">
  <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;">
    
    <div style="background:#0B2C4D;padding:20px;text-align:center;">
      <h2 style="color:#fff;margin:0;">New Contact Inquiry</h2>
    </div>

    <div style="padding:25px;color:#2E2E2E;">
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Mobile:</strong> ${data.mobile}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>

      <br/>

      <p><strong>Message:</strong></p>
      <p style="background:#f4f4f4;padding:10px;border-radius:5px;">
        ${data.message}
      </p>
    </div>

    <div style="background:#0B2C4D;color:#fff;text-align:center;padding:10px;font-size:12px;">
      CXO Orbit - Contact Notification
    </div>
  </div>
</div>
`;

const userTemplate = (data) => `
<div style="font-family: Arial, sans-serif; background:#F8F6F2; padding:20px;">
  <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;">

    <div style="background:#0B2C4D;padding:20px;text-align:center;">
      <img src="https://res.cloudinary.com/drafrfrnt/image/upload/v1775997489/cxo-orbit/mrohxq6wwfh9t1ygbikx.png" 
           alt="CXO Orbit" style="height:50px;">
    </div>

    <div style="padding:25px;color:#2E2E2E;">
      <h2 style="color:#0B2C4D;">Thank you, ${data.name}</h2>

      <p style="font-size:15px; line-height:1.6; color:#333;">
  We have received your message and appreciate your interest in CXO Orbit Global.
</p>
      <p style="font-size: 18px;line-height: 1.6;color: #333;text-align: center;font-weight: bold;color: darkgoldenrod;">Our team will get back to you shortly.</p>

      <br/>

      <div style="text-align:center;">
        <strong>Thanks & Regards,</strong>
      </div>

      <br/>

      <table width="100%" style="margin-top:10px;">
  <tr>

    <!-- LOGO COLUMN -->
    <td 
  width="15%" 
  align="center"
  valign="middle"
  style="border-right:2px solid #D4AF37; padding-right:10px;"
>
  <img 
    src="https://res.cloudinary.com/drafrfrnt/image/upload/v1775997489/cxo-orbit/mrohxq6wwfh9t1ygbikx.png"
    style="height:40px; display:block; margin:auto;"
  >
</td>

    <!-- CONTACT COLUMN -->
    <td style="padding-left:12px; font-size:14px; color:#333;">

      <p style="margin:5px 0;">
        <span style="color:#0B2C4D; font-weight:bold;">Email:</span>
        connect@cxoorbitglobal.com
      </p>

      <p style="margin:5px 0;">
        <span style="color:#0B2C4D; font-weight:bold;">Mobile & WhatsApp:</span>
        +91 98507 16201
      </p>

      <p style="margin:5px 0;">
        <span style="color:#0B2C4D; font-weight:bold;">Website:</span>
        https://cxoorbitglobal.com
      </p>

    </td>
  </tr>
</table>

    </div>

    <div style="background:#0B2C4D;color:#fff;text-align:center;padding:10px;font-size:12px;">
      © CXO Orbit Global
    </div>

  </div>
</div>
`;

module.exports = {
  adminTemplate,
  userTemplate,
};
