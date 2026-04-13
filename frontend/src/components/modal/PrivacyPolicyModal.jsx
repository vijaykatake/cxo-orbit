export default function PrivacyPolicyModal({ open, setOpen }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4">
      <div className="bg-white max-w-4xl w-full rounded-xl shadow-xl relative max-h-[85vh] overflow-y-auto p-8">
        {/* CLOSE */}
        <button
          onClick={() => setOpen(false)}
          className="sticky top-2 ml-auto w-9 h-9 flex items-center justify-center rounded-full bg-red-500 text-white shadow hover:bg-red-600"
        >
          ✕
        </button>

        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#0B2C4D]">Privacy Policy</h2>
          <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
          <p className="text-sm text-gray-500 mt-2">
            Effective Date: 14/04/2026
          </p>
        </div>

        <div className="text-gray-700 text-[15px] leading-7 space-y-6">
          <p>
            Welcome to CXO Orbit Global. Your privacy is important to us. This
            policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website https://cxoorbitglobal.com
          </p>

          <p>
            By accessing or using our Website, you agree to this Privacy Policy.
            If you do not agree, please do not use our Website.
          </p>

          {/* SECTION */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-2">
              1. Information We Collect
            </h3>
            <p className="mb-2">
              We may collect the following types of information:
            </p>

            <p className="font-medium">a. Personal Information</p>

            <div className="pl-6 space-y-1">
              <p>Full Name</p>
              <p>Email Address</p>
              <p>Phone Number</p>
              <p>Company Name & Designation</p>
              <p>
                Any other information you voluntarily provide (e.g., event
                registrations, contact forms)
              </p>
            </div>

            <p className="font-medium mt-4">b. Non-Personal Information</p>

            <div className="pl-6 space-y-1">
              <p>Browser type and version</p>
              <p>IP address</p>
              <p>Device information</p>
              <p>Pages visited and time spent</p>
              <p>Cookies and tracking data</p>
            </div>
          </div>

          <div className="border-t border-gray-200"></div>

          {/* SECTION */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-2">
              2. How We Use Your Information
            </h3>

            <p className="mb-2">We use the collected information to:</p>

            <div className="pl-6 space-y-1">
              <p>Provide and manage our services</p>
              <p>Register you for events, webinars, and roundtables</p>
              <p>
                Communicate with you regarding updates, invitations, and offers
              </p>
              <p>Improve website functionality and user experience</p>
              <p>
                Send marketing or promotional communications (with your consent)
              </p>
              <p>Ensure security and prevent fraud</p>
            </div>
          </div>

          <div className="border-t border-gray-200"></div>

          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-2">
              3. Sharing of Information
            </h3>

            <p className="mb-2">
              We do not sell your personal data. However, we may share your
              information with:
            </p>

            <div className="pl-6 space-y-1">
              <p>
                Trusted service providers (event platforms, email services,
                hosting providers)
              </p>
              <p>Business partners for co-hosted events (only when required)</p>
              <p>
                Legal authorities if required by law or to protect our rights
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200"></div>

          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-2">
              4. Cookies & Tracking Technologies
            </h3>

            <p className="mb-2">
              We use cookies and similar tracking technologies to:
            </p>

            <div className="pl-6 space-y-1">
              <p>Enhance user experience</p>
              <p>Analyze website traffic</p>
              <p>Remember user preferences</p>
            </div>

            <p className="mt-2">
              You can choose to disable cookies through your browser settings.
            </p>
          </div>

          <div className="border-t border-gray-200"></div>

          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-2">
              5. Data Security
            </h3>
            <p>
              We implement reasonable technical and organizational measures to
              protect your personal data. However, no system is 100% secure, and
              we cannot guarantee absolute security.
            </p>
          </div>

          <div className="border-t border-gray-200"></div>

          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-2">
              6. Data Retention
            </h3>

            <p className="mb-2">
              We retain your personal data only as long as necessary for:
            </p>

            <div className="pl-6 space-y-1">
              <p>Providing services</p>
              <p>Legal and regulatory compliance</p>
              <p>Business and operational purposes</p>
            </div>
          </div>

          <div className="border-t border-gray-200"></div>

          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-2">
              7. Your Rights
            </h3>

            <p className="mb-2">
              As per applicable laws (including India’s DPDP Act 2023), you have
              the right to:
            </p>

            <div className="pl-6 space-y-1">
              <p>Access your personal data</p>
              <p>Correct or update information</p>
              <p>Request deletion of your data</p>
              <p>Withdraw consent for marketing communications</p>
            </div>

            <p className="mt-2">
              To exercise your rights, contact us at: connect@cxoorbitglobal.com
            </p>
          </div>

          <div className="border-t border-gray-200"></div>

          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-2">
              8. Third-Party Links
            </h3>
            <p>
              Our Website may contain links to third-party websites. We are not
              responsible for their privacy practices or content.
            </p>
          </div>

          <div className="border-t border-gray-200"></div>

          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-2">
              9. Children’s Privacy
            </h3>
            <p>
              Our services are not intended for individuals under the age of 18.
              We do not knowingly collect data from children.
            </p>
          </div>

          <div className="border-t border-gray-200"></div>

          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-2">
              10. Updates to This Policy
            </h3>
            <p>
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with the revised effective date.
            </p>
          </div>

          <div className="border-t border-gray-200"></div>

          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-2">
              11. Contact Us
            </h3>

            <p>
              If you have any questions or concerns about this Privacy Policy,
              please contact:
            </p>

            <div className="pl-6">
              <p>CXO Orbit Global</p>
              <p>Email: connect@cxoorbitglobal.com</p>
              <p>Address: India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
