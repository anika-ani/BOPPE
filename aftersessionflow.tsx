import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, ChevronRight } from 'lucide-react';

const CompleteSessionFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(4.5);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(2);

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
  if (currentStep === 3) {
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
            onClick={handleContinue}
            className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 active:scale-95 transition-all"
          >
            continue
          </button>
        </div>
      </div>
    );
  }

  // Step 4: Session Summary
  if (currentStep === 4) {
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
              in this conversation, you shared how love songs, even post-breakup, bring you a sense of comfort rather than stirring up pain. it's like these songs serve as a quiet companion, reminding you that love—whether self-directed or from the past—still lingers gently in the background. when you mentioned "moonlight kaadugale," it became clear how much you value calm and grounding experiences, especially during reflective times. the way you described its effect—it's calm—spoke volumes about your ability to find peace in the midst of emotional complexities. it feels like you're using music not just as an escape, but as a way to process and honor your feelings, giving them space without letting them overwhelm you.
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
              
              <div className="h-48 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 rounded-xl mb-3 bg-cover bg-center hover:scale-105 transition-transform cursor-pointer"
                   style={{backgroundImage: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 300\"><defs><linearGradient id=\"sunset\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"%23FF6B6B\"/><stop offset=\"50%\" stop-color=\"%234ECDC4\"/><stop offset=\"100%\" stop-color=\"%23FFE66D\"/></linearGradient></defs><rect fill=\"url(%23sunset)\" width=\"400\" height=\"300\"/><path fill=\"%23000\" fill-opacity=\"0.1\" d=\"M0,200 Q100,180 200,200 T400,190 L400,300 L0,300 Z\"/></svg>')"}}
              ></div>
              
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
            <button className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 active:scale-95 transition-all">
              continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CompleteSessionFlow;