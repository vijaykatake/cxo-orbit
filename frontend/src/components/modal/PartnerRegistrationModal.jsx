import { useState } from "react";
import api from "../../api";

export default function PartnerRegistrationModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: "Vijay Katake",
    organization_name: "Fullstack Freelance IT Professional",
    designation: "Fullstack Developer",
    email: "vijukatake@gmail.com",
    mobile: "9604781258",
    city: "Pune",
    linkedin_consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  if (!isOpen) return null;
  const validate = () => {
    const newErrors = {};

    // Name
    if (!form.name || form.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    // Organization
    if (!form.organization_name || form.organization_name.trim().length < 3) {
      newErrors.organization_name =
        "Organization name must be at least 3 characters";
    }
    // ✅ NEW
    if (!form.designation || form.designation.trim().length < 3) {
      newErrors.designation = "Designation must be at least 3 characters";
    }
    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Mobile (10 digits)
    const mobileValue = form.mobile.trim();
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileValue || !mobileRegex.test(mobileValue)) {
      newErrors.mobile = "Mobile must be 10 digits";
    }

    // City
    if (!form.city || form.city.trim().length < 3) {
      newErrors.city = "City must be at least 3 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // 🚨 stop if invalid
    setLoading(true);
    setMessage("");

    try {
      await api.post("/partners/register", form);
      setMessage("✅ Registration successful!");
      setForm({
        name: "Vijay Katake",
        organization_name: "Software CXO ORBIT",
        designation: "Fullstack Freelance IT Professional",
        email: "vijukatake@gmail.com",
        mobile: "9604781258",
        city: "Pune",
        linkedin_consent: true,
      });
    } catch (err) {
      setMessage("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-xl rounded-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500"
        >
          ✕
        </button>
        <h2 className="text-3xl font-bold text-[#0B2C4D] mb-6 inline-block text-center">
          Partner With Us
          <span className="block h-[3px] w-20 mx-auto bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 mt-2 rounded"></span>
        </h2>
        {message && <p className="mb-3 text-sm">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className={`w-full border p-2 ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          <input
            name="organization_name"
            value={form.organization_name}
            onChange={handleChange}
            placeholder="Organization Name"
            className={`w-full border p-2 ${errors.organization_name ? "border-red-500" : ""}`}
          />
          {errors.organization_name && (
            <p className="text-red-500 text-xs">{errors.organization_name}</p>
          )}
          <input
            name="designation"
            value={form.designation}
            onChange={handleChange}
            placeholder="Designation"
            className={`w-full border p-2 ${
              errors.designation ? "border-red-500" : ""
            }`}
          />

          {errors.designation && (
            <p className="text-red-500 text-xs">{errors.designation}</p>
          )}
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className={`w-full border p-2 ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
          <input
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Mobile"
            className={`w-full border p-2 ${errors.mobile ? "border-red-500" : ""}`}
          />
          {errors.mobile && (
            <p className="text-red-500 text-xs">{errors.mobile}</p>
          )}
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            className={`w-full border p-2 ${errors.city ? "border-red-500" : ""}`}
          />
          {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="linkedin_consent"
              checked={form.linkedin_consent}
              onChange={handleChange}
            />
            Consent to post on LinkedIn as Speaker
          </label>

          <button
            type="submit"
            className="w-full bg-soft-gold text-royal-blue py-2 rounded font-medium"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
