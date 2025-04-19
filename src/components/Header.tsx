import React from 'react';
import { Paintbrush } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Paintbrush className="h-8 w-8 text-indigo-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            AI Art Generator
          </span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link 
                to="/" 
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
              >
                Create
              </Link>
            </li>
            <li>
              <Link 
                to="/gallery" 
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
              >
                Gallery
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;