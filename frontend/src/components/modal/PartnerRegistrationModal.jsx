import { useState } from "react";
import api from "../../api";

export default function PartnerRegistrationModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: "",
    organization_name: "",
    designation: "",
    email: "",
    mobile: "",
    city: "",
    linkedin_consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post("/partners/register", form);
      setMessage("✅ Registration successful!");
      setForm({
        name: "",
        organization_name: "",
        designation: "",
        email: "",
        mobile: "",
        city: "",
        linkedin_consent: false,
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

        <h2 className="text-xl font-bold mb-4">Partner With Us</h2>

        {message && <p className="mb-3 text-sm">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border p-2"
            required
          />
          <input
            name="organization_name"
            value={form.organization_name}
            onChange={handleChange}
            placeholder="Organization Name"
            className="w-full border p-2"
            required
          />
          <input
            name="designation"
            value={form.designation}
            onChange={handleChange}
            placeholder="Designation"
            className="w-full border p-2"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-2"
            required
          />
          <input
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Mobile"
            className="w-full border p-2"
            required
          />
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full border p-2"
          />

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
