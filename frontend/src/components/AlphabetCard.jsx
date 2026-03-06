import React, { useContext } from 'react';
import { LanguageContext } from '../App.jsx';

const speakText = (text) => {
  if (!('speechSynthesis' in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1.0;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};

const AlphabetCard = ({ letter, word, emoji, onSpeakComplete }) => {
  const { language } = useContext(LanguageContext);

  const handleListen = () => {
    const phrase =
      language === 'hi'
        ? `${letter} से ${word}`
        : `${letter} for ${word}`;
    speakText(phrase);
  };

  return (
    <div
      className="alphabet-card"
      style={{
        borderRadius: 24,
        background: '#e3f2fd',
        padding: '1.4rem 1.2rem',
        textAlign: 'center',
        boxShadow: '0 10px 0 #90caf9'
      }}
    >
      <div
        style={{
          fontSize: '2.4rem',
          fontWeight: 700,
          color: '#1e88e5'
        }}
      >
        {letter}
      </div>
      <div
        style={{
          fontSize: '1.5rem',
          marginTop: '0.4rem'
        }}
      >
        {word} <span aria-hidden="true">{emoji}</span>
      </div>
      <button
        onClick={handleListen}
        className="pill-button"
        style={{ marginTop: '0.8rem' }}
      >
        🔊 Listen
      </button>
      {onSpeakComplete && (
        <p className="small-label" style={{ marginTop: '0.4rem' }}>
          Tap the mic and say this word.
        </p>
      )}
    </div>
  );
};

export default AlphabetCard;
