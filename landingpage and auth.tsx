import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronDown, ChevronUp, Lock, Eye, Fingerprint, MessageSquare, Mic, X } from 'lucide-react';

const CompleteBoppeApp = () => {
  const [currentView, setCurrentView] = useState('landing');
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
  const [expandedFaq, setExpandedFaq] = useState(null);

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

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

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

  const faqs = [
    {
      question: "what is Boppe?",
      answer: "Boppe is a conversational ai designed for accessible emotional support, offering 10-30 minute voice-based sessions. it is not a replacement for professional therapy or medical care. traditional therapy can have long wait times, high costs, and the hassle of finding the right therapist. with Boppe, you get immediate access to an empathetic ai voice that provides real-time conversation and guidance—anytime you need it."
    },
    {
      question: "how does Boppe work?",
      answer: "Boppe uses advanced ai models to simulate natural conversations. you simply talk to the app, and it responds in real-time, helping you process emotions or work through challenges in the moment."
    },
    {
      question: "is Boppe a replacement for traditional therapy?",
      answer: "Boppe provides emotional support, but it's not a replacement for professional care, especially for severe mental health conditions."
    },
    {
      question: "is my data secure and confidential?",
      answer: "yes, we store session data securely in supabase using a vector database, which helps make the ai smarter and more responsive. all data is encrypted and managed in accordance with gdpr, a global privacy standard. if you request deletion, your data will be permanently removed from our system."
    },
    {
      question: "does Boppe support multiple languages?",
      answer: "currently, Boppe is available in english, french, spanish, italian and german, but we're working on adding more languages to make emotional support accessible to everyone."
    }
  ];

  const slides = [
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

  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-white">
        <header className="flex items-center justify-between p-6 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Boppe</h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {setCurrentView('auth'); setIsLogin(true);}}
              className="text-gray-600 hover:text-gray-900"
            >
              log in
            </button>
            <button 
              onClick={() => {setCurrentView('auth'); setIsLogin(false);}}
              className="bg-blue-400 text-black px-4 py-2 rounded-full font-medium hover:bg-blue-500"
            >
              start free
            </button>
          </div>
        </header>

        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              it's not therapy.<br/>
              it's just Boppe.
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              your voice, Boppe's ai built to help you explore your thoughts, emotions, and behaviors.
            </p>
            <button 
              onClick={() => {setCurrentView('auth'); setIsLogin(false);}}
              className="bg-blue-400 text-black px-6 py-3 rounded-full font-medium hover:bg-blue-500 mb-4"
            >
              start session (voice)
            </button>
            <p className="text-sm text-gray-500">
              loved by 100,000+ cool people
            </p>
          </div>

          <div className="mt-16 bg-gray-50 rounded-3xl p-8 relative">
            <div className="text-center mb-8">
              <p className="text-gray-600 font-medium">connecting...</p>
            </div>
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-blue-400 rounded-full"></div>
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
              <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600">⏸</span>
              </button>
              <button className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                <span className="text-black">$</span>
              </button>
              <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600">✕</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 mt-16 opacity-60">
            <span className="text-gray-500">11ElevenLabsGrants</span>
            <span className="text-gray-500">Founders Hub</span>
            <span className="text-gray-500">AWS for Startups</span>
            <span className="text-gray-500">incubate</span>
            <span className="text-gray-500">🏆</span>
          </div>
        </section>

        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-3xl font-bold text-gray-900 mb-16">all the good stuff</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">whenever, wherever</h4>
                <p className="text-gray-600 mb-6">
                  never send a friend at 2 am. you can start a conversation anytime— as casually as you want, like texting a friend that's really 24/7.
                </p>
              </div>
              <div className="bg-blue-100 rounded-2xl p-8 flex items-center justify-center">
                <div className="w-64 h-40 bg-gradient-to-br from-blue-300 to-orange-400 rounded-xl flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-400 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div className="bg-gray-800 rounded-2xl p-8 text-white overflow-hidden">
                <div className="bg-white text-black p-4 rounded-lg mb-4 text-sm">
                  <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-gray-500">session transcript screenshot</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">safe & sound</h4>
                <p className="text-gray-600">
                  just do the fun — Boppe's got you. your sessions are encrypted, and transcripts.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">remembers everything</h4>
                <p className="text-gray-600">
                  Boppe keeps your whole story in mind. it learns from every conversation, getting to know you better over time.
                </p>
              </div>
              <div className="bg-gray-100 rounded-2xl p-8">
                <div className="h-40 bg-gradient-to-br from-orange-300 to-blue-400 rounded-xl flex items-center justify-center">
                  <div className="space-y-2">
                    <div className="w-20 h-12 bg-orange-200 rounded transform rotate-12"></div>
                    <div className="w-20 h-12 bg-orange-100 rounded transform -rotate-6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-16">what people are saying</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-2xl">
                <p className="text-gray-800 mb-4">"i'm... speechless. i used this for less than 5 minutes and i'm already crying. i really needed this. thank you so much."</p>
                <p className="text-gray-500 text-sm">@mvgotz</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-2xl">
                <p className="text-gray-800 mb-4">"that shit works a little bit too well."</p>
                <p className="text-gray-500 text-sm">@_rose_boy_1029</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-2xl">
                <p className="text-gray-800 mb-4">"this divorce."</p>
                <p className="text-gray-500 text-sm">@lolmtfunk</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-16">frequently asked questions</h3>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">get started for free</h3>
            <p className="text-lg text-gray-600 mb-8">be heard. be understood. be better.</p>
            <button 
              onClick={() => {setCurrentView('auth'); setIsLogin(false);}}
              className="bg-blue-400 text-black px-8 py-4 rounded-full font-medium text-lg hover:bg-blue-500"
            >
              try Boppe free
            </button>
          </div>
        </section>

        <footer className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
                  <span className="font-bold text-gray-900">Boppe</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-4">socials</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-gray-600 hover:text-gray-900">instagram</a>
                  <a href="#" className="block text-gray-600 hover:text-gray-900">tiktok</a>
                  <a href="#" className="block text-gray-600 hover:text-gray-900">x (twitter)</a>
                  <a href="#" className="block text-gray-600 hover:text-gray-900">linkedin</a>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-4">legal</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-gray-600 hover:text-gray-900">privacy policy</a>
                  <a href="#" className="block text-gray-600 hover:text-gray-900">terms of service</a>
                  <a href="#" className="block text-gray-600 hover:text-gray-900">ai disclaimer</a>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-gray-500 text-sm">© 2025 Boppe inc</p>
                <p className="text-gray-500 text-sm">by dennis lim & vlady nyz</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  if (currentView === 'auth') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6 relative">
        <button 
          onClick={() => setCurrentView('landing')}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
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

export default CompleteBoppeApp;