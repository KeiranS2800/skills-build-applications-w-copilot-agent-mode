import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: string;
  type: string;
  duration: number;
  calories: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
