import express from "express";
import {
  getAllUsers,
  getSingleUser,
  login,
  logout,
  register,
} from "../controller/user";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/:id", getSingleUser);
router.get("/all", getAllUsers);

export default router;
