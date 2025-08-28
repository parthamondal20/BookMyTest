import { useState, useEffect } from "react";
import Stepper from "../components/Stepper";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addPatient } from "../features/orderSlice";
import { getUserAddressess } from "../services/user";
export default function PatientDetails() {
  const user = useSelector((state) => state.auth.user);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [dob, setDob] = useState(""); // for <input type="date" />
  const [age, setAge] = useState(null);
  const [mobileNo, setMobileNo] = useState(null);
  const [ageError, setAgeError] = useState("");
  const [genderError, setGenderError] = useState("");

  const [addressess, setAddressess] = useState([]);
  const [loading, setLoading] = useState(false);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const calculateAge = (dobString) =>
    new Date(Date.now() - new Date(dobString).getTime()).getUTCFullYear() -
    1970;

  useEffect(() => {
    setAgeError(null);
    setGenderError(null);
  }, [day, month, year, gender]);

  const handleContinue = () => {
    if (!day || !month || !year) {
      setAgeError("Enter your date of birth properly");
      return;
    }
    if (!gender) {
      setGenderError("Please enter the genter of the patient");
      return;
    }
    const monthIndex = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ].indexOf(month);

    if (monthIndex >= 0) {
      let dobString = `${year}-${String(monthIndex + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;
      const originalAge = calculateAge(dobString);
      dobString = `${String(day).padStart(2, "0")}-${String(
        monthIndex + 1
      ).padStart(2, "0")}-${year}`;
      if (originalAge <= 10) {
        setAgeError("the age of patient have to be more then 10");
        return;
      }
      setAge(originalAge);
      const patient = {
        name: name,
        age: originalAge,
        email: email,
        DOB: dobString,
        gender: gender,
        mobileNo: mobileNo,
      };
      dispatch(addPatient(patient));
      navigate(`/patient-address/2`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Stepper />

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8 text-white">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold">Patient Registration</h1>
                <p className="text-blue-100 mt-1">
                  Complete the form to add a new patient
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid gap-8">
              {/* Personal Information Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Personal Information
                  </h2>
                </div>

                {/* Patient Name */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Patient Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="fullname"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter patient's complete name"
                      className="w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 placeholder-gray-400 text-lg"
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <svg
                        className={`w-5 h-5 transition-colors duration-200 ${name ? "text-blue-500" : "text-gray-300"
                          }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-800">
                    Date of Birth <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-600 uppercase tracking-wide">
                        Day
                      </label>
                      <input
                        type="number"
                        placeholder="DD"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        min="1"
                        max="31"
                        className="w-full px-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl text-center text-lg font-semibold focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-600 uppercase tracking-wide">
                        Month
                      </label>
                      <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="w-full px-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl text-lg font-semibold focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                      >
                        <option value="">Select Month</option>
                        <option>Jan</option>
                        <option>Feb</option>
                        <option>Mar</option>
                        <option>Apr</option>
                        <option>May</option>
                        <option>Jun</option>
                        <option>Jul</option>
                        <option>Aug</option>
                        <option>Sep</option>
                        <option>Oct</option>
                        <option>Nov</option>
                        <option>Dec</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-600 uppercase tracking-wide">
                        Year
                      </label>
                      <input
                        type="number"
                        placeholder="YYYY"
                        min="1900"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        max="2025"
                        className="w-full px-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl text-center text-lg font-semibold focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {ageError && (
                    <div className="bg-gradient-to-r from-rose-50 to-red-50 border-2 border-rose-200 rounded-2xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </div>
                        <div>
                          <p className="text-rose-800 font-medium">
                            Invalid Date of Birth
                          </p>
                          <p className="text-rose-700 text-sm mt-1">
                            {ageError}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Gender */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-800">
                    Gender <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={gender === "male"}
                        onChange={(e) => setGender(e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">Male</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={gender === "female"}
                        onChange={(e) => setGender(e.target.value)}
                        className="h-4 w-4 text-pink-600 focus:ring-pink-500"
                      />
                      <span className="text-gray-700">Female</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        checked={gender === "other"}
                        onChange={(e) => setGender(e.target.value)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-700">Other</span>
                    </label>
                  </div>
                </div>
              </div>

              {genderError && (
                <div>
                  <p>{genderError}</p>
                </div>
              )}

              {/* Contact Information Section */}
              <div className="border-t border-gray-200 pt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Contact Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mobile Number */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="mobileno"
                        value={mobileNo || ""}
                        onChange={(e) => setMobileNo(e.target.value)}
                        placeholder="Enter 10-digit mobile number"
                        className="w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 placeholder-gray-400 text-lg"
                      />
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        <svg
                          className={`w-5 h-5 transition-colors duration-200 ${mobileNo ? "text-emerald-500" : "text-gray-300"
                            }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email address"
                        className="w-full px-5 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 placeholder-gray-400 text-lg"
                      />
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        <svg
                          className={`w-5 h-5 transition-colors duration-200 ${email ? "text-emerald-500" : "text-gray-300"
                            }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleContinue}
                className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl shadow-md transition-all duration-200"
              >
                Continue
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
