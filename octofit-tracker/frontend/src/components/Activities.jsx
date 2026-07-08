import { useEffect, useState } from 'react';
import { fetchCollection } from '../api/client';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadActivities = async () => {
      try {
        const data = await fetchCollection('activities');
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
