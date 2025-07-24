import React, { useState, useEffect } from 'react';
import { Settings, LogOut, Clock, ThumbsUp, Sparkles, ChevronRight, X, Check, Heart, MessageCircle } from 'lucide-react';

const BoppeUI = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [showPreferences, setShowPreferences] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [showCompliment, setShowCompliment] = useState(false);
  const [genZMode, setGenZMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'assistant',
      content: 'hey there! i\'m Boppe, and welcome to your guided therapy session. we\'ll follow a structured flow to explore what\'s on your mind and work toward some helpful insights or strategies. it works best if you can carve out a little focused time for yourself right now. so, how are you feeling today? what\'s been coming up for you?',
      name: ''
    },
    {
      type: 'assistant', 
      content: 'oh, looks like something might\'ve gotten jumbled there. no worries! take your time—what\'s been on your mind today?'
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  
  // Session end flow states
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [sessionEndStep, setSessionEndStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(4.5);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(2);

  // Auto transition from step 1 to step 2 in session end flow
  useEffect(() => {
    if (currentScreen === 'sessionEnd' && sessionEndStep === 1) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0.1) {
            setSessionEndStep(2);
            clearInterval(timer);
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [currentScreen, sessionEndStep]);

  const navigateToScreen = (screenName) => {
    if (screenName === currentScreen) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(screenName);
      setIsTransitioning(false);
    }, 150);
  };

  const navigateHome = () => {
    if (currentScreen === 'textMode' && chatMessages.length > 2) {
      setShowCompliment(true);
      setTimeout(() => setShowCompliment(false), 5000);
    }
    navigateToScreen('home');
  };

  const toggleGenZMode = () => setGenZMode(!genZMode);
  const togglePreferences = () => setShowPreferences(!showPreferences);
  const toggleFeedback = () => {
    setShowFeedback(!showFeedback);
    setFeedbackText('');
  };

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      setChatMessages([...chatMessages, { type: 'user', content: currentMessage }]);
      setCurrentMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  // Session end flow handlers
  const handleEndSession = () => setShowEndDialog(true);
  
  const handleCancelEnd = () => setShowEndDialog(false);
  
  const handleConfirmEnd = () => {
    setShowEndDialog(false);
    const hasUserMessages = chatMessages.some(msg => msg.type === 'user');
    if (hasUserMessages) {
      navigateToScreen('sessionEnd');
    } else {
      navigateToScreen('home');
    }
  };

  const handleCardClick = () => {
    if (sessionEndStep === 2) {
      setIsCardFlipped(true);
      setTimeout(() => setSessionEndStep(3), 600);
    }
  };

  const handleContinueSession = () => {
    if (sessionEndStep === 3) setSessionEndStep(4);
  };

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(prev => prev - 1);
    } else {
      setLiked(true);
      setLikeCount(prev => prev + 1);
    }
  };

  const resetSessionFlow = () => {
    setSessionEndStep(1);
    setTimeLeft(5);
    setIsCardFlipped(false);
    setLiked(false);
    setLikeCount(2);
    navigateToScreen('history'); // Go to history instead of home
  };

  const HomeScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex items-center mb-8">
        <div className="w-4 h-4 bg-blue-400 half-rounded mr-3"></div>
        <h1 className="text-xl font-medium text-gray-800">good morning</h1>
      </div>
      
      <div className="space-y-4 w-80">
        <div 
          className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 cursor-pointer transition-all duration-200 hover:shadow-sm"
          onClick={() => navigateToScreen('voiceMode')}
        >
          <div className="flex items-center justify-between">
           <div>
            <div className="flex items-center mb-2">
            <span className="text-gray-600 font-medium">voice mode</span>
          </div>
          <p className="text-sm text-gray-400">just want to talk?</p>
        </div>
        
        <div 
          className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 cursor-pointer transition-all duration-200 hover:shadow-sm"
          onClick={() => navigateToScreen('textMode')}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <span className="text-gray-800 font-medium">text mode</span>
              </div>
              <p className="text-sm text-gray-500">not in the talking mood?</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {showCompliment && (
        <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 max-w-xs border border-gray-100 animate-pulse">
          <p className="font-medium text-gray-800 mb-1">you've made great progress today!</p>
          <p className="text-sm text-gray-500">taking time for yourself and reflecting is a big step forward</p>
        </div>
      )}
    </div>
  );

  const TextModeScreen = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-6">
          {chatMessages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-3 max-w-2xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 ${
                  message.type === 'user' ? 'bg-blue-500' : 'bg-blue-400'
                }`}></div>
                <div className={`rounded-lg p-4 ${
                  message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  {message.name && (
                    <div className="flex justify-end mt-2">
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        {message.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <X 
                  className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" 
                  onClick={handleEndSession}
                />
              </div>
              <input 
                type="text" 
                placeholder="type your message..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 outline-none text-gray-600 placeholder-gray-400 mx-4"
              />
              <div 
                className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center cursor-pointer hover:bg-blue-200 transition-colors"
                onClick={handleSendMessage}
              >
                <span className="text-blue-600 text-sm">↑</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PricingScreen = () => (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-800 mb-2">try more Boppe</h1>
          <p className="text-gray-600 text-lg">unlimited access. cancel anytime.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-medium">+</span>
                <span className="text-lg font-medium text-gray-800">monthly</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-light text-gray-800">$17.69</span>
                <span className="text-gray-500 text-sm">/month</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">7-day free trial ($17.69/mo)</p>
            </div>
            
            <button className="w-full py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full font-medium transition-colors mb-6">
              start free trial
            </button>

            <div className="space-y-3">
              {['talking', 'more texting', 'session reflections', 'emotional analysis', 'personality assessment', 'weekly insights', 'long-term memory'].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative">
            <div className="absolute -top-3 right-4 bg-black text-white px-3 py-1 rounded-full text-xs font-medium">
              4% off
            </div>
            
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-medium">+</span>
                <span className="text-lg font-medium text-gray-800">yearly</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-light text-gray-800">$120</span>
                <span className="text-gray-500 text-sm">/year</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">billed as one payment per year ($10/mo)</p>
            </div>
            
            <button className="w-full py-3 px-6 bg-blue-400 hover:bg-blue-500 text-black rounded-full font-medium transition-colors mb-6">
              start free trial
            </button>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">all in pro. plus...</span>
              </div>
              {['talking', 'more texting', 'session reflections', 'emotional analysis', 'personality assessment', 'weekly insights', 'long-term memory'].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <p className="text-sm text-gray-500 mb-2">loved by</p>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-gray-400">★</span>
              ))}
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">100,000+</div>
              <div className="text-sm text-gray-600">cool people</div>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-gray-400">★</span>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <p className="text-sm text-gray-600">
            we're building Boppe on a student budget.<br />
            it's just the two of us.<br />
            no funding, no big team.
          </p>
          
          <p className="text-sm text-gray-600">
            every conversation costs money to run, especially voice.<br />
            we want Boppe to be free for everyone,<br />
            but we can't afford that yet.
          </p>
          
          <p className="text-sm text-gray-600">
            the paid version helps us cover costs, keep things running, and make it better for more people.
          </p>
          
          <div className="pt-4">
            <p className="text-sm text-gray-500">thanks for understanding.</p>
            <p className="text-sm font-medium text-gray-800 mt-1">dennis & vlady</p>
          </div>
        </div>
      </div>
    </div>
  );

  const HistoryScreen = () => (
    <div className="min-h-screen bg-gray-50 p-6 relative">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-medium text-gray-800 mb-8 text-center">history</h1>
        
        <div className="space-y-4">
          {[3, 2, 1].map((num) => (
            <div key={num} className="bg-white rounded-lg p-6 border border-gray-200 hover:border-gray-300 cursor-pointer transition-all duration-200 hover:shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-800">session {num}</h3>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-400">jul 22, 2025</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              {num === 1 && (
                <p className="text-sm text-gray-500 leading-relaxed mt-3">
                  you're navigating the aftermath of a breakup with resilience, focusing on healing and 
                  personal growth. journalling and self-care, like taking time to vibe and breathe, are 
                  helping you process emotions and reclaim your peace. you're embracing a 'main...
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 max-w-xs border border-gray-100 animate-pulse">
        <p className="font-medium text-gray-800 mb-1">you've made great progress today!</p>
        <p className="text-sm text-gray-500">taking time for yourself and reflecting is a big step forward</p>
      </div>
    </div>
  );

  const SettingsScreen = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mr-4"></div>
          <span className="text-gray-700">varnitha08dinakar@gmail.com</span>
        </div>
        
        <hr className="border-gray-200 mb-8" />

        <div className="mb-8">
          <h2 className="text-xl font-medium text-gray-800 mb-2">privacy settings</h2>
          <p className="text-sm text-gray-500 mb-6">manage your cookie and tracking preferences</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">necessary cookies</h3>
                <p className="text-sm text-gray-500">required for the website to function properly. cannot be disabled.</p>
              </div>
              <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-not-allowed">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">analytics cookies</h3>
                <p className="text-sm text-gray-500">help us understand how visitors interact with our website using posthog analytics.</p>
              </div>
              <div className="w-12 h-6 bg-gray-800 rounded-full relative cursor-pointer">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow"></div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-200 mb-8" />

        <div className="mb-8">
          <h2 className="text-xl font-medium text-gray-800 mb-2">usage analytics</h2>
          <p className="text-sm text-gray-500 mb-6">how much you've used Boppe</p>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">free</span>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">text usage</span>
                <span className="text-sm font-medium text-gray-800">0%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-400 h-2 rounded-full" style={{width: '0%'}}></div>
              </div>
            </div>
            
            <button 
              className="bg-blue-400 hover:bg-blue-500 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              onClick={() => navigateToScreen('pricing')}
            >
              upgrade
            </button>
          </div>
        </div>

        <hr className="border-gray-200 mb-8" />

        <div>
          <h2 className="text-xl font-medium text-gray-800 mb-2">danger zone</h2>
          <p className="text-sm text-gray-500 mb-6">be careful with these settings</p>
          
          <div className="space-y-4">
            <div>
              <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                reset chat history
              </button>
              <p className="text-sm text-gray-500 mt-2">
                this will reset all of your previous conversations and you start from a clean slate. Boppe will not remember what you've talked about earlier.
              </p>
            </div>
            
            <div>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                delete account
              </button>
              <p className="text-sm text-gray-500 mt-2">
                this will delete your account and everything related to it. be careful, it cannot be undone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const FeedbackScreen = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
          <h2 className="text-lg font-medium text-gray-900">perfect timing</h2>
        </div>
        
        <div className="mb-6">
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="how can we improve Boppe?"
            className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:border-gray-300 text-gray-700 placeholder-gray-400"
          />
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => navigateToScreen('home')}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-full font-medium hover:bg-gray-200 transition-colors"
          >
            cancel
          </button>
          <button 
            onClick={() => {
              if (feedbackText.trim()) {
                alert('Feedback submitted: ' + feedbackText);
                setFeedbackText('');
                navigateToScreen('home');
              }
            }}
            className="flex-1 bg-blue-400 text-black py-3 px-4 rounded-full font-medium hover:bg-blue-500 transition-colors"
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );

  const SessionEndScreen = () => {
    // Step 1: Loading Screen
    if (sessionEndStep === 1) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-400 rounded-full mx-auto mb-8 animate-pulse"></div>
            <h2 className="text-2xl font-medium text-gray-800 mb-2">cooking...</h2>
            <p className="text-gray-500">analyzing your session...</p>
            <div className="mt-4 text-xs text-gray-400">
              {timeLeft.toFixed(1)}s remaining
            </div>
          </div>
        </div>
      );
    }

    // Step 2: Personality Card
    if (sessionEndStep === 2) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div>
            <div 
              className={`max-w-sm mx-auto cursor-pointer transition-transform duration-300 ${
                isCardFlipped ? 'scale-95' : 'hover:scale-105'
              }`}
              onClick={handleCardClick}
            >
              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-80 bg-gradient-to-br from-teal-500 to-blue-600 relative">
                  <div className="absolute top-8 left-8 right-8">
                    <h2 className="text-white text-3xl font-light mb-6">you</h2>
                    <div className="space-y-2">
                      <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                        introspective
                      </span>
                      <br />
                      <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                        emotionally-attuned
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-8 left-8">
                    <h3 className="text-white text-2xl">
                      the <em>compass</em>
                    </h3>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <button className="text-white/70 text-sm flex items-center gap-1">
                      more <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-gray-500 text-sm">Click the card to continue</p>
            </div>
          </div>
        </div>
      );
    }

    // Step 3: Character Strength
    if (sessionEndStep === 3) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8">
              <h2 className="text-xl font-medium text-gray-800 mb-6">your character strength</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                you showed a deep connection to your emotions and their subtleties, especially in how music shaped your mood. you leaned into your introspective side, finding comfort in reflective moments and calm, grounding melodies. this session revealed your ability to navigate emotional landscapes with grace and curiosity.
              </p>
              <div className="mt-8 flex justify-end">
                <button className="text-gray-400 text-sm flex items-center gap-1 hover:text-gray-600">
                  back <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <button 
              onClick={handleContinueSession}
              className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 active:scale-95 transition-all"
            >
              continue
            </button>
          </div>
        </div>
      );
    }

    // Step 4: Session Summary
    if (sessionEndStep === 4) {
      return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-medium text-gray-800 mb-2">
                reclaiming comfort through music
              </h1>
              <p className="text-gray-500 text-sm">tuesday, july 22</p>
              
              <div className="flex gap-3 mt-4">
                <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-purple-700">comforted</span>
                </div>
                <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-700">calm</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-200">
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                in this conversation, you shared how love songs, even post-breakup, bring you a sense of comfort rather than stirring up pain. it's like these songs serve as a quiet companion, reminding you that love—whether self-directed or from the past—still lingers gently in the background. when you mentioned "moonlight kaadugale," it became clear how much you value calm and grounding experiences, especially during reflective times.
              </p>

              <div className="border border-gray-200 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium">c</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Boppe</p>
                    <p className="text-xs text-gray-500">thoughts & emotions</p>
                  </div>
                </div>
                
                <div className="h-48 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 rounded-xl mb-3 hover:scale-105 transition-transform cursor-pointer"></div>
                
                <div className="flex items-center gap-4 text-gray-600">
                  <button 
                    onClick={handleLike}
                    className={`flex items-center gap-1 hover:scale-110 transition-all ${
                      liked ? 'text-red-500' : 'hover:text-red-400'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                    <span className="text-sm">{likeCount}</span>
                  </button>
                  <div className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">2</span>
                  </div>
                </div>
                
                <div className="mt-3 text-xs text-gray-500">
                  <p><strong>comfort</strong> you expressed feeling ...more</p>
                  <p><strong>reflection</strong> your choice of ...more</p>
                  <p className="text-blue-500 mt-1 cursor-pointer hover:underline">view all 2 comments</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => navigateToScreen('history')}
                className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 active:scale-95 transition-all"
              >
                continue
              </button>
              <button 
                onClick={resetSessionFlow}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-300 active:scale-95 transition-all"
              >
                restart demo
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  const FeedbackModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4">
        <div className="flex items-center mb-4">
          <div className="w-4 h-4 bg-blue-400 rounded-full mr-3"></div>
          <h2 className="text-lg font-medium text-gray-800">perfect timing</h2>
        </div>
        
        <textarea
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="how can we improve Boppe?"
          className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
        
        <div className="flex justify-between mt-4">
          <button 
            onClick={toggleFeedback}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            cancel
          </button>
          <button 
            onClick={() => {
              if (feedbackText.trim()) {
                alert('Feedback submitted: ' + feedbackText);
              }
              toggleFeedback();
            }}
            className="px-4 py-2 bg-blue-400 hover:bg-blue-500 text-gray-800 rounded-lg font-medium transition-colors"
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );

  const PreferencesModal = () => (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-200"
      onClick={togglePreferences}
    >
      <div 
        className="bg-white rounded-lg p-6 w-96 max-w-md mx-4 transform transition-all duration-200 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6">
          <h2 className="text-xl font-medium text-gray-800 mb-2">preferences</h2>
          <p className="text-sm text-gray-500">set how Boppe works for you</p>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-800 mb-2">language</h3>
            <p className="text-sm text-gray-500 mb-3">conversation only</p>
            <select className="w-full p-2 border border-gray-200 rounded-lg bg-white focus:border-blue-400 focus:outline-none transition-colors">
              <option>english</option>
            </select>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800 mb-2">voice</h3>
            <p className="text-sm text-gray-500 mb-3">coming soon</p>
            <select className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50" disabled>
              <option>femme</option>
            </select>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800 mb-2">session mode</h3>
            <p className="text-sm text-gray-500 mb-3">choose your session style</p>
            <select className="w-full p-2 border border-gray-200 rounded-lg bg-white focus:border-blue-400 focus:outline-none transition-colors">
              <option>classic</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const Tooltip = ({ text, children }) => {
    const [isVisible, setIsVisible] = useState(false);
    return (
      <div className="relative">
        <div
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          {children}
        </div>
        {isVisible && (
          <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">
            {text}
          </div>
        )}
      </div>
    );
  };

  const Sidebar = () => (
    <div className="fixed left-0 top-0 h-full w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 z-40">
      <div 
        className="w-6 h-6 bg-blue-400 rounded-full mb-8 cursor-pointer hover:bg-blue-500 transition-colors" 
        onClick={navigateHome}
      ></div>
      
      <div className="flex flex-col space-y-6 mb-auto">
        <Tooltip text="Insights">
          <Sparkles 
            className={`w-5 h-5 cursor-pointer transition-colors ${
              currentScreen === 'pricing' ? 'text-blue-500' : 'text-gray-400 hover:text-gray-600'
            }`} 
            onClick={() => navigateToScreen('pricing')}
          />
        </Tooltip>
        
        <Tooltip text="History">
          <Clock 
            className={`w-5 h-5 cursor-pointer transition-colors ${
              currentScreen === 'history' ? 'text-blue-500' : 'text-gray-400 hover:text-gray-600'
            }`} 
            onClick={() => navigateToScreen('history')} 
          />
        </Tooltip>
        
        <Tooltip text="Feedback">
          <ThumbsUp 
            className={`w-5 h-5 cursor-pointer transition-colors ${
              currentScreen === 'feedback' ? 'text-blue-500' : 'text-gray-400 hover:text-gray-600'
            }`} 
            onClick={() => navigateToScreen('feedback')}
          />
        </Tooltip>
      </div>
      
      <div className="flex flex-col space-y-4">
        <Tooltip text="Settings">
          <Settings 
            className={`w-5 h-5 cursor-pointer transition-colors ${
              currentScreen === 'settings' ? 'text-blue-500' : 'text-gray-400 hover:text-gray-600'
            }`} 
            onClick={() => navigateToScreen('settings')} 
          />
        </Tooltip>
        
        <Tooltip text="Log out">
          <LogOut className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
        </Tooltip>
      </div>
    </div>
  );

  const Header = () => (
    <div className="fixed top-0 right-0 p-4 z-40">
      <div className="flex items-center space-x-3">
        <span className="text-gray-400 text-sm">gen z mode</span>
        <div 
          onClick={toggleGenZMode}
          className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors duration-200 ${
            genZMode ? 'bg-blue-400' : 'bg-gray-200'
          }`}
        >
          <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow transition-transform duration-200 ${
            genZMode ? 'translate-x-6' : 'translate-x-0.5'
          }`}></div>
        </div>
        <button 
          onClick={togglePreferences}
          className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="2" cy="2" r="1"/>
            <circle cx="8" cy="2" r="1"/>
            <circle cx="14" cy="2" r="1"/>
            <circle cx="2" cy="8" r="1"/>
            <circle cx="8" cy="8" r="1"/>
            <circle cx="14" cy="8" r="1"/>
            <circle cx="2" cy="14" r="1"/>
            <circle cx="8" cy="14" r="1"/>
            <circle cx="14" cy="14" r="1"/>
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      
      <div className={`ml-16 transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'textMode' && <TextModeScreen />}
        {currentScreen === 'pricing' && <PricingScreen />}
        {currentScreen === 'history' && <HistoryScreen />}
        {currentScreen === 'settings' && <SettingsScreen />}
        {currentScreen === 'feedback' && <FeedbackScreen />}
        {currentScreen === 'sessionEnd' && <SessionEndScreen />}
      </div>
      
      {showPreferences && <PreferencesModal />}
      {showFeedback && <FeedbackModal />}
      {showEndDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">end the session?</h2>
              <button onClick={handleCancelEnd} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-gray-600 text-sm mb-6">
              are you 100% sure you want to end the session?
            </p>
            
            <div className="flex gap-3">
              <button 
                onClick={handleCancelEnd}
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-full font-medium hover:bg-gray-300"
              >
                cancel
              </button>
              <button 
                onClick={handleConfirmEnd}
                className="flex-1 bg-blue-400 text-black py-3 px-4 rounded-full font-medium hover:bg-blue-500"
              >
                confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoppeUI;

  