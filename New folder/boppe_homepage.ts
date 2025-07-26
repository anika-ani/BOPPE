import React, { useState, useEffect } from 'react';
import { Settings, LogOut, Clock, ThumbsUp, ChevronRight, X, Heart, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
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
      name: ' '
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  
  // Session end flow states
  const [showEndDialog, setShowEndDialog] = useState(false);
  const navigate = useNavigate();

  const navigateToScreen = (screenName: string) => {
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
      setChatMessages([...chatMessages, { type: 'user', content: currentMessage, name: '' }]);
      setCurrentMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  // Session end flow handlers
  const handleEndSession = () => setShowEndDialog(true);
  
  const handleCancelEnd = () => setShowEndDialog(false);
  
  const handleConfirmEnd = () => {
    setShowEndDialog(false);
    const hasUserMessages = chatMessages.some(msg => msg.type === 'user');
    if (hasUserMessages) {
      navigate('/session-end');
    } else {
      navigateToScreen('home');
    }
  };

  const HomeScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex items-center mb-8">
        <div className="w-4 h-4 bg-yellow-400 rounded-full mr-3"></div>
        <h1 className="text-xl font-medium text-gray-800">good morning</h1>
      </div>
      
      <div className="space-y-4 w-80">
        <div className="bg-white rounded-lg p-4 border border-gray-200 cursor-not-allowed opacity-60">
          <div className="flex items-center mb-2">
            <span className="text-gray-600 font-medium">voice mode</span>
          </div>
          <p className="text-sm text-gray-400">upgrade to pro for voice mode</p>
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
                  message.type === 'user' ? 'bg-blue-500' : 'bg-yellow-400'
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
                className="w-6 h-6 bg-yellow-100 rounded flex items-center justify-center cursor-pointer hover:bg-yellow-200 transition-colors"
                onClick={handleSendMessage}
              >
                <span className="text-yellow-600 text-sm">↑</span>
              </div>
            </div>
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
                  personal growth. journaling and self-care, like taking time to vibe and breathe, are 
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
      </div>
    </div>
  );

  const FeedbackScreen = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
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
            className="flex-1 bg-yellow-400 text-black py-3 px-4 rounded-full font-medium hover:bg-yellow-500 transition-colors"
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );

  const Tooltip = ({ text, children }: { text: string; children: React.ReactNode }) => {
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
        className="w-6 h-6 bg-yellow-400 rounded-full mb-8 cursor-pointer hover:bg-yellow-500 transition-colors" 
        onClick={navigateHome}
      ></div>
      
      <div className="flex flex-col space-y-6 mb-auto">              
        <Tooltip text="History">
          <Clock 
            className={`w-5 h-5 cursor-pointer transition-colors ${
              currentScreen === 'history' ? 'text-yellow-500' : 'text-gray-400 hover:text-gray-600'
            }`} 
            onClick={() => navigateToScreen('history')} 
          />
        </Tooltip>
        
        <Tooltip text="Feedback">
          <ThumbsUp 
            className={`w-5 h-5 cursor-pointer transition-colors ${
              currentScreen === 'feedback' ? 'text-yellow-500' : 'text-gray-400 hover:text-gray-600'
            }`} 
            onClick={() => navigateToScreen('feedback')}
          />
        </Tooltip>
      </div>
      
      <div className="flex flex-col space-y-4">
        <Tooltip text="Settings">
          <Settings 
            className={`w-5 h-5 cursor-pointer transition-colors ${
              currentScreen === 'settings' ? 'text-yellow-500' : 'text-gray-400 hover:text-gray-600'
            }`} 
            onClick={() => navigateToScreen('settings')} 
          />
        </Tooltip>
        
        <Tooltip text="Log out">
          <LogOut 
            className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" 
            onClick={() => navigate('/')}
          />
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
            genZMode ? 'bg-yellow-400' : 'bg-gray-200'
          }`}
        >
          <div className={`w-