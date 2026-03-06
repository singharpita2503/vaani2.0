import React, { useContext, useEffect, useState } from 'react';
import MicButton from '../components/MicButton.jsx';
import { LanguageContext } from '../App.jsx';

const API_URL = 'http://localhost:5000/evaluate';

const WORDS = [
  { en: 'Apple', hi: 'कबूतर', emoji: '🍎' },
  { en: 'Ball', hi: 'खरगोश', emoji: '⚽' },
  { en: 'Sun', hi: 'सूरज', emoji: '☀️' },
  { en: 'Star', hi: 'तारा', emoji: '⭐' }
];

const Practice = () => {
  const { language } = useContext(LanguageContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [accuracy, setAccuracy] = useState(null);
  const [lastSpoken, setLastSpoken] = useState('');

  const currentWord = WORDS[currentIndex];
  const target = language === 'hi' ? currentWord.hi : currentWord.en;

  useEffect(() => {
    setFeedback('');
    setAccuracy(null);
    setLastSpoken('');
  }, [currentIndex, language]);

  const savePracticeSample = (word, score) => {
    try {
      const raw = localStorage.getItem('vaani_practice_log');
      const existing = raw ? JSON.parse(raw) : [];
      const now = new Date().toISOString();
      const entry = { ts: now, word, accuracy: score };
      const updated = [...existing, entry].slice(-100);
      localStorage.setItem('vaani_practice_log', JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
  };

  const handleResult = async (spoken) => {
    setLastSpoken(spoken);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spoken_text: spoken,
          expected_text: target,
          language
        })
      });
      const data = await res.json();
      const score = Math.round((data.accuracy || 0) * 100);
      setAccuracy(score);
      setFeedback(data.feedback || '');

      savePracticeSample(target, score);

      const positive = data.accuracy >= 0.8;
      const message = positive ? 'Good job!' : 'Let us try again.';
      if ('speechSynthesis' in window) {
        const utter = new SpeechSynthesisUtterance(message);
        utter.rate = 0.95;
        window.speechSynthesis.speak(utter);
      }
    } catch (e) {
      setFeedback('Could not connect to helper. Try again.');
    }
  };

  const langCode = language === 'hi' ? 'hi-IN' : 'en-US';

  const cycleWord = () => {
    setCurrentIndex((prev) => (prev + 1) % WORDS.length);
  };

  return (
    <div className="page-shell">
      <h2 className="page-title">
        <span role="img" aria-label="speak">
          🗣️
        </span>
        Speak Practice
      </h2>
      <p className="page-subtitle">
        Say the word and VAANI will gently guide you.
      </p>

      <div className="practice-container">
        <div className="practice-target-card">
          <div>
            <div className="section-title">Practice Word</div>
            <div className="target-word">
              {target} <span aria-hidden="true">{currentWord.emoji}</span>
            </div>
            <div className="target-helper">
              Tap Listen, then say it into the mic.
            </div>
          </div>
          <button
            className="pill-button"
            onClick={() => {
              if (!('speechSynthesis' in window)) return;
              const text =
                language === 'hi'
                  ? `${target} बोलें`
                  : `Please say ${target}`;
              const utter = new SpeechSynthesisUtterance(text);
              utter.rate = 0.9;
              window.speechSynthesis.speak(utter);
            }}
          >
            🔊 Listen
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }}
        >
          <div>
            <div className="section-title">Your Voice</div>
            <p className="small-label">
              Press the round mic button and speak clearly.
            </p>
          </div>
          <MicButton languageCode={langCode} onResult={handleResult} />
        </div>

        <div className="practice-feedback">
          {accuracy != null ? (
            <span
              className={`status-text ${
                accuracy >= 80 ? 'status-good' : 'status-try'
              }`}
            >
              {accuracy >= 80 ? 'Good Job! 🎉 ' : 'Try Again 💪 '}
              {feedback && `– ${feedback}`}
              {` (${accuracy}%)`}
            </span>
          ) : (
            <span className="muted">
              Waiting for your lovely voice…
            </span>
          )}
        </div>

        {lastSpoken && (
          <p className="small-label">
            Heard: "{lastSpoken}"
          </p>
        )}

        <button
          className="pill-button"
          onClick={cycleWord}
          style={{ alignSelf: 'flex-start', marginTop: '0.4rem' }}
        >
          🔁 Next Word
        </button>
      </div>
    </div>
  );
};

export default Practice;
