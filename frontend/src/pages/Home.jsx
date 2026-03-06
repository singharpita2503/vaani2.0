import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../App.jsx';
import kidsBg from '../components/kidss_bg.jpg';

const Home = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  const handleNav = (path) => {
    navigate(path);
  };

  const title =
    language === 'hi' ? 'वाणी – बोलना सीखें' : 'VAANI – Speech Learning Assistant';

  return (
    <div
      className="page-shell home-shell"
      style={{ backgroundImage: `url(${kidsBg})` }}
    >
      <div className="home-paper">
        <h2 className="page-title home-title">
          <span role="img" aria-label="kids">
            🌈
          </span>
          {title}
        </h2>
        <p className="page-subtitle home-subtitle">Colorful practice for little voices.</p>

        <div className="big-grid home-grid">
        <button
          className="big-card-button primary"
          onClick={() => handleNav('/alphabets')}
        >
          <span role="img" aria-hidden="true">
            🔤
          </span>
          Learn Alphabets
        </button>
        <button
          className="big-card-button secondary"
          onClick={() => handleNav('/numbers')}
        >
          <span role="img" aria-hidden="true">
            🔢
          </span>
          Learn Numbers
        </button>
        <button
          className="big-card-button tertiary"
          onClick={() => handleNav('/practice')}
        >
          <span role="img" aria-hidden="true">
            🗣️
          </span>
          Speak Practice
        </button>
        <button
          className="big-card-button quaternary"
          onClick={() => handleNav('/dashboard')}
        >
          <span role="img" aria-hidden="true">
            👨‍👩‍👧
          </span>
          Parent Dashboard
        </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
