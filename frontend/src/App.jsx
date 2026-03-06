import React, { createContext, useMemo, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Alphabets from './pages/Alphabets.jsx';
import Numbers from './pages/Numbers.jsx';
import Practice from './pages/Practice.jsx';
import Dashboard from './pages/Dashboard.jsx';

export const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {}
});

const App = () => {
  const [language, setLanguage] = useState('en');
  const location = useLocation();

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  const isHome = location.pathname === '/';

  return (
    <LanguageContext.Provider value={value}>
      <div className="app-root">
        <header className="app-header">
          <Link to="/" className="app-logo">
            <span className="logo-emoji">🗣️</span>
            <span className="logo-text">VAANI</span>
          </Link>
          <div className="header-actions">
            <div className="language-toggle" aria-label="Language toggle">
              <button
                className={`toggle-pill ${language === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
              >
                EN
              </button>
              <button
                className={`toggle-pill ${language === 'hi' ? 'active' : ''}`}
                onClick={() => setLanguage('hi')}
              >
                हिन्दी
              </button>
            </div>
            {!isHome && (
              <Link to="/" className="home-chip">
                ⬅ Home
              </Link>
            )}
          </div>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/alphabets" element={<Alphabets />} />
            <Route path="/numbers" element={<Numbers />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <span>Happy speaking! 💬</span>
        </footer>
      </div>
    </LanguageContext.Provider>
  );
};

export default App;
