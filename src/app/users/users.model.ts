import { Schema, model } from 'mongoose';
import { TUsers } from './users.interface';
import bcrypt from 'bcrypt';
import config from '../config';

// const ordersSchema = new Schema<TOrders>({
//   productName: {
//     type: String,
//     required: [true, 'Product name is required!'],
//   },
//   price: {
//     type: Number,
//     required: [true, 'Price is required!'],
//   },
//   quantity: {
//     type: Number,
//     required: [true, 'Quantity is required'],
//   },
// });

const userSchema = new Schema<TUsers>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'User id is required!'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'User name is required!'],
  },
  password: {
    type: String,
    required: [true, 'Password field is required!'],
  },
  fullName: {
    type: {
      firstName: String,
      lastName: String,
    },
    _id: false,
  },
  age: {
    type: Number,
    required: [true, 'Age is required!'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  hobbies: {
    type: [String],
    required: [true, 'Hobbies is required!'],
  },
  address: {
    type: {
      street: String,
      city: String,
      country: String,
    },
    _id: false,
  },
  isDeleted: { type: Boolean, default: false },
  // orders: {
  //   type: [ordersSchema],
  // },
});

// middleware

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_number),
  );

  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// delete user

userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

userSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });

  next();
});
export const UserModel = model('User', userSchema);
