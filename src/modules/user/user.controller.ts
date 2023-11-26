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

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

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

const addOrder = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId;
    const user = await userService.getSingleUserFromAllDB(userId);
    const orderInfo = req.body;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    const result = await userService.addOrderIntoDB(userId, orderInfo);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (err) {
    console.log(err);
  }
};

// get the order
const getOrdersData = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId;
    const user = await userService.getSingleUserFromAllDB(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    const { orders } = user.toObject();

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      data: {
        orders,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      err,
    });
  }
};

const totalPrice = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId;
    const user = await userService.getSingleUserFromAllDB(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    if (user?.orders !== undefined && user?.orders.length > 0) {
      let sum = 0;
      user?.orders.forEach((order) => {
        if (order.price !== undefined && order.quantity !== undefined) {
          sum += order.price * order.quantity;
        }
      });

      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: { sum },
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      err,
    });
  }
};

export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  addOrder,
  getOrdersData,
  totalPrice,
};
