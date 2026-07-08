"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/database");
const user_1 = require("./models/user");
const team_1 = require("./models/team");
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const workout_1 = require("./models/workout");
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
app.use(express_1.default.json());
const codespaceName = process.env.CODESPACE_NAME?.trim();
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.get('/', (_req, res) => {
    res.json({ message: 'Octofit Tracker API', baseUrl });
});
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', baseUrl });
});
app.get('/api/users/', async (_req, res) => {
    const users = await user_1.User.find({}).lean();
    res.json({ message: 'Users route', baseUrl, data: users });
});
app.get('/api/teams/', async (_req, res) => {
    const teams = await team_1.Team.find({}).lean();
    res.json({ message: 'Teams route', baseUrl, data: teams });
});
app.get('/api/activities/', async (_req, res) => {
    const activities = await activity_1.Activity.find({}).lean();
    res.json({ message: 'Activities route', baseUrl, data: activities });
});
app.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await leaderboard_1.LeaderboardEntry.find({}).sort({ rank: 1 }).lean();
    res.json({ message: 'Leaderboard route', baseUrl, data: leaderboard });
});
app.get('/api/workouts/', async (_req, res) => {
    const workouts = await workout_1.Workout.find({}).lean();
    res.json({ message: 'Workouts route', baseUrl, data: workouts });
});
app.listen(port, () => {
    console.log(`Octofit backend listening on ${baseUrl}`);
});
