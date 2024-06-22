import express from "express"
import userController from "../controllers/user.controller.js";
const router = express.Router()

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserByID);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router