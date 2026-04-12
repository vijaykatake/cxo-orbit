import { useState } from "react";
import api from "../../api";

export default function PartnersPage() {
  const [form, setForm] = useState({
    name: "Vijay Katake",
    email: "vijukatake@gmail.com",
    mobile: "9604781258",
    subject: "SMTP Error Subject",
    message: "SMTP Error Message",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let err = {};

    if (!form.name || form.name.length < 3) {
      err.name = "Full name must be at least 3 characters";
    }

    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) {
      err.email = "Invalid email address";
    }

    if (!form.mobile || !/^\d{10}$/.test(form.mobile)) {
      err.mobile = "Mobile must be 10 digits";
    }

    if (!form.subject || form.subject.length < 10) {
      err.subject = "Subject must be at least 10 characters";
    }

    if (!form.message || form.message.length < 15) {
      err.message = "Message must be at least 15 characters";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const res = await api.post("/contact", form);

      // ✅ Check backend response
      if (res?.data?.success) {
        alert("Message sent successfully!");

        setForm({
          name: "",
          email: "",
          mobile: "",
          subject: "",
          message: "",
        });

        setErrors({});
      } else {
        alert(res?.data?.message || "Failed to send message");
      }
    } catch (err) {
      console.error("Contact error:", err);

      // ✅ Better error handling
      if (err.response) {
        alert(err.response.data?.message || "Server error occurred");
      } else if (err.request) {
        alert("No response from server. Please try again.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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
            <p className="text-gray-600 leading-6">
              <span className="text-[#D4AF37]">📧</span>
              <span>connect@cxoorbitglobal.com</span>
            </p>
          </div>
          {/* MOBILE */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold text-[rgb(31_166_160)] mb-2">
              Mobile
            </h3>
            <p className="text-gray-500">+91 98507 16201</p>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold text-[#0B2C4D] mb-6 inline-block text-center">
            Contact Form
            <span className="block h-[3px] w-20 mx-auto bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 mt-2 rounded"></span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* FULL NAME */}
            <div>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-[rgb(31_166_160)]"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-[rgb(31_166_160)]"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            {/* MOBILE */}
            <div>
              <input
                type="text"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Mobile"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-[rgb(31_166_160)]"
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs">{errors.mobile}</p>
              )}
            </div>

            {/* SUBJECT */}
            <div>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-[rgb(31_166_160)]"
              />
              {errors.subject && (
                <p className="text-red-500 text-xs">{errors.subject}</p>
              )}
            </div>

            {/* MESSAGE */}
            <div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                placeholder="Message"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-[rgb(31_166_160)]"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-xs">{errors.message}</p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0B2C4D] text-white py-2 rounded hover:opacity-90 transition"
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
