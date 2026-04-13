export default function PrivacyPolicyModal({ open, setOpen }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4">
      <div className="bg-white max-w-3xl w-full rounded-lg p-6 relative max-h-[85vh] overflow-y-auto">
        {/* CLOSE BUTTON */}
        <div className="flex justify-end sticky top-0 bg-white z-10 pb-2">
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white text-sm shadow-md hover:bg-red-600 hover:scale-105 transition"
          >
            ✕
          </button>
        </div>

        {/* TITLE */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-[#0B2C4D]">Privacy Policy</h2>
          <div className="w-20 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
          <p className="text-xs text-gray-500 mt-2">
            Effective Date: 14/04/2026
          </p>
        </div>

        {/* CONTENT */}
        <div className="text-sm text-gray-700 space-y-5 leading-6">
          <p>
            Welcome to CXO Orbit Global. Your privacy is important to us. This
            policy explains how we collect, use, and protect your information.
          </p>

          {/* 1 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-1">
              1. Information We Collect
            </h3>

            <p className="font-medium mt-2">a. Personal Information</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Company Name & Designation</li>
              <li>Information from forms and registrations</li>
            </ul>

            <p className="font-medium mt-2">b. Non-Personal Information</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Browser and device details</li>
              <li>IP address</li>
              <li>Pages visited and time spent</li>
              <li>Cookies and tracking data</li>
            </ul>
          </div>

          {/* 2 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-1">
              2. How We Use Your Information
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide and manage services</li>
              <li>Register for events and webinars</li>
              <li>Send updates and invitations</li>
              <li>Improve website experience</li>
              <li>Marketing (with consent)</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
          </div>

          {/* 3 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-1">
              3. Sharing of Information
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Trusted service providers</li>
              <li>Business partners (for events)</li>
              <li>Legal authorities if required</li>
            </ul>
          </div>

          {/* 4 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-1">
              4. Cookies & Tracking Technologies
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Enhance user experience</li>
              <li>Analyze website traffic</li>
              <li>Remember preferences</li>
            </ul>
          </div>

          {/* 5 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-1">
              5. Data Security
            </h3>
            <p>
              We implement reasonable measures to protect your data, but no
              system is completely secure.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-1">
              6. Data Retention
            </h3>
            <p>
              Data is retained only as long as necessary for services and legal
              purposes.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-1">
              7. Your Rights
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access your data</li>
              <li>Update or correct information</li>
              <li>Request deletion</li>
              <li>Withdraw consent</li>
            </ul>
            <p className="mt-2">
              Contact: <strong>connect@cxoorbitglobal.com</strong>
            </p>
          </div>

          {/* 8 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-1">
              8. Third-Party Links
            </h3>
            <p>
              We are not responsible for third-party websites or their
              practices.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-1">
              9. Children’s Privacy
            </h3>
            <p>Our services are not intended for individuals under 18.</p>
          </div>

          {/* 10 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-1">
              10. Updates to This Policy
            </h3>
            <p>We may update this policy periodically.</p>
          </div>

          {/* 11 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-1">
              11. Contact Us
            </h3>
            <p>
              CXO Orbit Global <br />
              Email: <strong>connect@cxoorbitglobal.com</strong> <br />
              Address: India
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
