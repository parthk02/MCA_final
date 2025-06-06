import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-400 text-center py-6 mt-8 shadow-inner rounded-t-2xl">
      <h4 className="text-lg font-bold text-gray-100 mb-1">Promptify.AI</h4>
      <p className="text-sm opacity-70">© {new Date().getFullYear()} Crafted with <span className="text-red-500">❤️</span> by Parth & Shreya.</p>
    </footer>
  );
};

export default Footer; 