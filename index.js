const express = require("express");
const UserController = require("./controller");

const userRouter = express.Router();

userRouter.post(
  "/",
  UserController.validateCreateUser,
  UserController.createUser
);

userRouter.get("/", UserController.listContacts);

userRouter.put(
  "/:contactId",
  UserController.validateUpdateUser,
  UserController.updateUser
);

userRouter.delete("/:contactId", UserController.deleteUser);

console.log("userRouter", userRouter);

module.exports = userRouter;
// const express = require('express');
// const morgan = require('morgan');

// const app = express();

// app.use(morgan('combined'));

// app.get('/', function (req, res) {
//   res.send('hello, world!')
// });
