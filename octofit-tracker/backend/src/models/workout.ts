import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  difficulty: string;
  duration: number;
  focus: string;
  createdAt: Date;
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true, unique: true },
  difficulty: { type: String, required: true },
  duration: { type: Number, required: true },
  focus: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
