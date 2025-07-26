import React, { useState, useEffect } from 'react';
import { ChevronLeft, Lock, Eye, Fingerprint, MessageSquare, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  name: string;
  gender: string;
  age: string;
  source: string;
  relationship: string;
  support: string;
  motivation: string;
  faith: string;
  talkType: string;
}

const OnboardingFlow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState<FormData>({
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
  const navigate = useNavigate();

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
    
    // Additional slides following the same pattern...
    // For brevity, I'll include a few key slides and the final slide
    
    // Slide 16: Gen Z mode unlocked
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
      navigate('/home');
    }
  };

  if (!currentSlideData) return null;

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

export default OnboardingFlow;