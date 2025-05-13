import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  // Add other user fields as needed
  createdAt: Date;
  updatedAt: Date;
}