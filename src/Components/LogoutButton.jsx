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
     className="bg-black text-white px-4 md:px-5 py-1.5 md:py-2 rounded-lg hover:bg-gray-800 text-xs md:text-sm transition-colors"
    >
      Logout

    </button>
  );
}

