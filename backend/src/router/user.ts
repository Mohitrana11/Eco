import express from "express";
import {
  getAllUsers,
  getUsers,
  login,
  logout,
  register,
} from "../controller/user";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/:id", getUsers);
router.post("/all", getAllUsers);

export default router;
