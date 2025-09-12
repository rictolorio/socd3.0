import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    full_name: "",
    gender: "",
    civil_status: "",
    id_number: "",
    phone_no: "",
    email: "",
    password: "",
  });
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === 1 && !agree) {
      alert("You must agree to the Privacy Notice before continuing.");
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow">
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Privacy Notice & Consent</h2>
            <div className="h-40 overflow-y-scroll border p-3 rounded mb-4 text-sm text-gray-700">
              <p>
                By registering, you agree to provide accurate and truthful
                information. Your data will be stored securely and used only for
                account creation, authentication, and related services. We will
                not share your information with third parties without your
                consent, except as required by law.
              </p>
              <p className="mt-2">
                Please read our full Privacy Policy for more details on how your
                data is handled.
              </p>
            </div>
            <div className="flex items-center">
              <input
                id="agree"
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="agree" className="text-sm text-gray-700">
                I have read and agree to the Privacy Notice & Consent.
              </label>
            </div>
            <button
              onClick={handleNext}
              className={`mt-4 w-full py-2 px-4 rounded ${
                agree
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
              disabled={!agree}
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Register</h2>
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3"
              required
            />
            <input
              type="text"
              name="gender"
              placeholder="Gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3"
              required
            />
            <input
              type="text"
              name="civil_status"
              placeholder="Civil Status"
              value={formData.civil_status}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3"
              required
            />
            <input
              type="text"
              name="id_number"
              placeholder="National ID / Driver's License"
              value={formData.id_number}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3"
              required
            />
            <input
              type="text"
              name="phone_no"
              placeholder="Phone Number"
              value={formData.phone_no}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3"
              required
            />
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
