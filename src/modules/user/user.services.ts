import { userModel } from '../user.model';
import { User } from './user.interface';

//create user
const createNewUserIntoDB = async (userData: User) => {
  const result = await userModel.create(userData);
  return result;
};

//get all user
const getAllUserFromAllDB = async () => {
  const result = await userModel.find();
  return result;
};

// get single user
const getSingleUserFromAllDB = async (id: string) => {
  const result = await userModel.findOne({ id });
  return result;
};

//update user data

const updateSingleUserIntoDB = async (id: string, updatedUserData: User) => {
  const result = await userModel.findOneAndUpdate({ id }, updatedUserData, {
    new: true,
  });
  return result;
};

// Delete user data
const deleteSingleUserFromDB = async (id: string) => {
  const result = await userModel.findOneAndDelete({ id });
  return result;
};

export const userService = {
  createNewUserIntoDB,
  getAllUserFromAllDB,
  getSingleUserFromAllDB,
  updateSingleUserIntoDB,
  deleteSingleUserFromDB,
};
