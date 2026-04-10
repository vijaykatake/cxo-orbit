import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Country, State, City } from "country-state-city";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import api from "../../api";

export default function RegisterMemberModal({ open, setOpen }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    industry: "",
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
    linkedIn: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [birthDate, setBirthDate] = useState(null);
  const [anniversaryDate, setAnniversaryDate] = useState(null);

  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(form.country);
  const cities = City.getCitiesOfState(form.country, form.state);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "mobile") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    setForm({ ...form, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.firstName) newErrors.firstName = "First name is required";
    if (!form.lastName) newErrors.lastName = "Last name is required";
    if (!form.organization) newErrors.organization = "Organization is required";
    if (!form.industry) newErrors.industry = "Industry is required";
    if (!form.designation) newErrors.designation = "Designation is required";
    if (!form.department) newErrors.department = "Department is required";

    if (!form.personalEmail || !emailRegex.test(form.personalEmail))
      newErrors.personalEmail = "Enter valid personal email";

    if (!form.officialEmail || !emailRegex.test(form.officialEmail))
      newErrors.officialEmail = "Enter valid official email";

    if (!form.mobile || form.mobile.length !== 10)
      newErrors.mobile = "Mobile must be 10 digits";

    if (!form.experience) newErrors.experience = "Experience is required";

    if (!form.gender) newErrors.gender = "Please select gender";

    if (!birthDate) newErrors.birthDate = "Birth date is required";

    if (!anniversaryDate)
      newErrors.anniversaryDate = "Anniversary date is required";

    if (!form.country) newErrors.country = "Select country";
    if (!form.state) newErrors.state = "Select state";
    if (!form.city) newErrors.city = "Select city";

    if (!form.linkedIn) newErrors.linkedIn = "LinkedIn URL is required";

    if (!form.password || form.password.length < 5)
      newErrors.password = "Password must be at least 5 characters";

    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await api.post("/auth/register-member", {
        ...form,
        birthDate,
        anniversaryDate,
      });

      setOpen(false);
    } catch (err) {
      setErrors({ api: "Email Already Exists." });
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  const inputClass = (field) =>
    `w-full border p-2 rounded ${
      errors[field] ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-5xl p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-3xl font-bold text-[#0B2C4D] mb-6 inline-block text-center">
          Join As CXO Member
          <span className="block h-[3px] w-20 mx-auto bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 mt-2 rounded"></span>
        </h2>

        {errors.api && <p className="text-red-500">{errors.api}</p>}

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="firstName"
            placeholder="First Name"
            className={inputClass("firstName")}
            onChange={handleChange}
          />
          <input
            name="lastName"
            placeholder="Last Name"
            className={inputClass("lastName")}
            onChange={handleChange}
          />

          <input
            name="organization"
            placeholder="Organization"
            className={inputClass("organization")}
            onChange={handleChange}
          />
          <input
            name="industry"
            placeholder="Industry"
            className={inputClass("industry")}
            onChange={handleChange}
          />

          <input
            name="designation"
            placeholder="Designation"
            className={inputClass("designation")}
            onChange={handleChange}
          />
          <input
            name="department"
            placeholder="Department"
            className={inputClass("department")}
            onChange={handleChange}
          />

          <input
            name="personalEmail"
            placeholder="Personal Email"
            className={inputClass("personalEmail")}
            onChange={handleChange}
          />
          <input
            name="officialEmail"
            placeholder="Official Email"
            className={inputClass("officialEmail")}
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className={inputClass("password")}
              onChange={handleChange}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 cursor-pointer"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className={inputClass("confirmPassword")}
              onChange={handleChange}
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2 cursor-pointer"
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
              />
            </span>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
            )}
          </div>

          <input
            name="mobile"
            placeholder="Mobile"
            className={inputClass("mobile")}
            onChange={handleChange}
          />
          <input
            name="experience"
            placeholder="Experience"
            className={inputClass("experience")}
            onChange={handleChange}
          />

          {/* Gender */}
          <div className="md:col-span-2">
            <div className="flex gap-6">
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
            {errors.gender && (
              <p className="text-red-500 text-xs">{errors.gender}</p>
            )}
          </div>

          {/* Dates */}
          <DatePicker
            selected={birthDate}
            onChange={setBirthDate}
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            placeholderText="Birth Date"
            className={inputClass("birthDate")}
          />

          <DatePicker
            selected={anniversaryDate}
            onChange={setAnniversaryDate}
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            placeholderText="Anniversary Date"
            className={inputClass("anniversaryDate")}
          />

          {/* LinkedIn */}
          <div className="md:col-span-2">
            <input
              name="linkedIn"
              placeholder="LinkedIn URL"
              className={inputClass("linkedIn")}
              onChange={handleChange}
            />
          </div>

          {/* Country / State / City */}
          <select
            name="country"
            className={inputClass("country")}
            onChange={handleChange}
          >
            <option value="">Country</option>
            {countries.map((c) => (
              <option key={c.isoCode} value={c.isoCode}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            name="state"
            className={inputClass("state")}
            onChange={handleChange}
          >
            <option value="">State</option>
            {states.map((s) => (
              <option key={s.isoCode} value={s.isoCode}>
                {s.name}
              </option>
            ))}
          </select>

          <select
            name="city"
            className={inputClass("city")}
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
