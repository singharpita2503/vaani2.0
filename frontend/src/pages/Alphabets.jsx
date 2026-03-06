import React, { useContext, useMemo, useState } from 'react';
import AlphabetCard from '../components/AlphabetCard.jsx';
import MicButton from '../components/MicButton.jsx';
import { LanguageContext } from '../App.jsx';

const ALPHABETS_EN = [
  { letter: 'A', word: 'Apple', emoji: '🍎' },
  { letter: 'B', word: 'Ball', emoji: '⚽' },
  { letter: 'C', word: 'Cat', emoji: '🐱' }
];

const ALPHABETS_HI = [
  { letter: 'क', word: 'कबूतर', emoji: '🕊️' },
  { letter: 'ख', word: 'खरगोश', emoji: '🐰' },
  { letter: 'ग', word: 'गुलाब', emoji: '🌹' }
];

const API_URL = 'http://localhost:5000/evaluate';

const Alphabets = () => {
  const { language } = useContext(LanguageContext);
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [accuracy, setAccuracy] = useState(null);
  const [lastHeard, setLastHeard] = useState('');

  const items = useMemo(
    () => (language === 'hi' ? ALPHABETS_HI : ALPHABETS_EN),
    [language]
  );

  const current = items[index];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % items.length);
    setFeedback('');
    setAccuracy(null);
    setLastHeard('');
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
    setFeedback('');
    setAccuracy(null);
    setLastHeard('');
  };

  const handleResult = async (spoken) => {
    setLastHeard(spoken);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spoken_text: spoken,
          expected_text: current.word,
          language
        })
      });
      const data = await res.json();
      setAccuracy(Math.round((data.accuracy || 0) * 100));
      setFeedback(data.feedback || '');
      if (data.accuracy >= 0.8) {
        const utter = new SpeechSynthesisUtterance('Good job!');
        utter.rate = 1;
        window.speechSynthesis.speak(utter);
      }
    } catch (e) {
      setFeedback('Could not check. Please try again.');
    }
  };

  const langCode = language === 'hi' ? 'hi-IN' : 'en-US';

  return (
    <div className="page-shell">
      <h2 className="page-title">
        <span role="img" aria-label="alphabet">
          🔤
        </span>
        Learn Alphabets
      </h2>
      <p className="page-subtitle">
        Listen, repeat, and get friendly feedback.
      </p>

      <div className="alphabet-container">
        <AlphabetCard
          letter={current.letter}
          word={current.word}
          emoji={current.emoji}
          onSpeakComplete
        />

        <div className="controls-row">
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="pill-button" onClick={handlePrev}>
              ⬅ Previous
            </button>
            <button className="pill-button" onClick={handleNext}>
              Next ➡
            </button>
          </div>
          <span className="info-chip">
            {language === 'hi' ? 'हिन्दी' : 'English'} • {index + 1} /{' '}
            {items.length}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            marginTop: '0.4rem',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span className="section-title">Your Turn</span>
            <span className="small-label">
              Tap the mic and say the word on the card.
            </span>
          </div>
          <MicButton languageCode={langCode} onResult={handleResult} />
        </div>

        <div className="practice-feedback">
          {feedback ? (
            <span
              className={`status-text ${
                (accuracy || 0) >= 80 ? 'status-good' : 'status-try'
              }`}
            >
              {feedback} {accuracy != null && `(${accuracy}%)`}
            </span>
          ) : (
            <span className="muted">
              Waiting for your voice… 🎧
            </span>
          )}
        </div>

        {lastHeard && (
          <p className="small-label">
            Heard: "{lastHeard}"
          </p>
        )}
      </div>
    </div>
  );
};

export default Alphabets;
