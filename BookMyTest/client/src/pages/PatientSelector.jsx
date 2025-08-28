import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle, Plus } from "lucide-react";
import Stepper from "../components/Stepper";
const savedPatients = [
  { id: 1, name: "Rahul Sharma", gender: "Male", dob: "1990-05-15" },
  { id: 2, name: "Neha Sharma", gender: "Female", dob: "1992-03-10" },
  { id: 3, name: "Aarav Sharma", gender: "Male", dob: "2016-08-01" },
];

export default function PatientSelector() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-3xl mx-auto mt-10 px-4">
      {/* Stepper */}
      <div className="w-full max-w-4xl">
        <Stepper />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-6 text-center">
        Select Patient
      </h2>

      {/* Patient List */}
      <div className="grid sm:grid-cols-2 mb-6 gap-5">
        {savedPatients.map((patient) => (
          <div
            key={patient.id}
            onClick={() => setSelectedPatient(patient)}
            className={`flex items-center gap-4 p-5 rounded-2xl border shadow-sm cursor-pointer transition-all ${
              selectedPatient?.id === patient.id
                ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                : "border-gray-200 hover:border-blue-400 hover:shadow-md"
            }`}
          >
            <UserCircle
              className={`w-12 h-12 ${
                selectedPatient?.id === patient.id
                  ? "text-blue-600"
                  : "text-gray-500"
              }`}
            />
            <div>
              <p className="font-semibold text-gray-900">{patient.name}</p>
              <p className="text-sm text-gray-600">
                {patient.gender} • DOB: {patient.dob}
              </p>
            </div>
          </div>
        ))}

        {/* Add New Patient Card */}
        <div
          onClick={() => navigate("/patient-details/:1")}
          className="flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
        >
          <Plus className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-gray-600 font-medium">Add New Patient</p>
        </div>
      </div>

      {/* Selected Patient Preview */}
      {selectedPatient && (
        <div className="mt-8 p-4 bg-green-50 border border-green-300 rounded-xl text-center">
          <p className="text-green-800">
            ✅ Booking will be done for{" "}
            <span className="font-semibold">{selectedPatient.name}</span>.
          </p>
        </div>
      )}

      {/* Continue Button */}
      {selectedPatient && (
        <div className="mt-6 mb-6 text-center">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition">
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
