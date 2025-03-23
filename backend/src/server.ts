import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("send data to me");
  console.log("This is running!");
});

app.listen(PORT, () => {
  console.log(`server running on port http://localhost:${PORT}`);
});
