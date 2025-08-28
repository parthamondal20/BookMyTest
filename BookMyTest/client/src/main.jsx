import { StrictMode } from "react";
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
import Home from "./components/Home";
//pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Test from "./pages/Test";
import PatientDetails from "./pages/PatientDetails";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import PatientSelector from "./pages/PatientSelector";
import SelectAddress from "./pages/SelectAddress";
import AddressForm from "./pages/AddressForm";
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
      <Route path="/patient-address/:step" element={<AddressForm />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
