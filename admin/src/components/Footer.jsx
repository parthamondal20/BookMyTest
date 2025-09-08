export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-sm py-4 px-6 text-center text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
      © {new Date().getFullYear()} Lab Test Admin Dashboard · All rights reserved
    </footer>

  );
}
