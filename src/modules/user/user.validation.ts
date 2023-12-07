import { z } from 'zod';

const FullNameSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

export const OrderSchema = z.object({
  productName: z.string(),
  price: z.number().positive('Price must be a positive number'),
  quantity: z.number().positive('Quantity must be a positive number'),
});

const UserSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: FullNameSchema,
  age: z.number().positive('Age must be a positive number'),
  email: z.string().email('Invalid email address'),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: AddressSchema,
  orders: z.array(OrderSchema).optional(),
});

export default UserSchema;
