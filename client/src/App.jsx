import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import Landing from './pages/Landing.jsx';
import Home from './pages/Home.jsx';
import Auth from './pages/Auth.jsx';
import Chat from './pages/Chat.jsx';
import Profile from './pages/Profile.jsx';
import Settings from './pages/Settings.jsx';
import Terms from './pages/Terms.jsx';
import HowItWorks from './pages/HowItWorks.jsx';
import GehlotStory from './pages/GehlotStory.jsx';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-screen"><div className="spinner" /></div>;
  if (!user) return <Navigate to="/auth" />;
  return children;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-screen"><div className="spinner" /></div>;
  if (user) return <Navigate to="/home" />;
  return children;
}

export default function App() {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-screen"><div className="spinner" /></div>;

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <><Navbar /><Landing /></>} />
        <Route path="/home" element={<ProtectedRoute><><Navbar /><Home /></></ProtectedRoute>} />
        <Route path="/auth" element={<PublicRoute><Auth /></PublicRoute>} />
        <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><><Navbar /><Profile /></></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><><Navbar /><Settings /></></ProtectedRoute>} />
        <Route path="/terms" element={<><Navbar /><Terms /></>} />
        <Route path="/how-it-works" element={<><Navbar /><HowItWorks /></>} />
        <Route path="/gehlot-story" element={<><Navbar /><GehlotStory /></>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
