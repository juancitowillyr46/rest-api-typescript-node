import mongoose, { Schema, model } from 'mongoose';

export interface User extends mongoose.Document {
 email: string;
 fullname: string;
 password: string;
}

const UserSchema = new Schema({
 email: {
  type: String,
  required: true,
  min:6,
  max:50
 },
 fullname: {
  type: String,
  required: true,
  min:6,
  max:50
 },
 password: {
  type: String,
  required: true,
  min:6,
  max:1024
 }
});

export default model<User>('User', UserSchema);