// src/pages/Register.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import { User, FileText, ShieldCheck, CheckCircle } from "lucide-react";

const Register = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

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
    consent: false,
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
    if (phone.startsWith("0")) {
      return `+63${phone.substring(1)}`;
    }
    return phone;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    payload.append("full_name", formData.full_name);
    payload.append("username", formData.username);
    payload.append("email", formData.email);
    payload.append("address", formData.address);
    payload.append("phone_no", normalizePhone(formData.phone_no));
    payload.append("password", formData.password);
    payload.append("gender", formData.gender);
    payload.append("birth_date", formData.birth_date);
    payload.append("civil_status", formData.civil_status);

    if (formData.photo) payload.append("photo", formData.photo);
    if (formData.id_card) payload.append("id_card", formData.id_card);

    payload.append("consent_given", formData.consent ? "true" : "false");

    try {
      const response = await fetch("http://127.0.0.1:8000/register/", {
        method: "POST",
        body: payload,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Validation errors:", data);
        toast.error("⚠️ Please check your inputs and try again.");
      } else {
        console.log("✅ Registration successful:", data);
        toast.success("🎉 Registration submitted successfully!");
        setFormData(initialFormState);
        setStep(1);
      }
    } catch (error) {
      console.error("Validation errors:", JSON.stringify(error.response?.data, null, 2));
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
            <div className="mb-3">
              <label className="block mb-1">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block mb-1">Birthdate</label>
              <input
                type="date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Civil Status</label>
              <select
                name="civil_status"
                value={formData.civil_status}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option value="">Select...</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Phone No.</label>
              <input
                type="tel"
                name="phone_no"
                value={formData.phone_no}
                onChange={handleChange}
                placeholder="+639123456789"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        )}

        {/* STEP 2 - Account & Identity */}
        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Account & Identity</h2>
            <div className="mb-3">
              <label className="block mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                minLength={8}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Photo (Selfie)</label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">National ID / Driver’s License</label>
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
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                required
              />
              <span>I give my consent.</span>
            </label>
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
              <li><strong>Phone No:</strong> {normalizePhone(formData.phone_no)}</li>
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
          {/* Back button (hidden on step 1) */}
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Back
            </button>
          ) : (
            <span /> // keeps spacing when no back button
          )}

          {/* Next or Submit */}
          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
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
