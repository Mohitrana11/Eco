import mongoose, { NumberExpression, Schema } from "mongoose";

interface iUser extends Document {
  _id: string;
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
    _id: {
      type: String,
      required: [true, "Please enter Id"],
    },
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    photo: {
      type: String,
      required: [true, "Please provide phot"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["mail", "female"],
      required: [true, "Please provide your gender"],
    },
    email: {
      type: String,
      unique: [true, "Email already exist"],
      required: [true, "Please provide your email"],
      //   validate:[validetor.isEmail(),'wrong Email']
    },
    dob: {
      type: Date,
      required: [true, "Please enter you Date of Birth"],
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
