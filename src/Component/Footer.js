import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <p className="text-gray-600 text-sm text-center md:text-left">
          © {new Date().getFullYear()} <span className="font-semibold text-indigo-600">Knowledge Barter</span>. 
          All rights reserved.
        </p>

      
        <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm text-gray-600">
          <Link to="/about" className="hover:text-indigo-600 transition">About</Link>
          <Link to="/contact" className="hover:text-indigo-600 transition">Contact</Link>
          <a 
            href="mailto:support@knowledgebarter.com"
            className="hover:text-indigo-600 transition"
          >
            support@knowledgebarter.com
          </a>
        </div>
      </div>

 
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600"></div>
    </footer>
  );
}
