import { Document, Model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserModel extends Model<IUser> {
  isEmailTaken(email: string): Promise<boolean>;
}