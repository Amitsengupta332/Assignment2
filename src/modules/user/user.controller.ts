import { Request, Response } from 'express';
import { userService } from './user.services';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const result = await userService.createNewUserIntoDB(userData);
  } catch (err) {
    console.log(err);
  }
};
