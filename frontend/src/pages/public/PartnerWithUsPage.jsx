import { useState } from "react";
import api from "../../api";

export default function PartnerWithUsPage() {
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
      const res = await api.post("/partners/register", form);
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
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Partner With Us</h2>

      {message && <p className="mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="linkedin_consent"
            checked={form.linkedin_consent}
            onChange={handleChange}
          />
          Consent to post on LinkedIn
        </label>

        <button
          type="submit"
          className="bg-soft-gold text-royal-blue px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
