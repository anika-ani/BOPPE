import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SessionEndFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(4.5);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(2);
  const navigate = useNavigate();

  // Auto transition from step 1 to step 2
  useEffect(() => {
    if (currentStep === 1) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0.1) {
            setCurrentStep(2);
            clearInterval(timer);
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [currentStep]);

  const handleCardClick = () => {
    if (currentStep === 2) {
      setIsCardFlipped(true);
      setTimeout(() => {
        setCurrentStep(3);
      }, 600);
    }
  };

  const handleContinue = () => {
    if (currentStep === 3) {
      setCurrentStep(4);
    } else if (currentStep === 4) {
      navigate('/home');
    }
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

  // Step 1: Loading Screen
  if (currentStep === 1) {
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
  if (currentStep === 2) {
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
              <div className="h-90 bg-gradient-to-br from-teal-500 to-blue-600 relative">
                <div className="absolute inset-0 bg-cover bg-center" 
                     style={{backgroundImage: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 300\"><rect fill=\"%23168A8B\" width=\"400\" height=\"300\"/><path fill=\"%23FFA500\" d=\"M50,200 Q100,150 150,180 T250,170 T350,190 L400,220 L400,300 L0,300 Z\"/><polygon fill=\"%23FFFFFF\" points=\"150,120 170,140 190,120 210,140 230,120 240,130 220,150 200,130 180,150 160,130 140,150\"/><polygon fill=\"%23FFFFFF\" points=\"280,100 300,120 320,100 340,120 360,100 370,110 350,130 330,110 310,130 290,110 270,130\"/></svg>')"}}>
                </div>
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