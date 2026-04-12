exports.adminTemplate = (data) => `
  <h2>New Contact Inquiry</h2>
  <p><b>Name:</b> ${data.name}</p>
  <p><b>Email:</b> ${data.email}</p>
  <p><b>Mobile:</b> ${data.mobile || "-"}</p>
  <p><b>Subject:</b> ${data.subject}</p>
  <p><b>Message:</b> ${data.message}</p>
`;

exports.userTemplate = (data) => `
  <h2>Thank you ${data.name}</h2>
  <p>We have received your message.</p>
  <p>Our team will contact you shortly.</p>
`;
