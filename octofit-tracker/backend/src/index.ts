import express, { Request, Response } from 'express';
import './config/database';
import { User } from './models/user';
import { Team } from './models/team';
import { Activity } from './models/activity';
import { LeaderboardEntry } from './models/leaderboard';
import { Workout } from './models/workout';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

const codespaceName = process.env.CODESPACE_NAME?.trim();
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'octofit-backend', baseUrl });
});

app.get('/api/users/', async (_req: Request, res: Response) => {
  const users = await User.find({}).lean();
  res.json({ message: 'Users route', baseUrl, data: users });
});

app.get('/api/teams/', async (_req: Request, res: Response) => {
  const teams = await Team.find({}).lean();
  res.json({ message: 'Teams route', baseUrl, data: teams });
});

app.get('/api/activities/', async (_req: Request, res: Response) => {
  const activities = await Activity.find({}).lean();
  res.json({ message: 'Activities route', baseUrl, data: activities });
});

app.get('/api/leaderboard/', async (_req: Request, res: Response) => {
  const leaderboard = await LeaderboardEntry.find({}).sort({ rank: 1 }).lean();
  res.json({ message: 'Leaderboard route', baseUrl, data: leaderboard });
});

app.get('/api/workouts/', async (_req: Request, res: Response) => {
  const workouts = await Workout.find({}).lean();
  res.json({ message: 'Workouts route', baseUrl, data: workouts });
});

app.listen(port, () => {
  console.log(`Octofit backend listening on ${baseUrl}`);
});
