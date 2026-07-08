import { useEffect, useState } from 'react';
import { normalizeCollection } from '../api/client';

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadTeams = async () => {
      try {
        const response = await fetch(teamsEndpoint);
        if (!response.ok) {
          throw new Error('Unable to load teams');
        }

        const payload = await response.json();
        const data = normalizeCollection(payload);
        if (isActive) {
          setTeams(data);
        }
      } catch (err) {
        if (isActive) {
          setError(err.message || 'Unable to load teams');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadTeams();
    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section>
      <h2 className="mb-4">Teams</h2>
      {loading && <p>Loading teams…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row g-3">
          {teams.map((team) => (
            <div className="col-md-6" key={team._id || team.name}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text mb-1"><strong>Sport:</strong> {team.sport}</p>
                  <p className="card-text"><strong>Members:</strong> {team.members?.length || 0}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Teams;
