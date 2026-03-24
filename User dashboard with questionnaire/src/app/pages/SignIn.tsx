import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { X } from 'lucide-react';

export function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    navigate('/questionnaire');
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-[60%] relative">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1571034788009-3024c09ba9af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cnVmZmxlJTIwY3VsdGl2YXRpb24lMjB0cmVlc3xlbnwxfHx8fDE3NzQyNDIzMTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
          }}
        />
      </div>

      {/* Right side - Sign in form */}
      <div className="w-full lg:w-[40%] bg-white flex items-center justify-center p-8 relative">
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Sign in to your account
          </h1>
          <p className="text-gray-600 mb-8">
            Welcome back! Please enter your details.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-sm text-gray-700 mb-1.5 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
                required
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm text-gray-700 mb-1.5 block">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                required
                className="w-full"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-2.5 rounded-lg transition-colors"
            >
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
