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

  // const [form, setForm] = useState({
  //   firstName: "Vijay",
  //   lastName: "Katake",
  //   organization: "Freelancer",
  //   industry: "Information Technology",
  //   designation: "Sr. Architecture",
  //   department: "Fullstack Developement",
  //   personalEmail: "vijukatake@gmail.com",
  //   officialEmail: "vijay.katake@outlook.com",
  //   mobile: "9604781258",
  //   experience: "21 Yrs.",
  //   gender: "male",
  //   countryCode: "IN", // ✅ ISO code for library lookup
  //   stateCode: "MH", // ✅ ISO code for library lookup
  //   city: "Pune",
  //   linkedIn: "linkedin.com/in/vksrsoftwareengineer",
  //   password: "Vijay@123",
  //   confirmPassword: "Vijay@123",
  // });
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
    experience: ".",
    gender: "",
    countryCode: "", // ✅ ISO code for library lookup
    stateCode: "", // ✅ ISO code for library lookup
    city: "",
    linkedIn: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [birthDate, setBirthDate] = useState(null);
  const [anniversaryDate, setAnniversaryDate] = useState(null);

  // ✅ ISO codes drive the library — states and cities populate correctly
  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(form.countryCode);
  const cities = City.getCitiesOfState(form.countryCode, form.stateCode);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "mobile") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    // ✅ Reset state and city when country changes
    if (name === "countryCode") {
      setForm({ ...form, countryCode: value, stateCode: "", city: "" });
      setErrors((prev) => ({ ...prev, countryCode: "" }));
      return;
    }

    // ✅ Reset city when state changes
    if (name === "stateCode") {
      setForm({ ...form, stateCode: value, city: "" });
      setErrors((prev) => ({ ...prev, stateCode: "" }));
      return;
    }

    setForm({ ...form, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ✅ Convert ISO codes to names before sending to backend
  const getCountryName = (code) => Country.getCountryByCode(code)?.name || code;

  const getStateName = (countryCode, stateCode) =>
    State.getStateByCodeAndCountry(stateCode, countryCode)?.name || stateCode;

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
    if (!form.countryCode) newErrors.countryCode = "Select country";
    if (!form.stateCode) newErrors.stateCode = "Select state";
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
        country: getCountryName(form.countryCode), // ✅ send name
        state: getStateName(form.countryCode, form.stateCode), // ✅ send name
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
            value={form.firstName}
            className={inputClass("firstName")}
            onChange={handleChange}
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            className={inputClass("lastName")}
            onChange={handleChange}
          />
          <input
            name="organization"
            placeholder="Organization"
            value={form.organization}
            className={inputClass("organization")}
            onChange={handleChange}
          />
          <input
            name="industry"
            placeholder="Industry"
            value={form.industry}
            className={inputClass("industry")}
            onChange={handleChange}
          />
          <input
            name="designation"
            placeholder="Designation"
            value={form.designation}
            className={inputClass("designation")}
            onChange={handleChange}
          />
          <input
            name="department"
            placeholder="Department"
            value={form.department}
            className={inputClass("department")}
            onChange={handleChange}
          />
          <input
            name="personalEmail"
            placeholder="Personal Email"
            value={form.personalEmail}
            className={inputClass("personalEmail")}
            onChange={handleChange}
          />
          <input
            name="officialEmail"
            placeholder="Official Email"
            value={form.officialEmail}
            className={inputClass("officialEmail")}
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
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
              value={form.confirmPassword}
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
            value={form.mobile}
            className={inputClass("mobile")}
            onChange={handleChange}
          />
          <input
            name="experience"
            placeholder="Experience"
            value={form.experience}
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
                  checked={form.gender === "male"}
                  onChange={handleChange}
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={form.gender === "female"}
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
          <div>
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
            {errors.birthDate && (
              <p className="text-red-500 text-xs">{errors.birthDate}</p>
            )}
          </div>

          <div>
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
            {errors.anniversaryDate && (
              <p className="text-red-500 text-xs">{errors.anniversaryDate}</p>
            )}
          </div>

          {/* LinkedIn */}
          <div className="md:col-span-2">
            <input
              name="linkedIn"
              placeholder="LinkedIn URL"
              value={form.linkedIn}
              className={inputClass("linkedIn")}
              onChange={handleChange}
            />
            {errors.linkedIn && (
              <p className="text-red-500 text-xs">{errors.linkedIn}</p>
            )}
          </div>

          {/* Country — store isoCode, display name, send name to backend */}
          <div>
            <select
              name="countryCode"
              value={form.countryCode}
              className={inputClass("countryCode")}
              onChange={handleChange}
            >
              <option value="">Country</option>
              {countries.map((c) => (
                <option key={c.isoCode} value={c.isoCode}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.countryCode && (
              <p className="text-red-500 text-xs">{errors.countryCode}</p>
            )}
          </div>

          {/* State */}
          <div>
            <select
              name="stateCode"
              value={form.stateCode}
              className={inputClass("stateCode")}
              onChange={handleChange}
            >
              <option value="">State</option>
              {states.map((s) => (
                <option key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </option>
              ))}
            </select>
            {errors.stateCode && (
              <p className="text-red-500 text-xs">{errors.stateCode}</p>
            )}
          </div>

          {/* City */}
          <div>
            <select
              name="city"
              value={form.city}
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
            {errors.city && (
              <p className="text-red-500 text-xs">{errors.city}</p>
            )}
          </div>
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
