import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { TreeDeciduous, ClipboardList, ArrowRight } from 'lucide-react';

export interface QuestionnaireData {
  id: string;
  userId: string;
  userEmail: string;
  timestamp: string;
  name: string;
  age: string;
  occupation: string;
  satisfaction: string;
  experience: string;
  feedback: string;
  recommend: string;
}

export function Questionnaire() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    occupation: '',
    satisfaction: '',
    experience: '',
    feedback: '',
    recommend: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const response: QuestionnaireData = {
      id: Date.now().toString(),
      userId: user?.id || '',
      userEmail: user?.email || '',
      timestamp: new Date().toISOString(),
      ...formData,
    };

    const existingResponses = localStorage.getItem('questionnaireResponses');
    const responses: QuestionnaireData[] = existingResponses
      ? JSON.parse(existingResponses)
      : [];

    responses.push(response);
    localStorage.setItem('questionnaireResponses', JSON.stringify(responses));

    toast.success('Questionnaire submitted successfully!');
    navigate('/dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TreeDeciduous className="w-6 h-6 text-[#10B981]" />
              <span className="text-xl font-semibold">Truffle Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="text-sm"
              >
                Back to Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-sm"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="border border-gray-200">
          <CardHeader className="border-b border-gray-200 bg-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-[#10B981] rounded-lg p-2.5">
                <ClipboardList className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Industry Survey</CardTitle>
                <CardDescription className="mt-1">
                  Help us improve the truffle industry with your valuable feedback
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="bg-white p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b border-gray-200">
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="border-gray-300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      className="border-gray-300"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className="border-gray-300"
                    required
                  />
                </div>
              </div>

              {/* Survey Questions */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b border-gray-200">
                  Survey Questions
                </h3>

                <div className="space-y-4">
                  <Label className="text-base">How satisfied are you with our service?</Label>
                  <RadioGroup
                    value={formData.satisfaction}
                    onValueChange={(value) => handleRadioChange('satisfaction', value)}
                    required
                  >
                    <div className="flex items-center space-x-3 py-2">
                      <RadioGroupItem value="very-satisfied" id="very-satisfied" className="border-gray-300" />
                      <Label htmlFor="very-satisfied" className="font-normal cursor-pointer">
                        Very Satisfied
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 py-2">
                      <RadioGroupItem value="satisfied" id="satisfied" className="border-gray-300" />
                      <Label htmlFor="satisfied" className="font-normal cursor-pointer">
                        Satisfied
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 py-2">
                      <RadioGroupItem value="neutral" id="neutral" className="border-gray-300" />
                      <Label htmlFor="neutral" className="font-normal cursor-pointer">
                        Neutral
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 py-2">
                      <RadioGroupItem value="dissatisfied" id="dissatisfied" className="border-gray-300" />
                      <Label htmlFor="dissatisfied" className="font-normal cursor-pointer">
                        Dissatisfied
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 py-2">
                      <RadioGroupItem value="very-dissatisfied" id="very-dissatisfied" className="border-gray-300" />
                      <Label htmlFor="very-dissatisfied" className="font-normal cursor-pointer">
                        Very Dissatisfied
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label className="text-base">How would you rate your overall experience?</Label>
                  <RadioGroup
                    value={formData.experience}
                    onValueChange={(value) => handleRadioChange('experience', value)}
                    required
                  >
                    {['5 - Excellent', '4 - Good', '3 - Average', '2 - Poor', '1 - Very Poor'].map((option) => (
                      <div key={option} className="flex items-center space-x-3 py-2">
                        <RadioGroupItem value={option} id={option} className="border-gray-300" />
                        <Label htmlFor={option} className="font-normal cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label className="text-base">Would you recommend us to others?</Label>
                  <RadioGroup
                    value={formData.recommend}
                    onValueChange={(value) => handleRadioChange('recommend', value)}
                    required
                  >
                    <div className="flex items-center space-x-3 py-2">
                      <RadioGroupItem value="yes" id="yes" className="border-gray-300" />
                      <Label htmlFor="yes" className="font-normal cursor-pointer">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 py-2">
                      <RadioGroupItem value="maybe" id="maybe" className="border-gray-300" />
                      <Label htmlFor="maybe" className="font-normal cursor-pointer">
                        Maybe
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 py-2">
                      <RadioGroupItem value="no" id="no" className="border-gray-300" />
                      <Label htmlFor="no" className="font-normal cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback" className="text-base">Additional Feedback (Optional)</Label>
                  <Textarea
                    id="feedback"
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    placeholder="Share your thoughts, suggestions, or concerns..."
                    rows={4}
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <Button 
                  type="submit" 
                  className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-6 text-base"
                >
                  Submit Questionnaire
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}