import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

//create user
router.post('/create-user', UserController.createUser);

// get all user
router.get('/', UserController.getAllUser);

// get user by id
router.get('/:userId', UserController.getSingleUser);

// Update a specific user by ID
router.put('/:userId', UserController.updateSingleUser);

// Delete a specific user by ID
router.delete('/:userId', UserController.deleteSingleUser);

export const userRoute = router;
