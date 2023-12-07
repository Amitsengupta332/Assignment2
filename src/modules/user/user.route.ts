import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

//create user
router.post('/users', UserController.createUser);

// get all user
router.get('/users', UserController.getAllUser);

// get user by id
router.get('/users/:userId', UserController.getSingleUser);

// Update a specific user by ID
router.put('/users/:userId', UserController.updateSingleUser);

// Delete a specific user by ID
router.delete('/users/:userId', UserController.deleteSingleUser);

// add order
router.put('/users/:userId/orders', UserController.addOrder);

//get order
router.get('/users/:userId/orders', UserController.getOrdersData);

// total price
router.get('/users/:userId/orders/total-price', UserController.totalPrice);

export const userRoute = router;
