export default function TermsModal({ open, setOpen }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4">
      <div className="bg-white max-w-3xl w-full rounded-lg p-6 relative max-h-[85vh] overflow-y-auto">
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setOpen(false)}
          className="sticky top-3 ml-auto w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white text-sm shadow-md hover:bg-red-600 hover:scale-105 transition z-10"
        >
          ✕
        </button>

        {/* TITLE */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-[#0B2C4D]">Terms of Use</h2>
          <div className="w-20 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
          <p className="text-xs text-gray-500 mt-2">Last Updated: 14/04/2026</p>
        </div>

        {/* CONTENT */}
        <div className="text-sm text-gray-700 space-y-5 leading-6">
          <p>
            Welcome to CXO Orbit Global. By accessing or using our website,
            services, or event platforms, you agree to comply with and be bound
            by the following Terms of Use.
          </p>

          {/* SECTION 1 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-1">
              1. Acceptance of Terms
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>You have read and understood these Terms</li>
              <li>You agree to comply with all applicable laws</li>
              <li>You are at least 18 years of age</li>
              <li>If not, please do not use the website</li>
            </ul>
          </div>

          {/* SECTION 2 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-1">
              2. Use of Website
            </h3>
            <p className="mb-1">You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Violate any applicable laws</li>
              <li>Infringe the rights of others</li>
              <li>Disrupt or damage the platform</li>
            </ul>
          </div>

          {/* SECTION 3 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-1">
              3. Services & Events
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Executive roundtables and conferences</li>
              <li>Networking opportunities</li>
              <li>Business knowledge-sharing platforms</li>
            </ul>

            <p className="mt-2">We reserve the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Modify or cancel events</li>
              <li>Change speakers or venues</li>
              <li>رفض participation at our discretion</li>
            </ul>
          </div>

          {/* SECTION 4 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-1">
              4. User Information
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Information must be accurate</li>
              <li>You consent to communications</li>
              <li>Handled as per Privacy Policy</li>
            </ul>
          </div>

          {/* SECTION 5 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-1">
              5. Intellectual Property
            </h3>
            <p>
              All content including branding, graphics, and materials are
              protected. You may not reuse without permission.
            </p>
          </div>

          {/* SECTION 6 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-1">
              6. Third-Party Links
            </h3>
            <p>
              We are not responsible for third-party content or privacy
              practices.
            </p>
          </div>

          {/* SECTION 7 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-1">
              7. Limitation of Liability
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>No liability for indirect damages</li>
              <li>No responsibility for data/business loss</li>
              <li>Participation is at your own risk</li>
            </ul>
          </div>

          {/* SECTION 8 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-1">
              8. Data Protection & Privacy
            </h3>
            <p>
              We comply with India’s Digital Personal Data Protection Act, 2023.
            </p>
          </div>

          {/* SECTION 9 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-1">
              9. Termination of Access
            </h3>
            <p>
              We may suspend access or restrict participation if terms are
              violated.
            </p>
          </div>

          {/* SECTION 10 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-1">
              10. Changes to Terms
            </h3>
            <p>Terms may be updated from time to time.</p>
          </div>

          {/* SECTION 11 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-1">
              11. Governing Law
            </h3>
            <p>
              These Terms are governed by laws of India. Jurisdiction:
              Pune/Mumbai.
            </p>
          </div>

          {/* SECTION 12 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-1">
              12. Contact Us
            </h3>
            <p>
              CXO Orbit Global <br />
              Email: <strong>connect@cxoorbitglobal.com</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
