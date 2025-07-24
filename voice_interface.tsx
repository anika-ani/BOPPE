import React, { useState, useEffect } from 'react';

const VoiceInterface = () => {
  const [currentState, setCurrentState] = useState('initial');

  useEffect(() => {
    if (currentState === 'initial') {
      const timer = setTimeout(() => {
        setCurrentState('connecting');
      }, 3000);
      return () => clearTimeout(timer);
    } else if (currentState === 'connecting') {
      const timer = setTimeout(() => {
        setCurrentState('yourTurn');
      }, 3000);
      return () => clearTimeout(timer);
    } else if (currentState === 'responding') {
      const timer = setTimeout(() => {
        setCurrentState('yourTurn');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentState]);

  const handleMicrophoneClick = () => {
    if (currentState === 'yourTurn') {
      setCurrentState('listening');
    }
  };

  const handleStopListening = () => {
    if (currentState === 'listening') {
      setCurrentState('responding');
    }
  };

  // Initial state (New first slide from image)
  if (currentState === 'initial') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <div className="text-center mb-12">
          <h1 className="text-lg font-medium text-gray-800 mb-8">connecting...</h1>
          
          {/* Pulsating blue circle */}
          <div className="w-32 h-32 bg-blue-400 rounded-full mx-auto mb-12 animate-pulse"></div>
          
          <div className="max-w-md">
            <p className="text-gray-700 text-base leading-relaxed">
              okay, so it sounds like you're feeling pretty shook right now.
              <br />
              what's been going i
            </p>
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex items-center space-x-6">
          <button className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.788L4.047 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.047l4.336-3.788a1 1 0 011.617.788zM16 8a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          </button>
          
          <button className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Connecting state (Image 1)
  if (currentState === 'connecting') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <div className="text-center mb-12">
          <h1 className="text-lg font-medium text-gray-800 mb-8">connecting...</h1>
          
          {/* Pulsating blue circle */}
          <div className="w-32 h-32 bg-blue-400 rounded-full mx-auto mb-12 animate-pulse"></div>
          
          <div className="max-w-md">
            <p className="text-gray-700 text-base leading-relaxed">
              okay, so it sounds like you're feeling pretty shook right now.
              <br />
              what's been going i
            </p>
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex items-center space-x-6">
          <button className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.788L4.047 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.047l4.336-3.788a1 1 0 011.617.788zM16 8a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          </button>
          
          <button className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Your turn state (Image 2)
  if (currentState === 'yourTurn') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <div className="text-center mb-12">
          <h1 className="text-lg font-medium text-gray-800 mb-8">your turn</h1>
          
          {/* Static blue circle */}
          <div className="w-32 h-32 bg-blue-400 rounded-full mx-auto mb-12"></div>
          
          <div className="max-w-lg">
            <p className="text-gray-700 text-base leading-relaxed">
              okay, so it sounds like you're feeling pretty shook right now.
              <br />
              what's been going on that's got you in your feels?
            </p>
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex items-center space-x-6">
          <button className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.788L4.047 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.047l4.336-3.788a1 1 0 011.617.788zM16 8a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button 
            onClick={handleMicrophoneClick}
            className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors shadow-lg"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Listening state (Image 3)
  if (currentState === 'listening') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <div className="text-center mb-12">
          <h1 className="text-lg font-medium text-gray-800 mb-8">listening...</h1>
          
          {/* Pulsating blue circle while listening */}
          <div className="w-32 h-32 bg-blue-400 rounded-full mx-auto mb-12 animate-pulse"></div>
          
          <div className="max-w-lg mb-8">
            <p className="text-gray-700 text-base leading-relaxed">
              okay, so it sounds like you're feeling pretty shook right now.
              <br />
              what's been going on that's got you in your feels?
            </p>
          </div>

          {/* Audio waveform visualization */}
          <div className="flex items-center justify-center space-x-1 mb-8">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-gray-400 rounded-full animate-pulse"
                style={{
                  height: `${Math.random() * 30 + 10}px`,
                  animationDelay: `${i * 50}ms`,
                  animationDuration: '1s'
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex items-center space-x-6">
          <button className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.788L4.047 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.047l4.336-3.788a1 1 0 011.617.788zM16 8a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button 
            onClick={handleStopListening}
            className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors shadow-lg border-2 border-blue-600"
          >
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </button>
          
          <button className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Listening state (Image 3)
  if (currentState === 'listening') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <div className="text-center mb-12">
          <h1 className="text-lg font-medium text-gray-800 mb-8">listening...</h1>
          
          {/* Pulsating blue circle while listening */}
          <div className="w-32 h-32 bg-blue-400 rounded-full mx-auto mb-12 animate-pulse"></div>
          
          <div className="max-w-lg mb-8">
            <p className="text-gray-700 text-base leading-relaxed">
              okay, so it sounds like you're feeling pretty shook right now.
              <br />
              what's been going on that's got you in your feels?
            </p>
          </div>

          {/* Audio waveform visualization */}
          <div className="flex items-center justify-center space-x-1 mb-8">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-gray-400 rounded-full animate-pulse"
                style={{
                  height: `${Math.random() * 30 + 10}px`,
                  animationDelay: `${i * 50}ms`,
                  animationDuration: '1s'
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex items-center space-x-6">
          <button className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.788L4.047 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.047l4.336-3.788a1 1 0 011.617.788zM16 8a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button 
            onClick={handleStopListening}
            className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors shadow-lg border-2 border-blue-600"
          >
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </button>
          
          <button className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Responding state (State 4)
  if (currentState === 'responding') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <div className="text-center mb-12">
          <h1 className="text-lg font-medium text-gray-800 mb-8">responding...</h1>
          
          {/* Pulsating blue circle while processing */}
          <div className="w-32 h-32 bg-blue-400 rounded-full mx-auto mb-12 animate-pulse"></div>
          
          <div className="max-w-lg">
            <p className="text-gray-700 text-base leading-relaxed">
              processing your response...
            </p>
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex items-center space-x-6">
          <button className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.788L4.047 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.047l4.336-3.788a1 1 0 011.617.788zM16 8a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <button className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          </button>
          
          <button className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default VoiceInterface;