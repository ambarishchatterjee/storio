import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function Navigation() {


  return (
    <nav className="flex items-center justify-between mb-16">
      <Link to='/'>
        <div className="flex items-center space-x-2">
          <img
            src={"/storio_logo.webp"}
            width={128}
            height={128}
            className="w-16 h-16"
            alt="Storio Logo"
          />
          <span className="text-2xl font-bold text-gray-900">Storio</span>
        </div>
      </Link>
      <div className="flex gap-6 items-center">
        <ul className="hidden md:flex space-x-8 font-medium text-gray-700">
          <li>
            <Link to="/features" className="hover:text-orange-500">
              Features
            </Link>
          </li>
          <li>
            <Link to="/pricing" className="hover:text-orange-500">
              Pricing
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-orange-500">
              Contact
            </Link>
          </li>
        </ul>
          <>
          <Link
          to="/login"
          className="bg-[#1f1f1f] text-white px-4 py-2 rounded-md font-semibold shadow hover:opacity-90"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-[#1f1f1f] text-white px-4 py-2 rounded-md font-semibold shadow hover:opacity-90"
        >
          Sign Up
        </Link>
          </>
        
        {/* <Link
          to="/logout"
          className="bg-[#1f1f1f] text-white px-4 py-2 rounded-md font-semibold shadow hover:opacity-90"
        >Logout</Link> */}
          
      
      </div>
    </nav>
  );
}
