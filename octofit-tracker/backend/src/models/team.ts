import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  sport: string;
  members: string[];
  createdAt: Date;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  sport: { type: String, required: true },
  members: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export const Team = mongoose.model<ITeam>('Team', teamSchema);
