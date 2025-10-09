import { useNavigate } from 'react-router-dom';
import logo from '../../assets/mymee-logo.png'

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-transparent px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="">
          <img 
            src={logo}
            alt="Mymee Logo" 
            className="h-24 sm:h-10"
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Sign in button */}
          <button
            onClick={() => navigate('/login')}
            className="text-gray-700 hover:text-gray-900 font-medium text-sm sm:text-base transition-colors"
          >
            Sign in
          </button>

          {/* Get Started button */}
          <button
            onClick={() => navigate('/signup')}
            className="bg-black text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-md hover:bg-gray-800 font-medium text-sm sm:text-base transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}