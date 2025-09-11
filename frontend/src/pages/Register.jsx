import { useState } from "react";



export default function Registration() {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    mobile: "",
    idNumber: "",
  });

  // Handle change in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Simulate auto-fill from ID (mock only for now)
  const autoFillData = (type) => {
    if (type === "license") {
      setFormData({
        fullName: "Juan Dela Cruz",
        email: "juan.license@example.com",
        address: "123 License Street",
        mobile: "09171234567",
        idNumber: "D123456789",
      });
    } else if (type === "national") {
      setFormData({
        fullName: "Maria Santos",
        email: "maria.national@example.com",
        address: "456 National Avenue",
        mobile: "09179876543",
        idNumber: "N987654321",
      });
    }
  };

  // Go to next step
  const handleNext = () => {
    if (method === "license" || method === "national") {
      autoFillData(method);
    }
    setStep(2);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          User Registration
        </h1>

        {/* Step 1: Choose registration method */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-700">
              How would you like to register?
            </h2>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setMethod("license")}
                className={`p-4 border rounded-lg hover:bg-blue-100 transition ${
                  method === "license" ? "border-blue-500" : ""
                }`}
              >
                Use Driver’s License
              </button>
              <button
                onClick={() => setMethod("national")}
                className={`p-4 border rounded-lg hover:bg-blue-100 transition ${
                  method === "national" ? "border-blue-500" : ""
                }`}
              >
                Use National ID
              </button>
              <button
                onClick={() => setMethod("manual")}
                className={`p-4 border rounded-lg hover:bg-blue-100 transition ${
                  method === "manual" ? "border-blue-500" : ""
                }`}
              >
                Enter Information Manually
              </button>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNext}
                disabled={!method}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Personal Information Form */}
        {step === 2 && (
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Mobile Number</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">ID Number</label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
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
