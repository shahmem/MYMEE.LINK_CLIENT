// Components/LogoutButton.jsx
import { LogOut } from "lucide-react";

export default function LogoutButton({ onLogout }) {
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      onLogout();
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 absolute right-4.5 top-3.5  p-2 bg-gray-200 text-red-500 rounded-full hover:text-red-600 transition-colors"
    >
      <LogOut className="w-4 h-4" />

    </button>
  );
}

