import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTests } from "../services/test.js";
import Loader from "./Loader.jsx";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../features/loaderSlice.js";
import { useNavigate } from "react-router-dom";
import socket from "../utils/socket.js";
const healthConcerns = [
  {
    name: "Fever",
    icon: "https://www.practo.com/tests/public/images/landingpage_icons/Fever.svg?v=1569493559",
  },
  {
    name: "Diabetes",
    icon: "https://www.practo.com/tests/public/images/landingpage_icons/Diabetes.svg?v=1569493559",
  },
  {
    name: "Skin",
    icon: "https://www.practo.com/tests/public/images/landingpage_icons/Skin.svg?v=1569493559",
  },
  {
    name: "Kidney",
    icon: "https://www.practo.com/tests/public/images/landingpage_icons/Kidney.svg?v=1569493559",
  },
  {
    name: "Digestion",
    icon: "https://www.practo.com/tests/public/images/landingpage_icons/Stomach.svg?v=1569493559",
  },
];

const Home = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchTests = async () => {
    try {
      dispatch(showLoader());
      const testsResponse = await getTests();
      setTests(testsResponse);
    } catch (error) {
      console.log("Error fetching tests:", error);
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    fetchTests();
    socket.on("testUpdated", (updatedTest) => {
      setTests((prev) =>
        prev.map((t) => (t._id === updatedTest._id ? updatedTest : t))
      );
    });

    socket.on("testAdded", (newTest) => {
      setTests((prev) => [...prev, newTest]);
    });

    socket.on("testDeleted", (deletedId) => {
      setTests((prev) => prev.filter((t) => t._id !== deletedId));
    });

    // Cleanup listeners when component unmounts
    return () => {
      socket.off("testUpdated");
      socket.off("testAdded");
      socket.off("testDeleted");
    };
  }, []);

  return (
    <>
      <Loader />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 px-6 py-12">
        {/* Hero Section */}
        <section className="w-full max-w-7xl mx-auto bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl shadow-lg px-10 py-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-10 text-white">
          {/* Left Content */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
              Book Lab Tests with Ease 🧪
            </h1>
            <p className="text-blue-100 text-lg mb-6 max-w-md">
              Get certified lab tests at affordable prices with free home sample
              collection.
            </p>

            {/* Call to Action */}
            <div className="flex items-center gap-4 bg-white text-blue-700 font-bold rounded-2xl px-5 py-3 shadow-lg w-fit">
              <span className="text-xl">📞</span>
              <span>+91 9873637819</span>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80"
              alt="Lab Test"
              className="rounded-2xl shadow-xl w-56 h-56 object-cover"
            />
          </div>
        </section>

        {/* Available Tests */}
        <section className="w-full max-w-7xl mx-auto mb-20">
          {tests.length > 0 ? (
            <div>
              {/* <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
                Available Tests
              </h2> */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {tests.map((test) => (
                  <li
                    key={test._id}
                    onClick={() => navigate(`/test/${test._id}`)}
                    className="cursor-pointer p-6 bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
                  >
                    <img
                      src={test.image}
                      alt={test.testname}
                      className="w-24 h-24 object-contain mb-4"
                    />
                    <h3 className="text-lg font-semibold text-blue-800 mb-2 truncate w-full">
                      {test.testname}
                    </h3>
                    <p className="text-gray-600 text-sm mb-1">
                      Price:{" "}
                      <span className="text-blue-600 font-bold">
                        ₹{test.price}
                      </span>
                    </p>
                    <p className="text-black-400 text-sm">
                      Reports in {test.duration} days
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-lg p-12 text-center border border-gray-100">
              <h2 className="text-3xl font-extrabold text-blue-800 mb-4">
                No Tests Available
              </h2>
              <p className="text-gray-600 mb-6">
                Please check back later or contact support for assistance.
              </p>
              <Link
                to="/contact"
                className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
              >
                Contact Support
              </Link>
            </div>
          )}
        </section>

        {/* Health Concerns */}
        <section className="w-full max-w-6xl mx-auto mb-20">
          <h3 className="text-3xl font-extrabold text-blue-900 mb-12 text-center">
            Explore Tests by Health Concern
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10">
            {healthConcerns.map((concern) => (
              <div
                key={concern.name}
                className="flex flex-col items-center bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 hover:scale-105 transition cursor-pointer"
              >
                <img
                  src={concern.icon}
                  alt={concern.name}
                  className="w-16 h-16 mb-4"
                />
                <p className="text-blue-700 font-semibold text-lg">
                  {concern.name}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
