import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (isLogin) {
      // Simulate login
      console.log(`Login attempted with email: ${email}`);
      navigate('/home');
    } else {
      // Simulate signup
      console.log(`Signup attempted with email: ${email}`);
      navigate('/onboarding');
    }
  };

  const handleGoogleAuth = () => {
    if (isLogin) {
      console.log('Google login attempted');
      navigate('/home');
    } else {
      console.log('Google signup attempted');
      navigate('/onboarding');
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 relative">
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
      >
        <X className="w-6 h-6" />
      </button>
      
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-left mb-16">
          <h1 className="text-2xl font-bold text-gray-900 mb-12">Boppe</h1>
          
          <div className="text-center mb-12">
            <h2 className="text-2xl font-medium text-gray-900 mb-2">ready when you are</h2>
            <p className="text-gray-600">your safe space, one convo at a time</p>
          </div>
        </div>

        {/* Auth Form */}
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

          <div