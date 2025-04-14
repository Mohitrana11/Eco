import mongoose from "mongoose";
const dbConnect = () => {
  mongoose
    .connect("mongodb://0.0.0.0:27017/dbTest")
    .then(() => {
      console.log("connected with data base");
    })
    .catch((err) => {
      console.log("connect connect with database due to issue ", err);
    });
};

export { dbConnect };
