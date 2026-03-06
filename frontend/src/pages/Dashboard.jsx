import React, { useEffect, useMemo, useState } from 'react';
import ProgressBar from '../components/ProgressBar.jsx';

const Dashboard = () => {
  const [log, setLog] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('vaani_practice_log');
      const parsed = raw ? JSON.parse(raw) : [];
      setLog(parsed);
    } catch {
      setLog([]);
    }
  }, []);

  const stats = useMemo(() => {
    if (!log.length) {
      return {
        total: 0,
        avgAccuracy: 0,
        todayCount: 0
      };
    }
    const total = log.length;
    const avgAccuracy =
      log.reduce((sum, item) => sum + (item.accuracy || 0), 0) / total;

    const today = new Date().toISOString().slice(0, 10);
    const todayItems = log.filter((item) =>
      (item.ts || '').startsWith(today)
    );

    return {
      total,
      avgAccuracy,
      todayCount: todayItems.length
    };
  }, [log]);

  const goalPerDay = 10;
  const todayProgress = Math.min(
    100,
    Math.round((stats.todayCount / goalPerDay) * 100)
  );

  return (
    <div className="page-shell">
      <h2 className="page-title">
        <span role="img" aria-label="parents">
          👨‍👩‍👧
        </span>
        Parent Dashboard
      </h2>
      <p className="page-subtitle">
        A quick view of words practiced, accuracy, and daily progress.
      </p>

      <div className="dashboard-grid">
        <div>
          <h3 className="section-title">Overview</h3>
          <ProgressBar
            label="Average Pronunciation Accuracy"
            value={Math.round(stats.avgAccuracy)}
          />
          <ProgressBar
            label="Today&apos;s Practice Goal"
            value={todayProgress}
          />
          <div style={{ marginTop: '0.75rem', fontSize: '0.95rem' }}>
            <p>
              <strong>Words practiced:</strong> {stats.total}
            </p>
            <p>
              <strong>Sessions today:</strong> {stats.todayCount} / {goalPerDay}
            </p>
          </div>
        </div>

        <div>
          <h3 className="section-title">Recent Practice</h3>
          {log.length === 0 ? (
            <p className="muted">
              No practice yet. Try a few words in Speak Practice.
            </p>
          ) : (
            <div
              style={{
                maxHeight: 220,
                overflowY: 'auto',
                paddingRight: 4
              }}
            >
              {log
                .slice()
                .reverse()
                .slice(0, 12)
                .map((item, index) => {
                  const date = new Date(item.ts);
                  const label = isNaN(date)
                    ? ''
                    : date.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      });
                  return (
                    <div
                      key={`${item.ts}-${index}`}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.35rem 0.4rem',
                        borderBottom: '1px dashed #eceff1',
                        fontSize: '0.9rem'
                      }}
                    >
                      <span>{item.word}</span>
                      <span>
                        <strong>{item.accuracy || 0}%</strong>{' '}
                        <span className="small-label">{label}</span>
                      </span>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
