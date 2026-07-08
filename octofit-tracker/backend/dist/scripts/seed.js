"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await user_1.User.deleteMany({});
        await team_1.Team.deleteMany({});
        await activity_1.Activity.deleteMany({});
        await leaderboard_1.LeaderboardEntry.deleteMany({});
        await workout_1.Workout.deleteMany({});
        const users = await user_1.User.insertMany([
            { name: 'Ava Patel', email: 'ava@example.com', fitnessGoal: 'Build endurance', experienceLevel: 'Intermediate' },
            { name: 'Noah Kim', email: 'noah@example.com', fitnessGoal: 'Lose weight', experienceLevel: 'Beginner' },
            { name: 'Mia Chen', email: 'mia@example.com', fitnessGoal: 'Increase strength', experienceLevel: 'Advanced' }
        ]);
        const teams = await team_1.Team.insertMany([
            { name: 'River Runners', sport: 'Running', members: [users[0].id, users[1].id] },
            { name: 'Peak Power', sport: 'Strength', members: [users[2].id] }
        ]);
        await activity_1.Activity.insertMany([
            { userId: users[0].id, type: 'Run', duration: 35, calories: 320, date: new Date('2026-07-01') },
            { userId: users[1].id, type: 'Cycling', duration: 45, calories: 280, date: new Date('2026-07-02') },
            { userId: users[2].id, type: 'Strength', duration: 60, calories: 410, date: new Date('2026-07-03') }
        ]);
        await leaderboard_1.LeaderboardEntry.insertMany([
            { userId: users[0].id, score: 980, rank: 1 },
            { userId: users[1].id, score: 875, rank: 2 },
            { userId: users[2].id, score: 940, rank: 3 }
        ]);
        await workout_1.Workout.insertMany([
            { name: 'Tempo Run', difficulty: 'Intermediate', duration: 30, focus: 'Cardio' },
            { name: 'Core Blast', difficulty: 'Beginner', duration: 20, focus: 'Core' },
            { name: 'Heavy Lift', difficulty: 'Advanced', duration: 45, focus: 'Strength' }
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
