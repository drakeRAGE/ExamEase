import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-gray-900/95 to-indigo-950/95 backdrop-blur-xl border-b border-white/10 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center group">
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text group-hover:from-indigo-300 group-hover:to-pink-300 transition-all duration-300">Exam</span>
          <span className="text-white group-hover:text-gray-200 transition-colors duration-300">Ease</span>
        </Link>

        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <span className="hidden md:flex items-center text-gray-300 bg-gray-800/40 px-4 py-2 rounded-full border border-gray-700/50">
                <FaUser className="h-5 w-5 mr-2 text-indigo-400" />
                <span className="text-gray-300">Welcome, </span>
                <span className="text-white font-medium ml-1">{user.name}</span>
              </span>
              <button
                onClick={logout}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-indigo-500/20 hover:shadow-lg border border-indigo-600/50 flex items-center"
              >
                <FaSignOutAlt className="h-4 w-4 mr-2" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors flex items-center hover:text-indigo-300">
                <FaSignInAlt className="h-5 w-5 mr-1" />
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-indigo-500/20 hover:shadow-lg border border-indigo-600/50 flex items-center"
              >
                <FaUserPlus className="h-4 w-4 mr-2" />
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
