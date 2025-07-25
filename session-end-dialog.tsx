import React, { useState } from 'react';
import { X } from 'lucide-react';

const SessionEndDialog = () => {
  const [showDialog, setShowDialog] = useState(true);

  const handleCancel = () => {
    setShowDialog(false);
  };

  const handleConfirm = () => {
    // Handle session end
    alert('Session ended');
    setShowDialog(false);
  };

  const restartDemo = () => {
    setShowDialog(true);
  };

  if (!showDialog) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <button onClick={restartDemo} className="bg-blue-500 text-white px-4 py-2 rounded">
          Show Dialog Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-700 relative">
      {/* Background Chat Interface */}
      <div className="absolute inset-0 p-4">
        <div className="max-w-md mx-auto bg-white h-full rounded-3xl p-6 opacity-40">
          <div className="mt-16 space-y-6">
            {/* Chat Message 1 */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-400 rounded-full flex-shrink-0"></div>
              <div className="text-xs text-gray-700 leading-relaxed">
                hi there! i'm Boppe, and welcome to your guided therapy session.
                we'll take things step by step, exploring what's on your mind and
                finding ways to move forward. it works best if you've got a little
                focused time to dive into this together—so, what's been on your
                mind lately?
              </div>
            </div>

            {/* Chat Message 2 */}
            <div className="flex items-start gap-3 justify-end">
              <div className="text-xs text-gray-700 text-right leading-relaxed max-w-xs">
                oh building my business
              </div>
              <div className="w-6 h-6 bg-blue-400 rounded-full flex-shrink-0"></div>
            </div>

            {/* Chat Message 3 */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-400 rounded-full flex-shrink-0"></div>
              <div className="text-xs text-gray-700 leading-relaxed">
                ah, gotcha! building your business sounds exciting—and uh,
                maybe a little overwhelming at times? what about it feels most
                important to tackle today? are you stuck on the vision, the next
                steps, or something else entirely?
              </div>
            </div>

            {/* Chat Message 4 */}
            <div className="flex items-start gap-3 justify-end">
              <div className="text-xs text-gray-700 text-right leading-relaxed max-w-xs">
                i'm not sure what my mindset is about this sometimes im
                confused if im doing right sometimes i feel so excited and
                sometimes so annoyed are there any limiting beliefs i dont know
              </div>
              <div className="w-6 h-6 bg-blue-400 rounded-full flex-shrink-0"></div>
            </div>

            {/* Chat Message 5 */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-400 rounded-full flex-shrink-0"></div>
              <div className="text-xs text-gray-700 leading-relaxed">
                i'm hearing that mix of emotions—excitement, confusion, and
                annoyance. that's actually pretty normal when you're building
                something new! let me ask: when you say you're not sure if
                you're "doing right," what does "right" look like to you? is it
                about the methods you're using, the results you're seeing, or
                holding beliefs without us even realizing.
              </div>
            </div>

            {/* Chat Message 6 */}
            <div className="flex items-start gap-3 justify-end">
              <div className="text-xs text-gray-700 text-right leading-relaxed max-w-xs">
                second thought
              </div>
              <div className="w-6 h-6 bg-blue-400 rounded-full flex-shrink-0"></div>
            </div>

            {/* Chat Message 7 */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-400 rounded-full flex-shrink-0"></div>
              <div className="text-xs text-gray-700 leading-relaxed">
                mm, second thoughts creeping in can be tricky—they often like
                to whisper doubts when you're on the verge of something
                important. so you ever catch yourself thinking things like
                "maybe i'm not cut out for this" or "what if this doesn't work"?
                those kinds of thoughts can quietly steer you away from your
                goals if they're left unchecked. what do you think might be
                fueling them? fear of failure? pressure to get it perfect?
              </div>
            </div>

            {/* Chat Message 8 */}
            <div className="flex items-start gap-3 justify-end">
              <div className="text-xs text-gray-700 text-right leading-relaxed max-w-xs">
                giving up soon in the past
              </div>
              <div className="w-6 h-6 bg-blue-400 rounded-full flex-shrink-0"></div>
            </div>

            {/* Chat Message 9 */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-400 rounded-full flex-shrink-0"></div>
              <div className="text-xs text-gray-700 leading-relaxed">
                ah, so there's a history of giving up quickly before, huh? that
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">end the session?</h2>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-gray-600 text-sm mb-6">
            are you 100% sure you want to end the session?
          </p>
          
          <div className="flex gap-3">
            <button 
              onClick={handleCancel}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-full font-medium hover:bg-gray-300"
            >
              cancel
            </button>
            <button 
              onClick={handleConfirm}
              className="flex-1 bg-blue-400 text-black py-3 px-4 rounded-full font-medium hover:bg-blue-500"
            >
              confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionEndDialog;