import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Layout from "./Layout";
//components

import Loader from "./components/Loader";

const Home = lazy(() => import("./components/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Test = lazy(() => import("./pages/Test"));
const PatientDetails = lazy(() => import("./pages/PatientDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Cart = lazy(() => import("./pages/Cart"));
const PatientSelector = lazy(() => import("./pages/PatientSelector"));
const SelectAddress = lazy(() => import("./pages/SelectAddress"));
const AddressForm = lazy(() => import("./pages/AddressForm"));
const TimeSlotPage = lazy(() => import("./pages/TimeSlotPage"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="test/:id" element={<Test />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="cart" element={<Cart />} />
      <Route path="select-patient/:step" element={<PatientSelector />} />
      <Route path="patient-details/:step" element={<PatientDetails />} />
      <Route path="patient-address/:step" element={<AddressForm />} />
      <Route path="select-address/:step" element={<SelectAddress />} />
      <Route path="patient-time-slot/:step" element={<TimeSlotPage />} />
      <Route path="payment-details" element={<PaymentPage />} />
      <Route path="contact-page" element={<ContactPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </StrictMode>
);
