import { Globe, Phone, UserPlus, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import ImageCarousel from "../ImageCarousel";


export default function NavBar() {
  return (
    <nav className="absolute top-0 left-0 w-full bg-blue-800 text-white shadow-md z-20">
      <div className="mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo + Title */}
        <Link to="/" className="flex items-center space-x-3">
        <img src="/public/socdlogo.png"  alt="Logo" className="w-8 h-8" />
          <span className="font-black text-lg">DRIVER PORTAL</span>
        </Link>

        {/* Links */}
        <div className="flex space-x-8 text-lg font-medium">
          <a href="https://oroquietacity.gov.ph" className="flex items-center space-x-2 relative group">
            <Globe className="w-5 h-5" />
            <span className="hidden md:inline">LGU-OROQUIETA WEBPAGE</span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
          </a>

          <a href="#" className="flex items-center space-x-2 relative group">
            <Phone className="w-5 h-5" />
            <span className="hidden md:inline">CONTACT</span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
          </a>

          <Link to="/register"  className="flex items-center space-x-2 relative group">
            <UserPlus className="w-5 h-5" />
            <span className="hidden md:inline">REGISTER</span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <a href="#" className="flex items-center space-x-2 relative group">
            <LogIn className="w-5 h-5" />
            <span className="hidden md:inline">LOGIN</span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
      </div>
    </nav>
  );
}
