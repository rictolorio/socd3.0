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
    birthdate: "",
    civil_status: "",
    username: "",
    email: "",
    password: "",
    address: "",
    mobile_number: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      payload.append(key, formData[key]);
    });

    try {
      const res = await fetch("http://127.0.0.1:8000/register/", {
        method: "POST",
        body: payload,
      });

      if (res.ok) {
        toast.success("✅ Registration submitted for approval!");
        setFormData(initialFormState);
        setStep(1);
      } else {
        toast.error("❌ Failed to submit registration.");
      }
    } catch (err) {
      toast.error("⚠ Server error, please try again.");
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
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg mt-20 ">
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
                step === s.id ? "bg-indigo-100 border-indigo-600" : "bg-gray-100 border-gray-300"
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
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block mb-1">Birthdate</label>
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
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
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Widowed">Widowed</option>
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
              <label className="block mb-1">Mobile</label>
              <input
                type="tel"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
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
              We value your privacy. In compliance with Republic Act No. 10173 (Data Privacy Act of 2012), we inform you that the following personal information may be collected and processed through this application:

Full name

Address

Gender

Date of birth

Driver’s license number

National ID number

Photograph

Violation details

Purpose of Collection
Your personal information is collected for the purpose of recording and managing traffic violations as mandated by local government traffic regulations. The data will be used to identify violators, generate violation records, and assist in enforcing penalties or clearances.

Data Access and Sharing
Your personal information will only be accessed by authorized traffic enforcers, city administrators, and relevant government authorities. It will not be shared with unauthorized third parties without your consent, unless required by law.

Data Retention
Your personal information will be stored securely and retained only for as long as necessary to fulfill the purposes stated, or as required by applicable laws and regulations.

Your Rights
Under the Data Privacy Act, you have the right to:

Be informed of how your data is used.

Access and request a copy of your personal data.

Correct or update inaccurate information.

Request deletion, blocking, or withdrawal of consent (unless processing is required by law).

File complaints with the National Privacy Commission (NPC) if your rights are violated.

{/* For any questions, requests, or concerns regarding your personal data, you may contact our Data Protection Officer (DPO) at:
📧 Email: [Insert DPO Email]
📞 Contact Number: [Insert DPO Phone] */}
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
              <li><strong>Birthdate:</strong> {formData.birthdate}</li>
              <li><strong>Status:</strong> {formData.civil_status}</li>
              <li><strong>Username:</strong> {formData.username}</li>
              <li><strong>Email:</strong> {formData.email}</li>
              <li><strong>Address:</strong> {formData.address}</li>
              <li><strong>Mobile:</strong> {formData.mobile_number}</li>
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
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Back
            </button>
          )}
          {step < 4 && (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Next
            </button>
          )}
          {step === 4 && (
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded"
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
