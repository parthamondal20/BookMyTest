import { useState } from "react";
import { useParams } from "react-router-dom";

const steps = [
  "Add patient details",
  "Select patient address",
  "Select time slot",
];

export default function Stepper() {
  const { step } = useParams();
  const [currentStep, setCurrentStep] = useState(Number(step) || 1);

  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      {/* Step Indicators */}
      <div className="flex justify-between items-center relative">
        {steps.map((label, index) => (
          <div
            key={index}
            className="flex flex-col items-center relative flex-1"
          >
            {/* Step Circle */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 relative z-10 ${currentStep > index + 1
                  ? "bg-blue-600 text-white"
                  : currentStep === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-500"
                }`}
            >
              {index + 1}
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div
                className={`absolute top-4 left-1/2 w-full h-0.5 -translate-y-1/2 ${currentStep > index + 1 ? "bg-blue-600" : "bg-gray-300"
                  }`}
              ></div>
            )}

            {/* Step Label */}
            <p
              className={`text-sm text-center mt-3 transition-colors duration-300 ${currentStep >= index + 1
                  ? "text-gray-900 font-medium"
                  : "text-gray-500"
                }`}
            >
              {label}
            </p>
          </div>
        ))}
      </div>


    </div>
  );
}
