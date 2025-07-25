import React, { useState } from 'react';
import { Settings, Clock, Home, MoreHorizontal } from 'lucide-react';

const BoppeFeedbackDialog = () => {
  const [feedback, setFeedback] = useState('');
  const [showDialog, setShowDialog] = useState(true);

  const handleSubmit = () => {
    if (feedback.trim()) {
      alert('Feedback submitted: ' + feedback);
      setShowDialog(false);
    }
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  const restartDemo = () => {
    setShowDialog(true);
    setFeedback('');
  };

  if (!showDialog) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <button 
          onClick={restartDemo}
          className="bg-blue-400 text-black px-6 py-3 rounded-full font-medium hover:bg-blue-500"
        >
          Show Dialog Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 relative">
      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
        <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
        <div className="bg-gray-400 text-white px-4 py-2 rounded-full text-sm font-medium">
          gen z mode
        </div>
      </div>

      {/* Left Sidebar */}
      <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col items-center pt-20 space-y-6 text-gray-400">
        <div className="w-6 h-6 flex items-center justify-center">
          <div className="w-4 h-4 border border-gray-400 rounded"></div>
        </div>
        <div className="w-6 h-6 flex items-center justify-center">
          <div className="w-4 h-4 border border-gray-400 rounded-full"></div>
        </div>
        <div className="w-6 h-6 flex items-center justify-center">
          <div className="w-4 h-3 border-2 border-gray-400 border-t-0 rounded-b"></div>
        </div>
      </div>

      {/* Main Content Area with Dialog */}
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Feedback Dialog */}
        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg relative">
          {/* Perfect Timing Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
            <h2 className="text-lg font-medium text-gray-900">perfect timing</h2>
          </div>
          
          {/* Textarea */}
          <div className="mb-6">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="how can we improve Boppe?"
              className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:border-gray-300 text-gray-700 placeholder-gray-400"
            />
          </div>
          
          {/* Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={handleCancel}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              cancel
            </button>
            <button 
              onClick={handleSubmit}
              className="flex-1 bg-blue-400 text-black py-3 px-4 rounded-full font-medium hover:bg-blue-500 transition-colors"
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoppeFeedbackDialog;