import express from "express";
 
import { 
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/Users.js";
 
const router = express.Router();
 
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
 
export default router;