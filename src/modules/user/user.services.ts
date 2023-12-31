import { userModel } from '../user.model';
import { TOrders, TUser } from './user.interface';

//create user
const createNewUserIntoDB = async (userData: TUser) => {
  const result = await userModel.create(userData);
  return result;
};

//get all user
const getAllUserFromAllDB = async () => {
  const result = await userModel.aggregate([]).project({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  return result;
};

// get single user
const getSingleUserFromAllDB = async (id: number) => {
  const result = await userModel.findOne({ userId: id });
  return result;
};

//update user data

const updateSingleUserIntoDB = async (
  id: number,
  updatedUserData: Partial<TUser>,
) => {
  const result = await userModel
    .findOneAndUpdate(
      { userId: id },
      { $set: updatedUserData },
      {
        new: true,
      },
    )
    .select({ password: 0 });
  return result;
};

// Delete user data
const deleteSingleUserFromDB = async (id: number) => {
  const result = await userModel.findOneAndDelete({ userId: id });
  return result;
};

// add order in db
const addOrderIntoDB = async (id: number, orderInfo: TOrders) => {
  const result = await userModel.findOneAndUpdate(
    { userId: id },
    { $push: { orders: orderInfo } },
    { upsert: true, new: true },
  );
  return result;
};

export const userService = {
  createNewUserIntoDB,
  getAllUserFromAllDB,
  getSingleUserFromAllDB,
  updateSingleUserIntoDB,
  deleteSingleUserFromDB,
  addOrderIntoDB,
};
