import React, { useEffect, useRef, useState } from 'react';

const getRecognition = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return null;
  const rec = new SpeechRecognition();
  rec.continuous = false;
  rec.interimResults = false;
  rec.maxAlternatives = 1;
  return rec;
};

const MicButton = ({ languageCode = 'en-US', onResult }) => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      return;
    }
    recognitionRef.current = getRecognition();
  }, []);

  const handleClick = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    const recognition = recognitionRef.current;
    recognition.lang = languageCode;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setListening(false);
      if (onResult) {
        onResult(transcript);
      }
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    setListening(true);
    recognition.start();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={listening}
      className="mic-button"
      style={{
        borderRadius: '50%',
        width: 80,
        height: 80,
        border: 'none',
        background: listening ? '#ef5350' : '#66bb6a',
        boxShadow: listening
          ? '0 10px 0 #c62828'
          : '0 10px 0 #2e7d32',
        color: '#fff',
        fontSize: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'transform 0.1s ease, box-shadow 0.1s ease'
      }}
    >
      <span aria-hidden="true">🎙️</span>
    </button>
  );
};

export default MicButton;
