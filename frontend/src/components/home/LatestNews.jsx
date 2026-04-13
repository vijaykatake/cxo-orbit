import { useState } from "react";
import api from "../../api";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let err = {};

    if (!form.name || form.name.trim().length < 3) {
      err.name = "Name must be at least 3 characters";
    }

    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) {
      err.email = "Enter valid email";
    }

    if (!form.mobile || !/^\d{10}$/.test(form.mobile)) {
      err.mobile = "Enter valid 10-digit mobile";
    }

    if (!form.subject || form.subject.trim().length < 5) {
      err.subject = "Subject is required";
    }

    if (!form.message || form.message.trim().length < 10) {
      err.message = "Message must be at least 10 characters";
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

      if (res?.data?.success) {
        setSuccess(true);
        setForm({
          name: "",
          email: "",
          mobile: "",
          subject: "",
          message: "",
        });
      } else {
        alert("Failed to send message");
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[90rem] mx-auto px-6 py-6">
      {/* HEADER */}
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-[#0B2C4D]">Get in Touch</h2>
        <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
      </div>
      <div className="grid md:grid-cols-2 gap-10 items-stretch">
        {/* ================= LEFT CONTENT ================= */}
        <div className="flex flex-col h-full gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            {/* CONTACT INFO */}
            <div className="space-y-3 text-gray-700">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-location-dot flex items-center justify-center w-9 h-9 rounded-full bg-[#D4AF37] text-[#0B2C4D] shadow-md"></i>
                <span class="font-semibold text-[rgb(31_166_160)]">
                  CXO ORBIT, Parth villa, 5th floor, 10, Gangote path, Prabhat
                  Road, Pune 411004
                </span>
              </div>

              <a
                href="https://wa.me/919850716201"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group transition"
              >
                {/* ICON */}
                <i className="fa-brands fa-whatsapp flex items-center justify-center w-9 h-9 rounded-full bg-[#D4AF37] text-[#0B2C4D] shadow-md transition group-hover:scale-110 group-hover:shadow-lg"></i>

                {/* TEXT */}
                <span className="font-semibold text-[rgb(31_166_160)] transition group-hover:text-[#0B2C4D]">
                  +91 98507 16201
                </span>
              </a>

              <a
                href="mailto:connect@cxoorbitglobal.com"
                className="flex items-center gap-3 group transition"
              >
                {/* ICON */}
                <i className="fa-solid fa-envelope flex items-center justify-center w-9 h-9 rounded-full bg-[#D4AF37] text-[#0B2C4D] shadow-md transition group-hover:scale-110 group-hover:shadow-lg"></i>

                {/* TEXT */}
                <span className="font-semibold text-[rgb(31_166_160)] transition group-hover:text-[#0B2C4D]">
                  connect@cxoorbitglobal.com
                </span>
              </a>
            </div>
          </div>
          {/* MAP */}
          <div className="w-full flex-1 rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps?q=CXO%20ORBIT%20Parth%20Villa%20Prabhat%20Road%20Pune%20411004&z=16&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              className="rounded-xl"
            ></iframe>
          </div>
        </div>
        {/* ================= RIGHT FORM ================= */}
        <div className="bg-white p-6 rounded-xl shadow-md h-full flex flex-col justify-between">
          {success && (
            <div className="bg-green-50 text-green-700 p-4 rounded mb-4 text-center">
              ✅ Thank you! We will contact you soon.
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className={`space-y-4 ${loading ? "pointer-events-none opacity-60" : ""}`}
          >
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
            <input
              type="text"
              name="mobile"
              placeholder="Enter your mobile"
              value={form.mobile}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile}</p>
            )}
            <input
              type="text"
              name="subject"
              placeholder="Enter subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm">{errors.subject}</p>
            )}
            <textarea
              name="message"
              placeholder="Go ahead we are listening..."
              value={form.message}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              rows="4"
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-white font-semibold"
              style={{
                background: "linear-gradient(90deg,#0B2C4D,#D4AF37)",
              }}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
