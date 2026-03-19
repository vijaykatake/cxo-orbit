import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Country, State, City } from "country-state-city";
import api from "../../api";

export default function RegisterMemberModal({ open, setOpen }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    department: "",
    personalEmail: "",
    officialEmail: "",
    mobile: "",
    experience: "",
    gender: "",
    country: "",
    state: "",
    city: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [birthDate, setBirthDate] = useState(null);
  const [anniversaryDate, setAnniversaryDate] = useState(null);

  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(form.country);
  const cities = City.getCitiesOfState(form.country, form.state);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    if (!form.firstName) return "First name is required";
    if (!form.lastName) return "Last name is required";
    if (!form.personalEmail) return "Personal email is required";
    if (!form.mobile) return "Mobile number is required";
    if (!form.designation) return "Designation is required";
    if (!form.country) return "Country is required";
    if (!form.state) return "State is required";
    if (!form.city) return "City is required";

    if (!form.password) return "Password is required";
    if (form.password.length < 5)
      return "Password must be at least 5 characters";

    if (form.password !== form.confirmPassword) return "Passwords do not match";
    return null;
  };
  const submitForm = async () => {
    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        password: form.password, // send only password
        birthDate,
        anniversaryDate,
      };
      console.log("PAYLOAD:", payload); // ✅ correct debug
      await api.post("/auth/register-member", payload);

      alert("Registration submitted successfully");

      setOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6 text-royal-blue">
          Join as CXO Member
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="firstName"
            placeholder="First Name"
            className="border p-2 rounded"
            onChange={handleChange}
          />

          <input
            name="lastName"
            placeholder="Last Name"
            className="border p-2 rounded"
            onChange={handleChange}
          />

          <input
            name="designation"
            placeholder="Designation"
            className="border p-2 rounded"
            onChange={handleChange}
          />

          <input
            name="department"
            placeholder="Department"
            className="border p-2 rounded"
            onChange={handleChange}
          />

          <input
            name="personalEmail"
            placeholder="Personal Email"
            className="border p-2 rounded"
            onChange={handleChange}
          />

          <input
            name="officialEmail"
            placeholder="Official Email"
            className="border p-2 rounded"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border p-2 rounded"
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="border p-2 rounded"
            onChange={handleChange}
          />
          <input
            name="mobile"
            placeholder="Mobile Number"
            className="border p-2 rounded"
            onChange={handleChange}
          />

          <input
            name="experience"
            placeholder="Total Experience (Years)"
            className="border p-2 rounded"
            onChange={handleChange}
          />

          {/* Gender */}

          <div className="flex gap-4 items-center">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={handleChange}
              />{" "}
              Male
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={handleChange}
              />{" "}
              Female
            </label>
          </div>

          {/* Birth Date */}

          <DatePicker
            selected={birthDate}
            onChange={(date) => setBirthDate(date)}
            placeholderText="Birth Date"
            className="border p-2 rounded w-full"
          />

          {/* Anniversary */}

          <DatePicker
            selected={anniversaryDate}
            onChange={(date) => setAnniversaryDate(date)}
            placeholderText="Anniversary Date"
            className="border p-2 rounded w-full"
          />

          {/* Country */}

          <select
            name="country"
            className="border p-2 rounded"
            onChange={handleChange}
          >
            <option value="">Country</option>

            {countries.map((c) => (
              <option key={c.isoCode} value={c.isoCode}>
                {c.name}
              </option>
            ))}
          </select>

          {/* State */}

          <select
            name="state"
            className="border p-2 rounded"
            onChange={handleChange}
          >
            <option value="">State</option>

            {states.map((s) => (
              <option key={s.isoCode} value={s.isoCode}>
                {s.name}
              </option>
            ))}
          </select>

          {/* City */}

          <select
            name="city"
            className="border p-2 rounded"
            onChange={handleChange}
          >
            <option value="">City</option>

            {cities.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => setOpen(false)} className="btn-outline">
            Cancel
          </button>

          <button
            onClick={submitForm}
            className="btn-primary"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}
