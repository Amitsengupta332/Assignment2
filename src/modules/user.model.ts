import { Schema, model, connect } from 'mongoose';
import { TAddress, TFullName, TOrders, TUser } from './user/user.interface';

const FullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const AddressSchema = new Schema<TAddress>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
});

const OrderSchema = new Schema<TOrders>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

const UserSchema = new Schema<TUser>({
  userId: { type: Number, unique: true, required: true },
  username: { type: String },
  password: { type: String },
  fullName: FullNameSchema,
  age: { type: Number },
  email: { type: String },
  isActive: { type: Boolean },
  hobbies: {
    type: [String],
  },
  address: AddressSchema,
  orders: [OrderSchema],
});

export const userModel = model<TUser>('Users', UserSchema);
