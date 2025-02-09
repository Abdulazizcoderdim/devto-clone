import { Search } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left section with logo */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <img src="logo.png" alt="DEV Community" className="h-8 w-12" />
            </Link>

            <div className="flex-1 max-w-xl">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-gray-300 transition-colors"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Second section with buttons */}
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors">
              Log in
            </button>
            <button className="px-3 py-2 text-blue-600 bg-white border border-blue-600 hover:bg-blue-50 hover:underline rounded-lg transition-colors">
              Create account
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
