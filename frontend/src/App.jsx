import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, SignIn, SignUp } from '@clerk/clerk-react';
import { SessionProvider } from './context/SessionContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Sessions from './pages/Sessions';
import CreateSession from './pages/CreateSession';
import SessionRoom from './pages/SessionRoom';
import History from './pages/History';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

function App() {
  if (!clerkPubKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="card p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">⚠️ Configuration Required</h2>
          <p className="text-slate-600 mb-4">
            Please add your Clerk Publishable Key to the <code className="bg-slate-100 px-2 py-1 rounded">.env</code> file:
          </p>
          <pre className="bg-slate-100 p-4 rounded-lg text-left text-sm overflow-x-auto">
            VITE_CLERK_PUBLISHABLE_KEY=your_key_here
          </pre>
          <p className="text-slate-500 text-sm mt-4">
            Get your key from <a href="https://clerk.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">clerk.com</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <SessionProvider>
        <Router>
          <div className="min-h-screen">
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/sign-in/*"
                element={
                  <div className="min-h-screen flex items-center justify-center py-12 px-4">
                    <SignIn routing="path" path="/sign-in" />
                  </div>
                }
              />
              <Route
                path="/sign-up/*"
                element={
                  <div className="min-h-screen flex items-center justify-center py-12 px-4">
                    <SignUp routing="path" path="/sign-up" />
                  </div>
                }
              />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sessions"
                element={
                  <ProtectedRoute>
                    <Sessions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-session"
                element={
                  <ProtectedRoute>
                    <CreateSession />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/session/:id"
                element={
                  <ProtectedRoute>
                    <SessionRoom />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <History />
                  </ProtectedRoute>
                }
              />

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </SessionProvider>
    </ClerkProvider>
  );
}

export default App;
