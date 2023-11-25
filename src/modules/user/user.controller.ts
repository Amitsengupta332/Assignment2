import { Request, Response } from 'express';
import { userService } from './user.services';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const result = await userService.createNewUserIntoDB(userData);
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
    const { studentId } = req.params;
    const result = await userService.getSingleUserFromAllDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved Successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { updatedUserData } = req.body;
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
    const { userId } = req.params;
    const result = await userService.deleteSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
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

export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
