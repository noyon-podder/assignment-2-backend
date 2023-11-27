import { TUsers } from './users.interface';
import { UserModel } from './users.model';

//  create a new user
const createUserIntoDB = async (userData: TUsers) => {
  const result = await UserModel.create(userData);

  return result;
};

// get all user from db
const getAllUsersFromDB = async () => {
  const result = await UserModel.find();

  return result;
};

// get a single user
const getSingleUser = async (userId: string) => {
  const result = await UserModel.findOne({ userId }).select('-password');

  return result;
};

// single user updated information

const singleUserInformationUpdate = async (
  updatedUserId: string,
  updatedData: TUsers,
) => {
  const result = await UserModel.findOneAndUpdate(
    { userId: updatedUserId },
    { updatedData },
  );

  return result;
};

const deleteStudentFromDb = async (id: string) => {
  const result = await UserModel.updateOne({ userId: id }, { isDeleted: true });

  return result;
};

export const usersService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUser,
  singleUserInformationUpdate,
  deleteStudentFromDb,
};
