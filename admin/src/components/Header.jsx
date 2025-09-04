import { Bell, LogOut, Menu } from "lucide-react";

export default function Header({ onToggleSidebar }) {
  return (
    <header className="flex items-center justify-between bg-white shadow-sm px-6 py-4">
      {/* Left: Sidebar toggle + Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Admin Dashboard</h1>
      </div>

      {/* Right: Notifications + Profile */}
      <div className="flex items-center gap-5">
        <button className="relative p-2 rounded-lg hover:bg-gray-100">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            alt="Admin Avatar"
            className="w-9 h-9 rounded-full border"
          />
          <span className="text-sm font-medium text-gray-700">Admin</span>
        </div>

        <button className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </header>
  );
}
