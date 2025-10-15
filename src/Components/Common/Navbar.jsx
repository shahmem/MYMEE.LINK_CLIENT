import { useNavigate } from 'react-router-dom';
import logo from '../../assets/mymee-logo.png'

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav style={{ fontFamily: "'poppins', sans-serif" }} className="w-full bg-transparent fixed px-4 md:px-6 lg:px-9 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div onClick={()=>{navigate('/')}} className="cursor-pointer ">
          <img 
            src={logo}
            alt="Mymee Logo" 
            className="md:h-20 w-auto h-10"
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Sign in button */}
          <button
            onClick={() => navigate('/login')}
            className="text-gray-700 hover:text-gray-900 text-sm md:text-base transition-colors"
          >
            Sign in
          </button>

          {/* Get Started button */}
          <button
            onClick={() => navigate('/signup')}
            className="bg-black text-white px-4 md:px-5 py-1.5 md:py-2 rounded-lg hover:bg-gray-800 text-xs md:text-sm transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}