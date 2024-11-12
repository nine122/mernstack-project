const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const recipesRoutes = require("./routes/recipes");
const usersRoutes = require("./routes/users");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AuthMiddleware = require("./middleware/AuthMiddleware");

const app = express();

// database
const mongoURL =
  "mongodb+srv://nine122:test1234@mern.snazmzi.mongodb.net/?retryWrites=true&w=majority&appName=Mern";
mongoose.connect(mongoURL).then(() => {
  console.log("connected to db");
  app.listen(process.env.PORT, () => {
    console.log("app is running on localhost:" + process.env.PORT);
  });
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.json({ hello: "world" });
});

app.use("/api/recipes", AuthMiddleware, recipesRoutes);
app.use("/api/users", usersRoutes);
app.get("/set-cookie", (req, res) => {
  res.cookie("name", "AgAg");
  res.cookie("surname", "Mgmg", { httpOnly: true });
  return res.send("cookie is set");
});
app.get("/get-cookie", (req, res) => {
  let cookies = req.cookies;
  return res.json(cookies);
});
