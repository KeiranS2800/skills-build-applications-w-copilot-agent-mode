import { useEffect, useState } from 'react';
import { normalizeCollection } from '../api/client';

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadUsers = async () => {
      try {
        const response = await fetch(usersEndpoint);
        if (!response.ok) {
          throw new Error('Unable to load users');
        }

        const payload = await response.json();
        const data = normalizeCollection(payload);
        if (isActive) {
          setUsers(data);
        }
      } catch (err) {
        if (isActive) {
          setError(err.message || 'Unable to load users');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadUsers();
    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section>
      <h2 className="mb-4">Users</h2>
      {loading && <p>Loading users…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row g-3">
          {users.map((user) => (
            <div className="col-md-6" key={user._id || user.email}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text mb-1"><strong>Email:</strong> {user.email}</p>
                  <p className="card-text mb-1"><strong>Goal:</strong> {user.fitnessGoal}</p>
                  <p className="card-text"><strong>Level:</strong> {user.experienceLevel}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Users;
