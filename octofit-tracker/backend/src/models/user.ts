import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  fitnessGoal: string;
  experienceLevel: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fitnessGoal: { type: String, required: true },
  experienceLevel: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model<IUser>('User', userSchema);
