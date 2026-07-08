import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: string;
  score: number;
  rank: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: String, required: true, unique: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now }
});

export const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
