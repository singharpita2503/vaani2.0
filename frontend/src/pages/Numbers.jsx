import React from 'react';

const Numbers = () => {
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="page-shell">
      <h2 className="page-title">
        <span role="img" aria-label="numbers">
          🔢
        </span>
        Learn Numbers
      </h2>
      <p className="page-subtitle">
        Count with apples and bright colors.
      </p>

      <div className="numbers-container">
        <p className="small-label">
          Say the numbers out loud together with your child.
        </p>
        <div className="card-row">
          {numbers.map((num) => (
            <div key={num} className="number-card">
              <div className="number-value">{num}</div>
              <div className="number-objects">
                {Array.from({ length: num }, (_, i) => (
                  <span key={i} aria-hidden="true">
                    🍎
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Numbers;
