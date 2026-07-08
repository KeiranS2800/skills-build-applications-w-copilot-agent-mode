import { useEffect, useState } from 'react';
import { normalizeCollection } from '../api/client';

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadLeaderboard = async () => {
      try {
        const response = await fetch(leaderboardEndpoint);
        if (!response.ok) {
          throw new Error('Unable to load leaderboard');
        }

        const payload = await response.json();
        const data = normalizeCollection(payload);
        if (isActive) {
          setEntries(data);
        }
      } catch (err) {
        if (isActive) {
          setError(err.message || 'Unable to load leaderboard');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadLeaderboard();
    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section>
      <h2 className="mb-4">Leaderboard</h2>
      {loading && <p>Loading leaderboard…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="list-group">
          {entries.map((entry) => (
            <div className="list-group-item d-flex justify-content-between align-items-center" key={entry._id || entry.userId}>
              <span>#{entry.rank} · {entry.userId}</span>
              <span className="badge bg-primary rounded-pill">{entry.score}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Leaderboard;
