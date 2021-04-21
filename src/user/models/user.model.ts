import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  phone: Number,
  name: String,
  dni: String,
  city: String,
  birthDate: Date,
  registrationDate: Date,
  permissions: {
    admin: Boolean
  },
  isActive: Boolean
});
