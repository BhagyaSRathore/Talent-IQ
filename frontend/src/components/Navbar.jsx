import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Code2, Home, BookOpen, Video, History, Plus, Menu, X } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/problems', icon: BookOpen, label: 'Problems' },
    { path: '/sessions', icon: Video, label: 'Sessions' },
    { path: '/history', icon: History, label: 'History' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group focus-ring rounded-lg px-2 -ml-2"
          >
            <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-lg group-hover:shadow-md transition-all duration-200">
              <Code2 className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TALENT-IQ
            </span>
          </Link>

          {/* Desktop Navigation */}
          {isSignedIn && (
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${isActive(item.path) ? 'nav-link-active' : ''}`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {isSignedIn && (
              <>
                {/* New Session Button - Desktop */}
                <button
                  onClick={() => navigate('/create-session')}
                  className="hidden md:flex btn btn-primary btn-sm"
                >
                  <Plus className="h-4 w-4" />
                  <span>New Session</span>
                </button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden icon-btn"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </button>
              </>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Button */}
            <div className="flex items-center">
              {isSignedIn ? (
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-9 w-9 ring-2 ring-border hover:ring-primary transition-all duration-200",
                    },
                  }}
                />
              ) : (
                <Link to="/sign-in" className="btn btn-primary btn-sm">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isSignedIn && mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-surface animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
            
            {/* Mobile New Session Button */}
            <button
              onClick={() => {
                navigate('/create-session');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 mt-4 btn btn-primary"
            >
              <Plus className="h-4 w-4" />
              <span>New Session</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

