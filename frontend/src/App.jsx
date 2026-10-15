import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, SignIn, SignUp } from '@clerk/clerk-react';
import { SessionProvider } from './context/SessionContext';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Sessions from './pages/Sessions';
import CreateSession from './pages/CreateSession';
import SessionRoom from './pages/SessionRoom';
import History from './pages/History';
import Problems from './pages/Problems';

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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="card p-8 max-w-md text-center">
          <h2 className="heading-3 mb-4">⚠️ Configuration Required</h2>
          <p className="text-body mb-4">
            Please add your Clerk Publishable Key to the <code className="code-inline">.env</code> file:
          </p>
          <pre className="bg-code-bg p-4 rounded-lg text-left text-sm overflow-x-auto border border-border">
            VITE_CLERK_PUBLISHABLE_KEY=your_key_here
          </pre>
          <p className="text-small mt-4">
            Get your key from <a href="https://clerk.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">clerk.com</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ClerkProvider publishableKey={clerkPubKey}>
          <SessionProvider>
            <Router>
              <div className="min-h-screen bg-background">
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
                  <Route
                    path="/problems"
                    element={
                      <ProtectedRoute>
                        <Problems />
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
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
