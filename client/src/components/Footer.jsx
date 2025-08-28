import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-6 text-center text-blue-600 bg-blue-100 mt-auto">
      &copy; {new Date().getFullYear()} Health-e. All rights reserved.
    </footer>
  );
};

export default Footer;
