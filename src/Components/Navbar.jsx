import { useNavigate } from 'react-router-dom';
import logo from '../assets/mymee-logo.png'
import LogoutButton from './LogoutButton';

export default function Navbar({onLogout}) {
  const navigate = useNavigate();

  return (
    <nav style={{ fontFamily: "'poppins', sans-serif" }} className="w-full bg-white border-b border-gray-100 absolute px-4 md:px-6 lg:px-9 py-3 z-50 ">
      <div className="px-4 md:px-16 lg:px-20 mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="">
          <img 
            src={logo}
            alt="Mymee Logo" 
            className="md:h-20 w-auto h-10"
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Sign in button */}
        

          {/* Get Started button */}
          <LogoutButton onLogout={onLogout}/>
        </div>
      </div>
    </nav>
  );
}