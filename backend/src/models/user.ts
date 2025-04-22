import mongoose, { NumberExpression, Schema } from "mongoose";
import validator from "validator";
interface iUser extends Document {
  name: string;
  email: string;
  photo: string;
  role: ["admin", "user"];
  gender: ["male", "female"];
  dob: Date;
  createdAt: string;
  updateAt: string;
  age: number;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    photo: {
      type: String,
      required: [true, "Please provide photo"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please provide your gender"],
    },
    email: {
      type: String,
      unique: [true, "Email already exist"],
      required: [true, "Please provide your email"],
      validate: [validator.isEmail, "wrong Email"],
    },
    dob: {
      type: Date,
      required: [true, "Please provide you Date of Birth"],
    },
  },
  { timestamps: true }
);

userSchema.virtual("age").get(function () {
  const today = new Date();
  const dob = this.dob;
  let age = today.getFullYear() - dob.getFullYear();

  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
});

const User = mongoose.model<iUser>("userdb", userSchema);
export default User;
