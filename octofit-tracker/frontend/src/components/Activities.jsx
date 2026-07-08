import { useEffect, useState } from 'react';
import { normalizeCollection } from '../api/client';

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadActivities = async () => {
      try {
        const response = await fetch(activitiesEndpoint);
        if (!response.ok) {
          throw new Error('Unable to load activities');
        }

        const payload = await response.json();
        const data = normalizeCollection(payload);
        if (isActive) {
          setActivities(data);
        }
      } catch (err) {
        if (isActive) {
          setError(err.message || 'Unable to load activities');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadActivities();
    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section>
      <h2 className="mb-4">Activities</h2>
      {loading && <p>Loading activities…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row g-3">
          {activities.map((activity) => (
            <div className="col-md-6" key={activity._id || activity.date}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{activity.type}</h5>
                  <p className="card-text mb-1"><strong>Duration:</strong> {activity.duration} min</p>
                  <p className="card-text mb-1"><strong>Calories:</strong> {activity.calories}</p>
                  <p className="card-text"><strong>User:</strong> {activity.userId}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Activities;
