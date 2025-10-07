import { Link2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="md:w-[70%] mx-auto py-2 bg-white/80 backdrop-blur-sm shadow-sm sticky top-3 z-50 rounded-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link2 className="w-8 h-8 text-blue-600" />
            <span className="ml-2 md:text-2xl text-lg font-bold text-gray-900">
              Mymee.link
            </span>
          </div>
          <div className="flex items-center md:gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="md:px-6 px-6 py-2 md:text-base text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
            >
              Sign Up <br /> Free
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
