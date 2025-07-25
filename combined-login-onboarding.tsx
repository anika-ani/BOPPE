import React, { useState, useEffect } from 'react';
import { ChevronLeft, Lock, Eye, Fingerprint, MessageSquare, Mic } from 'lucide-react';

const BoppeApp = () => {
  const [currentView, setCurrentView] = useState('auth'); // 'auth' or 'onboarding'
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    source: '',
    relationship: '',
    support: '',
    motivation: '',
    faith: '',
    talkType: ''
  });
  const [toggleAnimated, setToggleAnimated] = useState(false);

  useEffect(() => {
    if (currentSlide === 16) {
      const timer = setTimeout(() => {
        setToggleAnimated(true);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setToggleAnimated(false);
    }
  }, [currentSlide]);

  const handleAuthSubmit = () => {
    if (isLogin) {
      alert(`Login attempted with email: ${email}`);
    } else {
      alert(`Signup attempted with email: ${email}`);
      setCurrentView('onboarding');
    }
  };

  const handleGoogleAuth = () => {
    if (isLogin) {
      alert('Google login attempted');
    } else {
      alert('Google signup attempted');
      setCurrentView('onboarding');
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
  };

  const slides = [
    // Slide 0: Welcome
    {
      type: 'welcome',
      content: (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
          <div className="w-full max-w-md">
            <div className="flex items-center mb-8">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
              <div className="flex-1 h-1 bg-gray-200 mx-4 rounded">
                <div className="h-full bg-gray-800 rounded" style={{width: '5.88%'}}></div>
              </div>
            </div>
            
            <div className="text-center space-y-6">
              <div className="w-12 h-12 bg-blue-400 rounded-full mx-auto"></div>
              
              <div className="space-y-4 text-left">
                <p className="text-gray-800 font-medium">hi friend</p>
                <p className="text-gray-700">we created Boppe because life can be... a lot</p>
                <p className="text-gray-700">sometimes you just need someone to talk to</p>
                <div className="space-y-1">
                  <p className="text-gray-700">whether you're navigating a rough day,</p>
                  <p className="text-gray-700">figuring things out,</p>
                  <p className="text-gray-700">or just need a moment to breathe</p>
                </div>
                <p className="text-gray-800 font-medium">we're here for you</p>
                <div className="pt-4">
                  <p className="text-gray-700">love,</p>
                  <p className="text-gray-800 font-medium">dennis & vlady</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      canContinue: true
    },
    
    // Slide 1: Name
    {
      type: 'input',
      content: (
        <div className="flex flex-col min-h-screen bg-gray-50 px-6">
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center mb-8 pt-8">
              <button onClick={() => setCurrentSlide(currentSlide - 1)}>
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex-1 h-1 bg-gray-200 mx-4 rounded">
                <div className="h-full bg-gray-800 rounded" style={{width: '11.76%'}}></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">what's your name?</h2>
            
            <input
              type="text"
              placeholder="name..."
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-4 border-b border-gray-300 bg-transparent focus:border-gray-600 focus:outline-none text-lg"
            />
          </div>
        </div>
      ),
      canContinue: formData.name.trim() !== ''
    },
    
    // Slide 2: Gender
    {
      type: 'select',
      content: (
        <div className="flex flex-col min-h-screen bg-gray-50 px-6">
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center mb-8 pt-8">
              <button onClick={() => setCurrentSlide(currentSlide - 1)}>
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex-1 h-1 bg-gray-200 mx-4 rounded">
                <div className="h-full bg-gray-800 rounded" style={{width: '17.65%'}}></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">how do you identify?</h2>
            
            <div className="space-y-3">
              {['female', 'male', 'non-binary', 'other'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData({...formData, gender: option})}
                  className={`w-full p-4 text-left rounded-lg transition-colors ${
                    formData.gender === option 
                      ? 'bg-blue-100 border-2 border-blue-500' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
      canContinue: formData.gender !== ''
    },
    
    // Slide 3: Age
    {
      type: 'select',
      content: (
        <div className="flex flex-col min-h-screen bg-gray-50 px-6">
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center mb-8 pt-8">
              <button onClick={() => setCurrentSlide(currentSlide - 1)}>
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex-1 h-1 bg-gray-200 mx-4 rounded">
                <div className="h-full bg-gray-800 rounded" style={{width: '23.53%'}}></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">how many years young are you?</h2>
            
            <div className="space-y-3">
              {['under 18', '18-24', '25-34', '35+', 'prefer not to say'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData({...formData, age: option})}
                  className={`w-full p-4 text-left rounded-lg transition-colors ${
                    formData.age === option 
                      ? 'bg-blue-100 border-2 border-blue-500' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
      canContinue: formData.age !== ''
    },
    
    // Slide 4: How did you hear about Boppe
    {
      type: 'select',
      content: (
        <div className="flex flex-col min-h-screen bg-gray-50 px-6">
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center mb-8 pt-8">
              <button onClick={() => setCurrentSlide(currentSlide - 1)}>
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex-1 h-1 bg-gray-200 mx-4 rounded">
                <div className="h-full bg-gray-800 rounded" style={{width: '29.41%'}}></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">how did you hear about Boppe?</h2>
            
            <div className="space-y-3">
              {[
                {label: 'instagram', icon: '📷', color: 'bg-pink-50'},
                {label: 'tiktok', icon: '🎵', color: 'bg-gray-50'},
                {label: 'youtube', icon: '📺', color: 'bg-red-50'},
                {label: 'google', icon: 'G', color: 'bg-blue-50'},
                {label: 'facebook', icon: 'f', color: 'bg-blue-50'},
                {label: 'friend/family', icon: '👥', color: 'bg-gray-50'}
              ].map((option) => (
                <button
                  key={option.label}
                  onClick={() => setFormData({...formData, source: option.label})}
                  className={`w-full p-4 text-left rounded-lg transition-colors flex items-center space-x-3 ${
                    formData.source === option.label 
                      ? 'bg-blue-100 border-2 border-blue-500' 
                      : `${option.color} hover:bg-gray-200`
                  }`}
                >
                  <span className="text-lg">{option.icon}</span>
                  <span>{option.label}</span>
                </button>
              ))}
              
              <button
                onClick={() => setFormData({...formData, source: 'other'})}
                className={`w-full p-4 text-left rounded-lg transition-colors flex items-center space-x-3 ${
                  formData.source === 'other' 
                    ? 'bg-blue-100 border-2 border-blue-500' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                <span>••• other</span>
              </button>
            </div>
          </div>
        </div>
      ),
      canContinue: formData.source !== ''
    },
    
    // Slide 5: Relationship status
    {
      type: 'select',
      content: (
        <div className="flex flex-col min-h-screen bg-gray-50 px-6">
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center mb-8 pt-8">
              <button onClick={() => setCurrentSlide(currentSlide - 1)}>
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex-1 h-1 bg-gray-200 mx-4 rounded">
                <div className="h-full bg-gray-800 rounded" style={{width: '35.29%'}}></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">relationship status?</h2>
            
            <div className="space-y-3">
              {[
                'situationship',
                'single', 
                'in a relationship',
                'it\'s complicated',
                'married',
                'divorced/separated',
                'widowed',
                'prefer not to say'
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData({...formData, relationship: option})}
                  className={`w-full p-4 text-left rounded-lg transition-colors ${
                    formData.relationship === option 
                      ? 'bg-blue-100 border-2 border-blue-500' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
      canContinue: formData.relationship !== ''
    },

    // Slide 6: How is that different from ChatGPT
    {
      type: 'info',
      content: (
        <div className="flex flex-col min-h-screen bg-gray-50 px-6">
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center mb-8 pt-8">
              <button onClick={() => setCurrentSlide(currentSlide - 1)}>
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex-1 h-1 bg-gray-200 mx-4 rounded">
                <div className="h-full bg-gray-800 rounded" style={{width: '41.18%'}}></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-16">how is that different from chatgpt?</h2>
            
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-6 bg-purple-400 rounded transform rotate-1 absolute top-0"></div>
                <div className="w-32 h-6 bg-blue-500 rounded transform -rotate-2 absolute top-3"></div>
                <div className="w-32 h-6 bg-green-400 rounded transform rotate-3 absolute top-6"></div>
                <div className="w-32 h-6 bg-blue-400 rounded transform -rotate-1 absolute top-9"></div>
                <div className="w-32 h-6 bg-orange-400 rounded transform rotate-2 absolute top-12"></div>
                <div className="w-32 h-6 bg-red-400 rounded transform -rotate-3 absolute top-15"></div>
                <div className="w-32 h-16 bg-transparent relative top-16"></div>
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-gray-800 font-medium">Boppe's built for mental health.</p>
              <p className="text-gray-700">trained on research-backed data</p>
            </div>
          </div>
        </div>
      ),
      canContinue: true
    },
    
    // Slide 7: What are you looking for support with
    {
      type: 'select',
      content: (
        <div className="flex flex-col min-h-screen bg-gray-50 px-6">
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center mb-8 pt-8">
              <button onClick={() => setCurrentSlide(currentSlide - 1)}>
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex-1 h-1 bg-gray-200 mx-4 rounded">
                <div className="h-full bg-gray-800 rounded" style={{width: '47.06%'}}></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">what are you most looking for support with?</h2>
            
            <div className="space-y-3">
              {['anxiety', 'depression', 'relationships', 'loneliness', 'something else'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData({...formData, support: option})}
                  className={`w-full p-4 text-left rounded-lg transition-colors ${
                    formData.support === option 
                      ? 'bg-blue-100 border-2 border-blue-500' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
      canContinue: formData.support !== ''
    },
    
    // Slide 8: Proven to help
    {
      type: 'info',
      content: (
        <div className="flex flex-col min-h-screen bg-gray-50 px-6">
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center mb-8 pt-8">
              <button onClick={() => setCurrentSlide(currentSlide - 1)}>
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex-1 h-1 bg-gray-200 mx-4 rounded">
                <div className="h-full bg-gray-800 rounded" style={{width: '52.94%'}}></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-16">proven to help</h2>
            
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="relative">
                  <div className="w-24 h-12 bg-blue-300 rounded-full absolute top-12 left-4 transform rotate-12"></div>
                  <div className="w-20 h-10 bg-blue-400 rounded-full absolute top-8 left-6 transform rotate-12"></div>
                  
                  <div className="relative">
                    <div className="absolute top-0 left-8">
                      <div className="w-12 h-16 bg-blue-400 transform rotate-12"></div>
                      <div className="w-12 h-4 bg-blue-500 transform rotate-12 -mt-1"></div>
                      <div className="text-xs font-bold text-white absolute top-2 left-2">51%</div>
                    </div>
                    
                    <div className="absolute top-4 left-16">
                      <div className="w-12 h-12 bg-blue-300 transform rotate-12"></div>
                      <div className="w-12 h-4 bg-blue-400 transform rotate-12 -mt-1"></div>
                      <div className="text-xs font-bold text-white absolute top-2 left-2">31%</div>
                    </div>
                  </div>
                </div>
                <div className="h-20 w-32"></div>
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-gray-700">in a recent study, ai therapy lead</p>
              <p className="text-gray-700">to a <span className="font-medium text-gray-900">51% drop in depression</span> and</p>
              <p className="text-gray-700">a <span className="font-medium text-gray-900">31% drop in anxiety</span></p>
            </div>
          </div>
        </div>
      ),
      canContinue: true
    },
    
    // Slide 9: What brings you to Boppe
    {
      type: 'select',
      content: (
        <div className="flex flex-col min-h-screen bg-gray-50 px-6">
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center mb-8 pt-8">
              <button onClick={() => setCurrentSlide(currentSlide - 1)}>
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex-1 h-1 bg-gray-200 mx-4 rounded">
                <div className="h-full bg-gray-800 rounded" style={{width: '58.82%'}}></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">what brings you to Boppe?</h2>
            
            <div className="space-y-3">
              {[
                'unlock insights about myself',
                'process my emotions',
                'set and achieve my goals',
                'just need to vent',
                'i don\'t know yet'
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData({...formData, motivation: option})}
                  className={`w-full p-4 text-left rounded-lg transition-colors ${
                    formData.motivation === option 
                      ? 'bg-blue-100 border-2 border-blue-500' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
      canContinue: formData.motivation !== ''
    },

    // Slide 10: Boppe remembers everything
    {
      type: 'info',
      content: (
        <div className="flex flex-col min-h-screen bg-gray-50 px-6">
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center mb-8 pt-8">
              <button onClick={() => setCurrentSlide(currentSlide - 1)}>
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex-1 h-1 bg-gray-200 mx-4 rounded">
                <div className="h-full bg-gray-800 rounded" style={{width: '64.71%'}}></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-16">Boppe remembers everything</h2>
            
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-16 h-20 bg-orange-400 rounded transform rotate-6 absolute top-8 left-8"></div>
                <div className="w-12 h-16 bg-orange-200 rounded transform -rotate-3 absolute top-4 left-12">
                  <div className="w-8 h-0.5 bg-orange-800 mt-3 mx-2"></div>
                  <div className="w-6 h-0.5 bg-orange-800 mt-1 mx-2"></div>
                  <div className="w-8 h-0.5 bg-orange-800 mt-1 mx-2"></div>
                </div>
                <div className="w-12 h-16 bg-orange-100 rounded transform rotate-2 absolute top-0 left-4">
                  <div className="w-8 h-0.5 bg-orange-800 mt-3 mx-2"></div>
                  <div className="w-6 h-0.5 bg-orange-800 mt-1 mx-2"></div>
                  <div className="w-8 h-0.5 bg-orange-800 mt-1 mx-2"></div>
                </div>
                <div className="h-24 w-24"></div>
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-gray-700">Boppe learns who you are, connects the dots,</p>
              <p className="text-gray-700">helping you spot patterns over time</p>
            </div>
          </div>
        </div>
      ),
      canContinue: true
    },
    
    // Slide 11: Faith/Spiritual practice
    {
      type: 'select',
      content: (
        <div className="flex flex-col min-h-screen bg-gray-50 px-6">
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center mb-8 pt-8">
              <button onClick={() => setCurrentSlide(currentSlide - 1)}>
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex-1 h-1 bg-gray-200 mx-4 rounded">
                <div className="h-full bg-gray-800 rounded" style={{width: '70.59%'}}></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">what is your faith or spiritual practice?</h2>
            
            <div className="space-y-3">
              {['buddhism', 'christianity', 'islam', 'judaism', 'spiritual, but not religious', 'other'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData({...formData, faith: option})}
                  className={`w-full p-4 text-left rounded-lg transition-colors ${
                    formData.faith === option 
                      ? 'bg-blue-100 border-2 border-blue-500' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
      canContinue: formData.faith !== ''
    },
    
    // Slide 12: Never need a friend at 2am again
    {
      type: 'info',
      content: (
        <div className="flex flex-col min-h-screen bg-gray-50 px-6">
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center mb-8 pt-8">
              <button onClick={() => setCurrentSlide(currentSlide - 1)}>
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex-1 h-1 bg-gray-200 mx-4 rounded">
                <div className="h-full bg-gray-800 rounded" style={{width: '76.47%'}}></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-16">never need a friend at 2am again</h2>
            
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-16 h-28 bg-blue-500 rounded-lg">
                  <div className="w-12 h-20 bg-white rounded m-2 mt-4"></div>
                  <div className="w-8 h-1 bg-gray-300 rounded mx-auto mt-1"></div>
                </div>
                <div className="text-blue-400 absolute -top-2 -left-2 text-sm">✨</div>
                <div className="text-blue-400 absolute -top-1 left-12 text-xs">⭐</div>
                <div className="text-blue-400 absolute top-4 -right-3 text-sm">✨</div>
                <div className="text-blue-400 absolute top-12 -left-4 text-xs">⭐</div>
                <div className="text-blue-400 absolute bottom-4 -right-2 text-sm">✨</div>
                <div className="text-blue-400 absolute bottom-0 left-8 text-xs">⭐</div>
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-gray-700">just open the app and start yapping.</p>
              <p className="text-gray-700">whenever you need to</p>
            </div>
          </div>
        </div>
      ),
      canContinue: true
    },
    
    // Slide 13: Our commitment to you
    {
      type: 'info',
      content: (
        <div className="flex flex-col min-h-screen bg-gray-50 px-6">
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center mb-8 pt-8">
              <button onClick={() => setCurrentSlide(currentSlide - 1)}>
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex-1 h-1 bg-gray-200 mx-4 rounded">
                <div className="h-full bg-gray-800 rounded" style={{width: '82.35%'}}></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">our commitment to you</h2>
            <p className="text-gray-600 mb-12">your mental health is personal and private</p>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <Lock className="w-6 h-6 text-gray-700 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">locked tight</h3>
                  <p className="text-gray-600 text-sm">everything you say is encrypted. standard stuff.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Eye className="w-6 h-6 text-gray-700 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">no peeking</h3>
                  <p className="text-gray-600 text-sm">your convos aren't used to train or improve Boppe.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Fingerprint className="w-6 h-6 text-gray-700 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">pinky promise</h3>
                  <p className="text-gray-600 text-sm">we mean it. your trust our metrics. and a pinky promise? that's sacred.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      canContinue: true
    },
    
    // Slide 14: What people are saying
    {
      type: 'info',
      content: (
        <div className="flex flex-col min-h-screen bg-gray-50 px-6">
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center mb-8 pt-8">
              <button onClick={() => setCurrentSlide(currentSlide - 1)}>
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex-1 h-1 bg-gray-200 mx-4 rounded">
                <div className="h-full bg-gray-800 rounded" style={{width: '88.24%'}}></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">what people are saying</h2>
            
            <div className="text-center mb-6">
              <div className="flex justify-center space-x-2 mb-4">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="text-blue-400 text-2xl">⭐</span>
                ))}
              </div>
              
              <p className="font-medium text-gray-900 mb-2">you're not alone.</p>
              <p className="text-gray-700 mb-4">i made this after a breakup lol.</p>
              
              <div className="flex justify-center items-center space-x-2 mb-8">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-red-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-blue-400 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <span className="text-gray-600 text-sm">100,000+ cool people</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-800 mb-2">"that shit works a little bit too well."</p>
                <p className="text-gray-500 text-sm">@_rose_boy_1029</p>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-800 mb-2">"to be honest, i gave it a try and it's really good i feel better now."</p>
                <p className="text-gray-500 text-sm">@manzanitawoo</p>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-800 mb-2">"i'm... speechless. i used this for less than 5 minutes and i'm already crying. i really needed this. thank you so much."</p>
                <p className="text-gray-500 text-sm">@mvggotz</p>
              </div>
            </div>
          </div>
        </div>
      ),
      canContinue: true
    },
    
    // Slide 15: You're all set
    {
      type: 'info',
      content: (
        <div className="flex flex-col min-h-screen bg-gray-50 px-6">
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center mb-8 pt-8">
              <button onClick={() => setCurrentSlide(currentSlide - 1)}>
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex-1 h-1 bg-gray-200 mx-4 rounded">
                <div className="h-full bg-gray-800 rounded" style={{width: '94.12%'}}></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">you're all set!</h2>
            <p className="text-gray-600 mb-12">let's try your first convo.</p>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 mt-1">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                    <path d="M8 12L12 16L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">explore your emotions</h3>
                  <p className="text-gray-600 text-sm">talk through relationships, stress, anxiety, or whatever's been weighing on you.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 mt-1">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9 9H15V15H9V9Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">backed by science</h3>
                  <p className="text-gray-600 text-sm">built with clinical research to keep things safe, private, and grounded.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 mt-1">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">24/7</h3>
                  <p className="text-gray-600 text-sm">open up to Boppe anytime, anywhere.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      canContinue: true
    },
    
    // Slide 16: Talk or type
    {
      type: 'select',
      content: (
        <div className="flex flex-col min-h-screen bg-gray-50 px-6">
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center mb-8 pt-8">
              <button onClick={() => setCurrentSlide(currentSlide - 1)}>
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex-1 h-1 bg-gray-200 mx-4 rounded">
                <div className="h-full bg-gray-800 rounded" style={{width: '100%'}}></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-12">talk or type?</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setFormData({...formData, talkType: 'type'})}
                className={`p-6 rounded-lg border-2 transition-colors ${
                  formData.talkType === 'type' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="w-8 h-8 mx-auto mb-4 text-gray-700" />
                <p className="text-sm text-gray-600 mb-1">not in the</p>
                <p className="text-sm text-gray-600">talking mood?</p>
              </button>
              
              <button
                onClick={() => setFormData({...formData, talkType: 'talk'})}
                className={`p-6 rounded-lg border-2 transition-colors ${
                  formData.talkType === 'talk' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <Mic className="w-8 h-8 mx-auto mb-4 text-gray-700" />
                <p className="text-sm text-gray-600 mb-1">just speak,</p>
                <p className="text-sm text-gray-600">i'm all ears</p>
              </button>
            </div>
          </div>
        </div>
      ),
      canContinue: formData.talkType !== ''
    },
    
    // Slide 17: Gen Z mode unlocked
    {
      type: 'info',
      content: (
        <div className="flex flex-col min-h-screen bg-gray-50 px-6">
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center mb-8 pt-8">
              <button onClick={() => setCurrentSlide(currentSlide - 1)}>
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex-1 h-1 bg-gray-200 mx-4 rounded">
                <div className="h-full bg-gray-800 rounded" style={{width: '100%'}}></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-16">gen z mode unlocked</h2>
            
            <div className="flex flex-col items-center justify-center flex-1">
              <div className="mb-8">
                <div className={`w-16 h-8 rounded-full relative transition-all duration-700 ease-in-out ${toggleAnimated ? 'bg-blue-400' : 'bg-gray-300'}`}>
                  <div className={`w-6 h-6 bg-white rounded-full absolute top-1 shadow-lg transition-all duration-700 ease-in-out ${toggleAnimated ? 'right-1 transform' : 'left-1'}`}></div>
                </div>
              </div>
              
              <p className={`text-lg transition-all duration-500 ${toggleAnimated ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>why not?</p>
              
              {toggleAnimated && (
                <div className="mt-4 animate-pulse">
                  <p className="text-sm text-gray-600">✨ unlocked!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
      canContinue: true
    }
  ];

  const currentSlideData = slides[currentSlide];

  const handleContinue = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      console.log('Final onboarding completed:', formData);
      alert('Welcome to Boppe! Ready to start your first conversation.');
    }
  };

  if (currentView === 'auth') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-left mb-16">
            <h1 className="text-2xl font-bold text-gray-900 mb-12">Boppe</h1>
            
            <div className="text-center mb-12">
              <h2 className="text-2xl font-medium text-gray-900 mb-2">ready when you are</h2>
              <p className="text-gray-600">your safe space, one convo at a time</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">email</label>
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 text-gray-900 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">password</label>
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 text-gray-900 placeholder-gray-400"
              />
            </div>

            <button
              onClick={handleAuthSubmit}
              className="w-full bg-white border border-gray-300 text-gray-900 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              {isLogin ? 'log in' : 'sign up'}
            </button>

            <div className="text-center space-y-2">
              {isLogin ? (
                <>
                  <a href="#" className="text-blue-600 text-sm hover:underline">forgot your password?</a>
                  <p className="text-gray-600 text-sm">
                    don't have an account?{' '}
                    <button onClick={toggleMode} className="text-blue-600 hover:underline">
                      sign up
                    </button>
                  </p>
                </>
              ) : (
                <p className="text-gray-600 text-sm">
                  already have an account?{' '}
                  <button onClick={toggleMode} className="text-blue-600 hover:underline">
                    log in
                  </button>
                </p>
              )}
            </div>

            <div className="text-center text-gray-500 text-sm">or</div>

            <button
              onClick={handleGoogleAuth}
              className="w-full bg-white border border-gray-300 text-gray-900 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>

            <div className="text-center text-xs text-gray-500 mt-6">
              by signing up, you agree to our <a href="#" className="text-blue-600 hover:underline">terms of service</a>,{' '}
              <a href="#" className="text-blue-600 hover:underline">privacy policy</a> and acknowledge our <a href="#" className="text-blue-600 hover:underline">ai disclaimer</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {currentSlideData.content}
      
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gray-50">
        <div className="w-full max-w-md mx-auto">
          <button
            onClick={handleContinue}
            disabled={!currentSlideData.canContinue}
            className={`w-full py-4 rounded-lg font-medium text-white transition-all ${
              currentSlideData.canContinue
                ? 'bg-black hover:bg-gray-800 active:scale-95'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoppeApp;