import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import AuthPages from './components/AuthPages'
import OnboardingFlow from './components/OnboardingFlow'
import Homepage from './components/Homepage'
import VoiceInterface from './components/VoiceInterface'
import SessionEndFlow from './components/SessionEndFlow'
import FeedbackDialog from './components/FeedbackDialog'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPages />} />
          <Route path="/onboarding" element={<OnboardingFlow />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/voice" element={<VoiceInterface />} />
          <Route path="/session-end" element={<SessionEndFlow />} />
          <Route path="/feedback" element={<FeedbackDialog />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App