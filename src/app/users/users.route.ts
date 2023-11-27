import express from 'express';
import { usersController } from './users.controller';

const router = express.Router();

router.post('/', usersController.createUser);
router.get('/', usersController.getAllUsersFromDb);
router.get('/:userId', usersController.getSingleUser);
router.put('/:userId', usersController.singleUserInformationUpdate);
router.delete('/:userId', usersController.deleteStudentFromDb);

export const userRoute = router;
