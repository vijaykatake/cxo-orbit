const adminTemplate = (data) => `
<div style="font-family: Arial; padding:20px; background:#F8F6F2;">
  <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;">
    
    <div style="background:#0B2C4D;padding:15px;text-align:center;color:#fff;">
      <h2>New Partner Registration</h2>
    </div>

    <div style="padding:20px;">
      <p><b>Name:</b> ${data.name}</p>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Mobile:</b> ${data.mobile}</p>
      <p><b>Organization:</b> ${data.organization_name}</p>
      <p><b>Designation:</b> ${data.designation}</p>
      <p><b>City:</b> ${data.city}</p>
      <p><b>LinkedIn Consent:</b> ${data.linkedin_consent ? "Yes" : "No"}</p>
    </div>

    <div style="background:#0B2C4D;color:#fff;text-align:center;padding:10px;font-size:12px;">
      CXO Orbit - Partner Inquiry
    </div>

  </div>
</div>
`;

const userTemplate = (data) => `
<div style="font-family: Arial; padding:20px; background:#F8F6F2;">
  <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;">

    <div style="background:#0B2C4D;padding:20px;text-align:center;">
      <img src="https://res.cloudinary.com/drafrfrnt/image/upload/v1775997489/cxo-orbit/mrohxq6wwfh9t1ygbikx.png" style="height:50px;">
    </div>

    <div style="padding:25px; font-size:15px; color:#333;">

      <p>Dear ${data.name},</p>

      <p>
        Thank you for showing interest in partnering with 
        <strong>CXO Orbit Global</strong>.
      </p>

      <p>
        Our team will review your details and connect with you shortly.
      </p>

      <br/>

      <div style="text-align:center;">
        <strong>Thanks & Regards,</strong>
      </div>

      <br/>

      <table width="100%">
        <tr>
          <td width="15%" align="center" style="border-right:2px solid #D4AF37;">
            <img src="https://res.cloudinary.com/drafrfrnt/image/upload/v1775997489/cxo-orbit/mrohxq6wwfh9t1ygbikx.png" style="height:40px;">
          </td>
          <td style="padding-left:10px;">
            <p>Email: connect@cxoorbitglobal.com</p>
            <p>Mobile: +91 98507 16201</p>
            <p>Website: https://cxoorbitglobal.com</p>
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

module.exports = { adminTemplate, userTemplate };
