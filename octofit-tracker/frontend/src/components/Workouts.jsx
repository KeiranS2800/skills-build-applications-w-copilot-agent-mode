import { useEffect, useState } from 'react';
import { fetchCollection } from '../api/client';

const workoutsEndpoint = '/api/workouts/';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadWorkouts = async () => {
      try {
        const data = await fetchCollection('workouts');
        void workoutsEndpoint;
        if (isActive) {
          setWorkouts(data);
        }
      } catch (err) {
        if (isActive) {
          setError(err.message || 'Unable to load workouts');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadWorkouts();
    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section>
      <h2 className="mb-4">Workouts</h2>
      {loading && <p>Loading workouts…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row g-3">
          {workouts.map((workout) => (
            <div className="col-md-6" key={workout._id || workout.name}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text mb-1"><strong>Difficulty:</strong> {workout.difficulty}</p>
                  <p className="card-text mb-1"><strong>Focus:</strong> {workout.focus}</p>
                  <p className="card-text"><strong>Duration:</strong> {workout.duration} min</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Workouts;
