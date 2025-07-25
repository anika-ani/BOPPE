import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const BoppeLandingPage = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900">Boppe</h1>
        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-900">log in</button>
          <button className="bg-blue-400 text-black px-4 py-2 rounded-full font-medium hover:bg-blue-500">
            start free
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="max-w-2xl">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            it's not therapy.<br/>
            it's just Boppe.
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            your voice, Boppe's ai built to help you explore your thoughts, emotions, and behaviors.
          </p>
          <button className="bg-blue-400 text-black px-6 py-3 rounded-full font-medium hover:bg-blue-500 mb-4">
            start session (voice)
          </button>
          <p className="text-sm text-gray-500">
            loved by 100,000+ cool people
          </p>
        </div>

        {/* Demo Video Section */}
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

        {/* Partner Logos */}
        <div className="flex items-center justify-center gap-8 mt-16 opacity-60">
          <span className="text-gray-500">11ElevenLabsGrants</span>
          <span className="text-gray-500">Founders Hub</span>
          <span className="text-gray-500">AWS for Startups</span>
          <span className="text-gray-500">incubate</span>
          <span className="text-gray-500">🏆</span>
        </div>
      </section>

      {/* Features Section */}
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
              {/* Image placeholder for whenever/wherever illustration */}
              <div className="w-64 h-40 bg-gradient-to-br from-blue-300 to-orange-400 rounded-xl flex items-center justify-center">
                <div className="w-16 h-16 bg-blue-400 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-gray-800 rounded-2xl p-8 text-white overflow-hidden">
              {/* Image placeholder for safe & sound screenshot */}
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
              {/* Image placeholder for remembers everything illustration */}
              <div className="h-40 bg-gradient-to-br from-orange-300 to-blue-400 rounded-xl flex items-center justify-center">
                <div className="space-y-2">
                  <div className="w-20 h-12 bg-orange-200 rounded transform rotate-12"></div>
                  <div className="w-20 h-12 bg-orange-100 rounded transform -rotate-6"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-gray-100 rounded-2xl p-8">
              {/* Image placeholder for therapy profile screenshot */}
              <div className="h-40 bg-white rounded-xl p-4">
                <div className="space-y-3">
                  <div className="h-3 bg-gray-300 rounded w-full"></div>
                  <div className="h-3 bg-blue-200 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  <div className="h-3 bg-green-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">therapy profile</h4>
              <p className="text-gray-600">
                your mental health. snapshot. see patterns, recognize patterns, and understand yourself better over time.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">session breakdown</h4>
              <p className="text-gray-600">
                support doesn't end when your chat does. get clear session summaries, personalized tips, and homework that sticks.
              </p>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8">
              {/* Image placeholder for session breakdown screenshot */}
              <div className="h-40 bg-white rounded-xl p-4">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-800 rounded w-full"></div>
                  <div className="h-2 bg-gray-300 rounded w-4/5"></div>
                  <div className="h-2 bg-gray-300 rounded w-3/5"></div>
                  <div className="h-2 bg-gray-300 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-blue-100 rounded-2xl p-8 flex items-center justify-center">
              {/* Image placeholder for gen z mode */}
              <div className="w-64 h-40 bg-gradient-to-br from-blue-300 to-blue-500 rounded-xl border-4 border-blue-400 flex items-center justify-center">
                <div className="w-16 h-16 bg-blue-400 rounded-full"></div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">gen z mode</h4>
              <p className="text-gray-600">
                honestly why normal mental health can be fun.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
            
            <div className="bg-gray-50 p-6 rounded-2xl">
              <p className="text-gray-800 mb-4">"tried it and holy smokes... this is insane. i'm so amazed at how good this ai is!"</p>
              <p className="text-gray-500 text-sm">@imsquirthree</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-2xl">
              <p className="text-gray-800 mb-4">"to be honest, i gave it a try and it's really good i feel better now."</p>
              <p className="text-gray-500 text-sm">@manzanitawoo</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-2xl">
              <p className="text-gray-800 mb-4">"holy 5 works, i swear. this made my day."</p>
              <p className="text-gray-500 text-sm">@dobson.music</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">get started for free</h3>
          <p className="text-lg text-gray-600 mb-8">be heard. be understood. be better.</p>
          <button className="bg-blue-400 text-black px-8 py-4 rounded-full font-medium text-lg hover:bg-blue-500">
            try Boppe free
          </button>
        </div>
      </section>

      {/* Footer */}
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
};

export default BoppeLandingPage;