import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className="bg-gray-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-sm font-medium">
            <h1 className="text-2xl font-bold">My Blog</h1>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
