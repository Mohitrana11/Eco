import mongoose, { Document, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  photo: string;
  role: "admin" | "user";
  gender: "male" | "female";
  dob: Date;
  createdAt: Date;
  updatedAt: Date;
  age: number;
  compareHash(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    photo: {
      type: String,
      required: [true, "Please provide photo"],
      // validate: [validator.isURL, "Invalid URL"],
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
      unique: [true, "Email already exists"],
      required: [true, "Please provide your email"],
      validate: [validator.isEmail, "Invalid Email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    dob: {
      type: Date,
      required: [true, "Please provide your Date of Birth"],
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

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.compareHash = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>("User ", userSchema);
export default User;
