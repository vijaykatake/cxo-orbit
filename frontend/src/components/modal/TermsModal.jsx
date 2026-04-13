export default function TermsModal({ open, setOpen }) {
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
          <h2 className="text-3xl font-bold text-[#0B2C4D]">Terms of Use</h2>
          <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
          <p className="text-sm text-gray-500 mt-2">Last Updated: 14/04/2026</p>
        </div>

        <div className="text-gray-700 text-[15px] leading-7 space-y-6">
          <p>
            Welcome to CXO Orbit Global. By accessing or using our website,
            services, or event platforms, you agree to comply with and be bound
            by the following Terms of Use.
          </p>

          {/* SECTION 1 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-2">
              1. Acceptance of Terms
            </h3>

            <p className="mb-2">By using this website, you confirm that:</p>

            <div className="pl-6 space-y-1">
              <p>You have read and understood these Terms</p>
              <p>
                You agree to comply with all applicable laws and regulations
              </p>
              <p>You are at least 18 years of age</p>
              <p>If you do not agree, please refrain from using the website.</p>
            </div>
          </div>

          <div className="border-t border-gray-200"></div>

          {/* SECTION 2 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-2">
              2. Use of Website
            </h3>

            <p className="mb-2">
              You agree to use the website only for lawful purposes and in a
              manner that does not:
            </p>

            <div className="pl-6 space-y-1">
              <p>Violate any applicable laws or regulations</p>
              <p>Infringe the rights of others</p>
              <p>Disrupt or damage the website or its services</p>
            </div>

            <p className="mt-2">
              Unauthorized use of this website may result in legal action.
            </p>
          </div>

          <div className="border-t border-gray-200"></div>

          {/* SECTION 3 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-2">
              3. Services & Events
            </h3>

            <p className="mb-2">CXO Orbit Global provides:</p>

            <div className="pl-6 space-y-1">
              <p>Executive roundtables and conferences</p>
              <p>Networking opportunities</p>
              <p>Business and knowledge-sharing platforms</p>
            </div>

            <p className="mt-3 mb-2">We reserve the right to:</p>

            <div className="pl-6 space-y-1">
              <p>Modify or cancel events</p>
              <p>Change agendas, speakers, or venues</p>
              <p>Refuse participation at our discretion</p>
            </div>
          </div>

          <div className="border-t border-gray-200"></div>

          {/* SECTION 4 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-2">
              4. User Information
            </h3>

            <p className="mb-2">
              By submitting your details (e.g., forms, registrations), you:
            </p>

            <div className="pl-6 space-y-1">
              <p>Confirm that the information is accurate</p>
              <p>Consent to communication related to events and services</p>
            </div>

            <p className="mt-2">
              All personal data is handled as per our Privacy Policy and
              applicable laws.
            </p>
          </div>

          <div className="border-t border-gray-200"></div>

          {/* SECTION 5 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-2">
              5. Intellectual Property
            </h3>

            <p className="mb-2">All content on this website, including:</p>

            <div className="pl-6 space-y-1">
              <p>Text, logos, branding</p>
              <p>Graphics, presentations, and materials</p>
            </div>

            <p className="mt-2">
              is the property of CXO Orbit Global and protected under applicable
              intellectual property laws.
            </p>

            <p className="mt-2">
              You may not reproduce, distribute, or use content without prior
              written consent.
            </p>
          </div>

          <div className="border-t border-gray-200"></div>

          {/* SECTION 6 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-2">
              6. Third-Party Links
            </h3>

            <p className="mb-2">
              Our website may include links to third-party websites.
            </p>

            <p className="mb-2">We are not responsible for:</p>

            <div className="pl-6 space-y-1">
              <p>Their content</p>
              <p>Privacy practices</p>
              <p>Any damages arising from their use</p>
            </div>
          </div>

          <div className="border-t border-gray-200"></div>

          {/* SECTION 7 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-2">
              7. Limitation of Liability
            </h3>

            <p className="mb-2">CXO Orbit Global shall not be liable for:</p>

            <div className="pl-6 space-y-1">
              <p>Any indirect or consequential damages</p>
              <p>Loss of data, business, or revenue</p>
              <p>Event changes or cancellations beyond our control</p>
            </div>

            <p className="mt-2">
              Use of the website and participation in events is at your own
              risk.
            </p>
          </div>

          <div className="border-t border-gray-200"></div>

          {/* SECTION 8 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-2">
              8. Data Protection & Privacy
            </h3>

            <p>
              We are committed to protecting your personal data in compliance
              with the Digital Personal Data Protection Act, 2023, which governs
              how organizations handle personal data in India.
            </p>

            <p className="mt-2">
              For more details, please refer to our Privacy Policy.
            </p>
          </div>

          <div className="border-t border-gray-200"></div>

          {/* SECTION 9 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-2">
              9. Termination of Access
            </h3>

            <p className="mb-2">We reserve the right to:</p>

            <div className="pl-6 space-y-1">
              <p>Suspend or terminate access to the website</p>
              <p>Restrict participation in events</p>
            </div>

            <p className="mt-2">if users violate these Terms.</p>
          </div>

          <div className="border-t border-gray-200"></div>

          {/* SECTION 10 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-2">
              10. Changes to Terms
            </h3>

            <p>
              We may update these Terms from time to time. Changes will be
              effective once posted on this page.
            </p>
          </div>

          <div className="border-t border-gray-200"></div>

          {/* SECTION 11 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-2">
              11. Governing Law
            </h3>

            <p>
              These Terms shall be governed by and interpreted in accordance
              with the laws of India.
            </p>

            <p className="mt-2">
              Any disputes shall be subject to the jurisdiction of courts in
              Pune/Mumbai.
            </p>
          </div>

          <div className="border-t border-gray-200"></div>

          {/* SECTION 12 */}
          <div>
            <h3 className="font-semibold text-[#0B2C4D] mb-2">
              12. Contact Us
            </h3>

            <p>For any queries regarding these Terms:</p>

            <div className="pl-6 mt-2">
              <p>CXO Orbit Global</p>
              <p>Email: connect@cxoorbitglobal.com</p>
              <p>Location: India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
