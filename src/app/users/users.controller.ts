import { Request, Response } from 'express';
import { usersService } from './users.services';
import { TUsers } from './users.interface';
import userValidationSchema from './users.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const zodParsedData = userValidationSchema.parse(userData);
    const result = await usersService.createUserIntoDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

const getAllUsersFromDb = async (req: Request, res: Response) => {
  try {
    const result = await usersService.getAllUsersFromDB();

    const filterUserData = result.map((user: TUsers) => {
      return {
        username: user?.username,
        fullName: user?.fullName,
        age: user?.age,
        email: user?.email,
        address: user?.address,
      };
    });

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: filterUserData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

// get single user
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await usersService.getSingleUser(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

// single user information update

const singleUserInformationUpdate = async (req: Request, res: Response) => {
  // const userId = Number(req.params.userId);
  const updatedUserId = req.params.userId;
  try {
    const updatedData = req.body;

    console.log('User id controller: ', updatedData);
    const result = await usersService.singleUserInformationUpdate(
      updatedUserId,
      updatedData,
    );

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

const deleteStudentFromDb = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await usersService.deleteStudentFromDb(id);

    res.status(200).json({
      success: true,
      message: 'User Deleted successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

export const usersController = {
  createUser,
  getAllUsersFromDb,
  getSingleUser,
  singleUserInformationUpdate,
  deleteStudentFromDb,
};
