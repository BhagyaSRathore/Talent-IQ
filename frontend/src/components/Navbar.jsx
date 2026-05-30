import { Link, useNavigate } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Code2, Home, Video, History, Plus } from 'lucide-react';

const Navbar = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg group-hover:shadow-lg transition-all duration-200">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TALENT-IQ
            </span>
          </Link>

          {/* Navigation Links */}
          {isSignedIn && (
            <div className="hidden md:flex items-center space-x-1">
              <NavLink to="/dashboard" icon={<Home className="h-4 w-4" />}>
                Dashboard
              </NavLink>
              <NavLink to="/sessions" icon={<Video className="h-4 w-4" />}>
                Sessions
              </NavLink>
              <NavLink to="/history" icon={<History className="h-4 w-4" />}>
                History
              </NavLink>
              <button
                onClick={() => navigate('/create-session')}
                className="ml-4 btn-primary flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>New Session</span>
              </button>
            </div>
          )}

          {/* User Button */}
          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <Link to="/sign-in" className="btn-primary">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, children }) => {
  return (
    <Link
      to={to}
      className="flex items-center space-x-2 px-4 py-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};

export default Navbar;
