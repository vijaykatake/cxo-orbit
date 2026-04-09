export default function PartnersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* TITLE */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#0B2C4D]">Get In Touch</h2>
        <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* ================= LEFT ================= */}
        <div className="space-y-6">
          {/* MAP */}
          <div className="w-full h-[300px] rounded-xl overflow-hidden shadow-md">
            <iframe
              title="CXO Orbit Location"
              src="https://www.google.com/maps?q=18.5170784,73.8324356&z=15&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          {/* ADDRESS */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold text-[rgb(31_166_160)] mb-2">
              Address
            </h3>
            <p className="text-gray-600 leading-6">
              CXO ORBIT, Parth villa, 5th floor, 10, Gangote path, Prabhat Road,
              Pune 411004
            </p>
          </div>

          {/* EMAILS */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold text-[rgb(31_166_160)] mb-2">Email</h3>
            <p className="text-gray-500"></p>
            <p className="text-gray-500"></p>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-[#0B2C4D] mb-4">
            Contact Form
          </h3>

          <form className="space-y-4">
            {/* FULL NAME */}
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-[rgb(31_166_160)]"
            />

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-[rgb(31_166_160)]"
            />

            {/* MOBILE */}
            <input
              type="text"
              placeholder="Mobile"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-[rgb(31_166_160)]"
            />

            {/* SUBJECT */}
            <input
              type="text"
              placeholder="Subject"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-[rgb(31_166_160)]"
            />

            {/* MESSAGE */}
            <textarea
              rows="4"
              placeholder="Message"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-[rgb(31_166_160)]"
            ></textarea>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#0B2C4D] text-white py-2 rounded hover:opacity-90 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
