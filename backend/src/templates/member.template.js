const adminTemplate = (data) => `
<div style="font-family: Arial, sans-serif; background:#F8F6F2; padding:20px;">
  <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;">
    
    <div style="background:#0B2C4D;padding:20px;text-align:center;">
      <h2 style="color:#fff;margin:0;">New CXO Member Registration</h2>
    </div>

    <div style="padding:25px;color:#2E2E2E; font-size:14px;">
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> ${data.personalEmail}</p>
      <p><strong>Mobile:</strong> ${data.mobile || "N/A"}</p>
      <p><strong>Organization:</strong> ${data.organization || "N/A"}</p>
      <p><strong>Designation:</strong> ${data.designation || "N/A"}</p>
      <p><strong>Industry:</strong> ${data.industry || "N/A"}</p>
    </div>

    <div style="background:#0B2C4D;color:#fff;text-align:center;padding:10px;font-size:12px;">
      CXO Orbit - Member Registration
    </div>
  </div>
</div>
`;

const userTemplate = (data) => `
<div style="font-family: Arial, sans-serif; background:#F8F6F2; padding:20px;">
  <div style="max-width:650px;margin:auto;background:#fff;border-radius:8px;overflow:hidden;">

    <!-- HEADER -->
    <div style="background:#0B2C4D;padding:20px;text-align:center;">
      <img src="https://res.cloudinary.com/drafrfrnt/image/upload/v1775997489/cxo-orbit/mrohxq6wwfh9t1ygbikx.png" 
           alt="CXO Orbit" style="height:50px;">
    </div>

    <!-- BODY -->
    <div style="padding:25px;color:#2E2E2E; font-size:15px; line-height:1.6;">

      <p>Dear ${data.firstName} ${data.lastName},</p>

      <p>
        We are absolutely delighted to officially welcome you to the 
        <strong>CXO Orbit Global Community</strong>!
      </p>

      <p>
        Your leadership mindset and enthusiasm are what make this ecosystem powerful.
        We’re excited to have you onboard.
      </p>

      <h3 style="color:#0B2C4D;">How CXO Orbit Elevates You</h3>

      <p><strong>1. Networking & Knowledge</strong></p>
      <ul>
        <li>Trusted, vendor-free CXO network</li>
        <li>Exclusive leadership roundtables</li>
        <li>Collaboration & consulting opportunities</li>
      </ul>

      <p><strong>2. Personal Growth & Branding</strong></p>
      <ul>
        <li>Speaking opportunities</li>
        <li>LinkedIn branding support</li>
        <li>Curated insights & reports</li>
      </ul>

      <p><strong>3. Giving Back & Influence</strong></p>
      <ul>
        <li>Mentor emerging leaders</li>
        <li>Thought leadership creation</li>
        <li>Lead impactful discussions</li>
      </ul>

      <h3 style="color:#0B2C4D;">Member Privileges</h3>
      <ul>
        <li>Travel & lifestyle benefits</li>
        <li>Premium brand collaborations</li>
        <li>Education & wellness offers</li>
      </ul>

      <p>
        <strong>Registered Organization:</strong> ${data.organization || "N/A"}
      </p>

      <p style="margin:10px 0;">
  Join our LinkedIn community:<br/>

  <a href="https://www.linkedin.com/groups/15057005/" target="_blank" style="text-decoration:none; color:#0B2C4D; font-weight:500;">
    <table cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;">
  <tr>
    
    <!-- ICON -->
    <td style="vertical-align:middle;">
      <img 
        src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
        width="18"
        height="18"
        style="display:block;"
      >
    </td>

    <!-- TEXT -->
    <td style="vertical-align:middle; padding-left:8px;">
      <a href="https://www.linkedin.com/groups/15057005/" target="_blank"
         style="text-decoration:none; color:#0B2C4D; font-weight:500;">
        CXO Orbit Community
      </a>
    </td>

  </tr>
</table>
  </a>
</p>

      <p style="margin-top:15px;">
        Once again, welcome to CXO Orbit — where leadership meets influence.
      </p>

      <br/>

      <div style="text-align:center;">
        <strong>Thanks & Regards,</strong>
      </div>

      <br/>

      <!-- FOOTER CONTACT -->
      <table width="100%" style="margin-top:10px;">
        <tr>

          <!-- LOGO -->
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

          <!-- DETAILS -->
          <td style="padding-left:12px; font-size:14px; color:#333;">

            <p style="margin:5px 0;">
              <strong style="color:#0B2C4D;">Email:</strong>
              connect@cxoorbitglobal.com
            </p>

            <p style="margin:5px 0;">
              <strong style="color:#0B2C4D;">Mobile & WhatsApp:</strong>
              +91 98507 16201
            </p>

            <p style="margin:5px 0;">
              <strong style="color:#0B2C4D;">Website:</strong>
              https://cxoorbitglobal.com
            </p>

          </td>
        </tr>
      </table>

    </div>

    <!-- FOOTER -->
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
