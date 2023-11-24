import { Schema, model, connect } from 'mongoose';
import { Address, FullName, Orders, User } from './user/user.interface';

const FullNameSchema = new Schema<FullName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const AddressSchema = new Schema<Address>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
});

const OrderSchema = new Schema<Orders>([
  {
    productName: { type: String },
    price: { type: Number },
    quantity: { type: Number },
  },
]);

const UserSchema = new Schema<User>({
  userId: { type: Number },
  username: { type: String },
  password: { type: String },
  fullName: FullNameSchema,
  age: { type: Number },
  email: { type: String },
  isActive: { type: Boolean },
  hobbies: {
    type: [String],
    required: true,
  },
  address: AddressSchema,
  orders: [OrderSchema],
});

export const userModel = model<User>('Users', UserSchema);
