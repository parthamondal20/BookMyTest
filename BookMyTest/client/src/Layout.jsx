import { Outlet, useNavigation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
function Layout() {
  const navigation = useNavigation();
  return (
    <>
      <Header />
      {navigation.state === "loading" ? <p>Loading...</p> : <Outlet />}
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
      />
    </>
  );
}

export default Layout;
