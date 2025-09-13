// src/pages/Register.jsx
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User, FileText, ShieldCheck, CheckCircle } from "lucide-react";

const Register = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const initialFormState = {
    full_name: "",
    gender: "",
    birth_date: "",
    civil_status: "",
    username: "",
    email: "",
    password: "",
    address: "",
    phone_no: "",
    photo: null,
    id_card: null,
    consent_given: false,
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const normalizePhone = (phone) => {
    if (!phone) return "";
    if (phone.startsWith("+")) return phone;
    if (phone.startsWith("0")) return `+63${phone.substring(1)}`;
    return phone;
  };

  // 🔹 Validation per step
  const validateStep = () => {
    const stepErrors = {};

    if (step === 1) {
      if (!formData.full_name) stepErrors.full_name = ["Full Name is required"];
      if (!formData.gender) stepErrors.gender = ["Gender is required"];
      if (!formData.birth_date) stepErrors.birth_date = ["Birthdate is required"];
      if (!formData.civil_status) stepErrors.civil_status = ["Civil Status is required"];
      if (!formData.address) stepErrors.address = ["Address is required"];
      if (!formData.phone_no) stepErrors.phone_no = ["Phone Number is required"];
    }

    if (step === 2) {
      if (!formData.email) stepErrors.email = ["Email is required"];
      if (!formData.username) stepErrors.username = ["Username is required"];
      if (!formData.password || formData.password.length < 8) {
        stepErrors.password = ["Password must be at least 8 characters"];
      }
    }

    if (step === 3) {
      if (!formData.consent_given) stepErrors.consent_given = ["Consent is required"];
    }

    setErrors(stepErrors);

    // show toasts per field
    if (Object.keys(stepErrors).length > 0) {
      Object.entries(stepErrors).forEach(([field, msgs]) => {
        toast.error(`${field.replace("_", " ")}: ${msgs[0]}`);
      });
    }

    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setLoading(true);
    setErrors({});

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        if (key === "phone_no") {
          payload.append(key, normalizePhone(value));
        } else {
          payload.append(key, value);
        }
      }
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/register/", {
        method: "POST",
        body: payload,
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data);
        Object.entries(data).forEach(([field, msgs]) => {
          toast.error(`${field.replace("_", " ")}: ${msgs[0]}`);
        });
      } else {
        toast.success("🎉 Registration submitted successfully!");
        setFormData(initialFormState);
        setStep(1);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, title: "Personal Info", icon: <User className="w-5 h-5" /> },
    { id: 2, title: "Account & Identity", icon: <FileText className="w-5 h-5" /> },
    { id: 3, title: "Privacy & Consent", icon: <ShieldCheck className="w-5 h-5" /> },
    { id: 4, title: "Review & Submit", icon: <CheckCircle className="w-5 h-5" /> },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border border-blue-700/50 shadow-2xl rounded-lg mt-20">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Progress Steps */}
      <div className="flex justify-between mb-6">
        {steps.map((s) => (
          <div
            key={s.id}
            className={`flex flex-col items-center text-sm ${
              step === s.id ? "text-indigo-600" : "text-gray-400"
            }`}
          >
            <div
              className={`p-2 rounded-full border ${
                step === s.id
                  ? "bg-indigo-100 border-indigo-600"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              {s.icon}
            </div>
            <span>{s.title}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
            {/* STEP 1 - Personal Info */}
        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border px-3 py-2 rounded mb-1"
              required
            />
            {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name[0]}</p>}

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mb-1"
              required
            >
              <option value="">Select Gender...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender[0]}</p>}

            <input
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mb-1"
              required
            />
            {errors.birth_date && <p className="text-red-500 text-sm">{errors.birth_date[0]}</p>}

            <select
              name="civil_status"
              value={formData.civil_status}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mb-1"
              required
            >
              <option value="">Civil Status...</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Widowed">Widowed</option>
            </select>
            {errors.civil_status && <p className="text-red-500 text-sm">{errors.civil_status[0]}</p>}

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full border px-3 py-2 rounded mb-1"
              required
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address[0]}</p>}

            <input
              type="tel"
              name="phone_no"
              value={formData.phone_no}
              onChange={handleChange}
              placeholder="+639123456789"
              className="w-full p-2 border rounded mb-1"
              required
            />
            {errors.phone_no && <p className="text-red-500 text-sm">{errors.phone_no[0]}</p>}
          </div>
        )}

        {/* STEP 2 - Account & Identity */}
        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Account & Identity</h2>
            <div className="mb-3">
              <label className="block mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border px-3 py-2 rounded mb-1"
                required
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}

              <label className="block mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mb-1"
                required
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username[0]}</p>}
            </div>

            <div className="mb-3">
              <label className="block mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                minLength={8}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded mb-1"
                required
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}
            </div>

            <div className="mb-3">
              <label className="block mb-1">Photo</label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border px-3 py-2 rounded mb-1"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">ID Card</label>
              <input
                type="file"
                name="id_card"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>
        )}

        {/* STEP 3 - Privacy & Consent */}
        {step === 3 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Privacy & Consent</h2>
            <p className="text-sm mb-4 text-gray-600 border p-3 rounded bg-gray-50">
              By registering, you agree to the collection and processing of your
              personal data in accordance with RA 10173 (Data Privacy Act of 2012).
            </p>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="consent_given"
                checked={formData.consent_given}
                onChange={handleChange}
                required
              />
              <span>I give my consent.</span>
            </label>
            {errors.consent_given && (
              <p className="text-red-500 text-sm">{errors.consent_given[0]}</p>
            )}
          </div>
        )}

        {/* STEP 4 - Review */}
        {step === 4 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Review & Submit</h2>
            <ul className="text-sm space-y-2">
              <li><strong>Name:</strong> {formData.full_name}</li>
              <li><strong>Gender:</strong> {formData.gender}</li>
              <li><strong>Birthdate:</strong> {formData.birth_date}</li>
              <li><strong>Status:</strong> {formData.civil_status}</li>
              <li><strong>Username:</strong> {formData.username}</li>
              <li><strong>Email:</strong> {formData.email}</li>
              <li><strong>Address:</strong> {formData.address}</li>
              <li><strong>Phone:</strong> {normalizePhone(formData.phone_no)}</li>
              <li>
                <strong>Photo:</strong>{" "}
                {formData.photo && (
                  <img
                    src={URL.createObjectURL(formData.photo)}
                    alt="preview"
                    className="h-16 mt-1 rounded"
                  />
                )}
              </li>
              <li>
                <strong>ID Card:</strong>{" "}
                {formData.id_card && (
                  <img
                    src={URL.createObjectURL(formData.id_card)}
                    alt="preview"
                    className="h-16 mt-1 rounded"
                  />
                )}
              </li>
            </ul>
          </div>
        )}
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Back
            </button>
          ) : (
            <span />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Next
            </button>
          ) : (
            <button
              type="button" // manual submit
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Register;
