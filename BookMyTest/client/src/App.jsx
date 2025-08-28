import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-white shadow flex justify-between items-center px-8 py-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-900">Health-e</span>
        </div>
        <div className="space-x-6">
          <a href="#" className="text-blue-700 hover:text-blue-900 font-medium">
            Home
          </a>
          <a href="#" className="text-blue-700 hover:text-blue-900 font-medium">
            Features
          </a>
          <a href="#" className="text-blue-700 hover:text-blue-900 font-medium">
            Contact
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 gap-12">
        <div className="flex-1">
          <h1 className="text-5xl font-bold text-blue-900 mb-6">
            Empower Your Health Journey
          </h1>
          <p className="text-xl text-blue-700 mb-8">
            Track your health, get insights, and connect with professionals.
            Start your journey to better health today.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
            Get Started
          </button>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80"
            alt="Health"
            className="rounded-xl shadow-lg w-80 h-80 object-cover"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-12 bg-white rounded-t-3xl shadow-lg">
        <h2 className="text-3xl font-bold text-blue-800 text-center mb-8">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-50 p-6 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Health Tracking
            </h3>
            <p className="text-gray-700">
              Monitor your vitals, activities, and progress with easy-to-use
              tools.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Personal Insights
            </h3>
            <p className="text-gray-700">
              Get personalized recommendations and analytics for your
              well-being.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Professional Connect
            </h3>
            <p className="text-gray-700">
              Easily connect with healthcare professionals for advice and
              support.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-blue-600 bg-blue-100">
        &copy; {new Date().getFullYear()} Health-e. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
