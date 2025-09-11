import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    full_name: "",
    gender: "",
    civil_status: "",
    id_number: "",
    birth_date: "",
    address: "",
    phone_no: "",
    photo: null,
    id_card: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] }); // handle file upload
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/users/register/", {
        method: "POST",
        body: formDataToSend,
      });

      if (res.ok) {
        alert("Registration submitted! Please wait for approval.");
        navigate("/login");
      } else {
        const data = await res.json();
        alert("Error: " + JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Register</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Registration Method */}
        {step === 1 && (
          <div className="text-center">
            <p className="mb-4">Choose registration method:</p>
            <button
              type="button"
              onClick={nextStep}
              className="w-full py-3 mb-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Upload ID (Driver’s License / National ID)
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="w-full py-3 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Enter details manually
            </button>
          </div>
        )}

        {/* Step 2: Personal Information */}
        {step === 2 && (
          <>
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <select
              name="civil_status"
              value={formData.civil_status}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            >
              <option value="">Select Civil Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="widowed">Widowed</option>
              <option value="separated">Separated</option>
              <option value="divorced">Divorced</option>
            </select>

            <input
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />

            <input
              type="text"
              name="id_number"
              placeholder="ID Number (Optional)"
              value={formData.id_number}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />

            <div className="flex justify-between">
              <button type="button" onClick={prevStep} className="px-6 py-2 bg-gray-400 text-white rounded-lg">
                Back
              </button>
              <button type="button" onClick={nextStep} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 3: Contact Info */}
        {step === 3 && (
          <>
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            ></textarea>

            <input
              type="tel"
              name="phone_no"
              placeholder="Phone Number"
              value={formData.phone_no}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />

            <div className="flex justify-between">
              <button type="button" onClick={prevStep} className="px-6 py-2 bg-gray-400 text-white rounded-lg">
                Back
              </button>
              <button type="button" onClick={nextStep} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 4: Upload Files */}
        {step === 4 && (
          <>
            <label className="block">Upload Photo:</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />

            <label className="block">Upload ID Card:</label>
            <input
              type="file"
              name="id_card"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />

            <div className="flex justify-between">
              <button type="button" onClick={prevStep} className="px-6 py-2 bg-gray-400 text-white rounded-lg">
                Back
              </button>
              <button type="button" onClick={nextStep} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 5: Review & Submit */}
        {step === 5 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Review your details</h2>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm">{JSON.stringify(formData, null, 2)}</pre>

            <div className="flex justify-between mt-4">
              <button type="button" onClick={prevStep} className="px-6 py-2 bg-gray-400 text-white rounded-lg">
                Back
              </button>
              <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg">
                Submit
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
