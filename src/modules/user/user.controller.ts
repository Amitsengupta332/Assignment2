import { Request, Response } from 'express';
import { userService } from './user.services';
import UserSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const zodValidatedUserData = UserSchema.parse(userData);
    const result = await userService.createNewUserIntoDB(zodValidatedUserData);
    res.status(200).json({
      success: true,
      message: 'User  Created Successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUserFromAllDB();
    res.status(200).json({
      success: true,
      message: 'User are retrieved Successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId;
    const result = await userService.getSingleUserFromAllDB(userId);
    res.status(200).json({
      success: true,
      message: 'User is retrieved Successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId;
    const updatedUserData = req.body;
    const result = await userService.updateSingleUserIntoDB(
      userId,
      updatedUserData,
    );
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId;
    const result = await userService.deleteSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
