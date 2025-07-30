import { Link } from "react-router-dom";

export default function Copyright() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-10 mt-2">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">
        
        {/* Branding & Tagline */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Storio</h3>
          <p>Your trusted cloud storage solution.</p>
          <p className="mt-4">&copy; {new Date().getFullYear()} Storio. All rights reserved.</p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:text-orange-500">Home</Link></li>
            <li><Link to="/features" className="hover:text-orange-500">Features</Link></li>
            <li><Link to="/pricing" className="hover:text-orange-500">Pricing</Link></li>
            <li><Link to="/login" className="hover:text-orange-500">Sign In</Link></li>
            <li><Link to="/signup" className="hover:text-orange-500">Create Account</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Contact Us</h4>
          <ul className="space-y-1">
            <li>Email: support@storio.io</li>
            <li>Phone: +91-8820392947</li>
            <li>Address: Kolkata, India</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
