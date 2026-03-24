import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { TreeDeciduous, ArrowRight, BarChart3, DollarSign, Sprout, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Smooth scroll to key features section
    const featuresSection = document.getElementById('key-features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExplorePublicData = () => {
    navigate('/dashboard');
  };

  const navigateToDashboard = (page: string) => {
    navigate(`/dashboard?page=${page}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TreeDeciduous className="w-8 h-8 text-[#10B981]" />
              <span className="text-xl font-semibold text-white">Truffle Dashboard</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#about" className="text-white hover:text-gray-200 transition-colors">
                About
              </a>
              <a href="#key-features" className="text-white hover:text-gray-200 transition-colors">
                Features
              </a>
              <button
                onClick={() => navigate('/signin')}
                className="text-white hover:text-gray-200 transition-colors font-medium"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative" style={{ height: '70vh' }}>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1571034788009-3024c09ba9af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cnVmZmxlJTIwY3VsdGl2YXRpb24lMjB0cmVlc3xlbnwxfHx8fDE3NzQyNDIzMTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
          }}
        />
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#065F46] text-white px-4 py-2 rounded-full mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <span className="text-sm font-medium tracking-wide">INDUSTRY BENCHMARKING</span>
            </div>

            {/* Title */}
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
              Australian<br />
              Truffle Industry<br />
              Benchmarking<br />
              Dashboard
            </h1>

            {/* Description */}
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Empowering growers and stakeholders with data-driven insights<br />
              for a sustainable and profitable truffle industry.
            </p>

            {/* Buttons */}
            <div className="flex gap-4">
              <Button 
                onClick={handleGetStarted}
                className="bg-[#10B981] hover:bg-[#059669] text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                onClick={handleExplorePublicData}
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Explore Public Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#10B981] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">250+</div>
              <div className="text-white/90">Active Growers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">15,000+</div>
              <div className="text-white/90">Data Points Collected</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-white/90">Grower Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Truffle Dashboard</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The Truffle Dashboard is a comprehensive benchmarking platform designed to support 
              the Australian truffle industry with data-driven insights and analytics.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" 
                alt="Truffle farming" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                We aim to empower truffle growers across Australia by providing transparent, 
                accessible benchmarking data that helps optimize production, improve profitability, 
                and foster industry-wide collaboration.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Anonymous data submission for privacy protection</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Real-time benchmarking against industry standards</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Comprehensive analytics and reporting tools</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="key-features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <div className="text-sm text-[#10B981] font-semibold tracking-wide uppercase mb-2">CAPABILITIES</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Industry Insights & Tools</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Access comprehensive data and benchmarking tools tailored specifically for<br />
              the truffle sector to drive better orchard management.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <button
              onClick={() => navigateToDashboard('yield')}
              className="bg-white border border-gray-200 p-8 rounded-xl hover:shadow-lg transition-all text-left group"
            >
              <div className="mb-6">
                <BarChart3 className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Yield Benchmarking</h3>
              <p className="text-gray-600 leading-relaxed">
                Compare your orchard's production volume and quality against regional and industry-wide averages.
              </p>
              <div className="mt-4 text-[#10B981] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                <span className="text-sm font-medium">Learn more</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>

            <button
              onClick={() => navigateToDashboard('cost')}
              className="bg-white border border-gray-200 p-8 rounded-xl hover:shadow-lg transition-all text-left group"
            >
              <div className="mb-6">
                <DollarSign className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cost Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Detailed tracking of input costs, labor, and maintenance to help optimize your production efficiency.
              </p>
              <div className="mt-4 text-[#10B981] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                <span className="text-sm font-medium">Learn more</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>

            <button
              onClick={() => navigateToDashboard('practice')}
              className="bg-white border border-gray-200 p-8 rounded-xl hover:shadow-lg transition-all text-left group"
            >
              <div className="mb-6">
                <Sprout className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Farm Practice</h3>
              <p className="text-gray-600 leading-relaxed">
                Explore best practices for truffle farming, including irrigation, pest management, and soil health data to optimize performance.
              </p>
              <div className="mt-4 text-[#10B981] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                <span className="text-sm font-medium">Learn more</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sign Up</h3>
              <p className="text-gray-600">
                Create your account and gain access to the dashboard and questionnaire tools.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Submit Data</h3>
              <p className="text-gray-600">
                Complete the questionnaire with your operation's data. All submissions are anonymous.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Analyze & Compare</h3>
              <p className="text-gray-600">
                View benchmarking reports and compare your performance against industry standards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-[#10B981]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Benchmark Your Operation?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of Australian truffle growers using data to improve their operations.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={handleGetStarted}
              className="bg-white text-[#10B981] hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              onClick={handleExplorePublicData}
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium transition-colors"
            >
              View Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TreeDeciduous className="w-6 h-6 text-[#10B981]" />
                <span className="font-semibold">Truffle Dashboard</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering the Australian truffle industry with data-driven insights.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#key-features" className="hover:text-white transition-colors">Features</a></li>
                <li><button onClick={handleExplorePublicData} className="hover:text-white transition-colors">Dashboard</button></li>
                <li><button onClick={() => navigate('/signin')} className="hover:text-white transition-colors">Sign In</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@truffledashboard.au</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+61 2 1234 5678</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Sydney, Australia</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Truffle Dashboard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}