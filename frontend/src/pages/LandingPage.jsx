import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Code2, Video, Users, Zap, CheckCircle, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-70"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              <Zap className="h-4 w-4" />
              <span>Collaborative Coding Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              Master Coding Interviews
              <br />
              Together
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Practice technical interviews with peers in real-time. Video calls, live coding, and instant feedback.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              {isSignedIn ? (
                <Link to="/dashboard" className="btn-primary text-lg px-8 py-4 flex items-center space-x-2">
                  <span>Go to Dashboard</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              ) : (
                <>
                  <Link to="/sign-up" className="btn-primary text-lg px-8 py-4">
                    Get Started Free
                  </Link>
                  <Link to="/sign-in" className="btn-secondary text-lg px-8 py-4">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-slate-600">
              Powerful features to help you ace your coding interviews
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Video className="h-8 w-8" />}
              title="HD Video Calls"
              description="Crystal clear video and audio for seamless communication during practice sessions"
              color="blue"
            />
            <FeatureCard
              icon={<Code2 className="h-8 w-8" />}
              title="Live Coding"
              description="Real-time collaborative coding environment with syntax highlighting"
              color="indigo"
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Peer Matching"
              description="Connect with peers at your skill level for productive practice sessions"
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Create or Join Session"
              description="Start a new coding session or join an existing one from the dashboard"
            />
            <StepCard
              number="2"
              title="Practice Together"
              description="Work on coding problems with video chat and real-time collaboration"
            />
            <StepCard
              number="3"
              title="Get Better"
              description="Review your sessions, track progress, and improve your skills"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center text-white space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Level Up Your Interview Skills?
          </h2>
          <p className="text-xl opacity-90">
            Join thousands of developers preparing for their dream jobs
          </p>
          {!isSignedIn && (
            <Link to="/sign-up" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200">
              Start Practicing Now
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Code2 className="h-6 w-6" />
            <span className="text-xl font-bold">TALENT-IQ</span>
          </div>
          <p className="text-slate-400">
            © 2026 TALENT-IQ. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, color }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    indigo: 'from-indigo-500 to-indigo-600',
    purple: 'from-purple-500 to-purple-600',
  };

  return (
    <div className="card p-8 text-center space-y-4 hover:scale-105 transition-transform duration-200">
      <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${colorClasses[color]} text-white`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
};

const StepCard = ({ number, title, description }) => {
  return (
    <div className="relative">
      <div className="card p-8 space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-2xl font-bold">
          {number}
        </div>
        <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default LandingPage;
