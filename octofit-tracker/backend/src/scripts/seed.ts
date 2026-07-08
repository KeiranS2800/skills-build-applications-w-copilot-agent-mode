import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Workout } from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await LeaderboardEntry.deleteMany({});
    await Workout.deleteMany({});

    const users = await User.insertMany([
      { name: 'Ava Patel', email: 'ava@example.com', fitnessGoal: 'Build endurance', experienceLevel: 'Intermediate' },
      { name: 'Noah Kim', email: 'noah@example.com', fitnessGoal: 'Lose weight', experienceLevel: 'Beginner' },
      { name: 'Mia Chen', email: 'mia@example.com', fitnessGoal: 'Increase strength', experienceLevel: 'Advanced' }
    ]);

    const teams = await Team.insertMany([
      { name: 'River Runners', sport: 'Running', members: [users[0].id, users[1].id] },
      { name: 'Peak Power', sport: 'Strength', members: [users[2].id] }
    ]);

    await Activity.insertMany([
      { userId: users[0].id, type: 'Run', duration: 35, calories: 320, date: new Date('2026-07-01') },
      { userId: users[1].id, type: 'Cycling', duration: 45, calories: 280, date: new Date('2026-07-02') },
      { userId: users[2].id, type: 'Strength', duration: 60, calories: 410, date: new Date('2026-07-03') }
    ]);

    await LeaderboardEntry.insertMany([
      { userId: users[0].id, score: 980, rank: 1 },
      { userId: users[1].id, score: 875, rank: 2 },
      { userId: users[2].id, score: 940, rank: 3 }
    ]);

    await Workout.insertMany([
      { name: 'Tempo Run', difficulty: 'Intermediate', duration: 30, focus: 'Cardio' },
      { name: 'Core Blast', difficulty: 'Beginner', duration: 20, focus: 'Core' },
      { name: 'Heavy Lift', difficulty: 'Advanced', duration: 45, focus: 'Strength' }
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
