import { z } from 'zod';

// const ordersValidationSchema = z.object({
//   productName: z.string().min(1).max(255),
//   price: z.number(),
//   quantity: z.number(),
// });

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().min(1).max(255),
  password: z.string().min(1),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  isDeleted: z.boolean().default(false),
  hobbies: z.array(z.string().min(1)),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
});

export default userValidationSchema;
