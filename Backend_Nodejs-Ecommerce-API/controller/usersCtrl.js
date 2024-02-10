import User from "../model/User.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import expressAsyncHandler from "express-async-handler";
import generateToken from "../utils/generatetoken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

export const registerUserCtrl = expressAsyncHandler(async (req, res) => {
  //check user exits
  const { fullname, email, password } = req.body;

  const userExits = await User.findOne({ email });
  if (userExits) {
    throw new Error("User already exits");
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user

  const user = await User.create({
    fullname,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    status: "success",
    message: "User Registered Successfully",
    data: user,
  });
});

//login users
// POST api/v1/users/login

//expressasunchandler pass error into globalerrhandler file
export const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({ email });
  if (
    userFound &&
    (await bcrypt.compare(password, userFound && userFound.password))
  ) 
  {
    res.json({
      status: "success",
      message: "User Login Sucessfully",
      userFound,
      //here token used bi generated using jwt server after login
      token: generateToken(userFound?._id),
    });
  } else {
    throw new Error("Invalid Login Credencial");
  }
});

//route GET/api/v1/users/profile
///used this controller to explore authorization process
export const getUserProfileCtrl = expressAsyncHandler(async (req, res) => {
  const token = getTokenFromHeader(req);
  //verify token

  const verified = verifyToken(token);

  res.json({
    msg: "Welcome Profile page",
  });
});

//updating shiiping address
export const updateShippingAdressCtrl = expressAsyncHandler(
  async (req, res) => {
    const {
      firstName,
      lastName,
      address,
      city,
      postalCode,
      province,
      country,
      phone,
    } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userAuthId,
      {
        shippingAddress: {
          firstName,
          lastName,
          address,
          city,
          postalCode,
          province,
          country,
          phone,
        },
        hasShippingAddress: true,
      },
      {
        new: true,
      }
    );

    res.json({
      status: "success",
      message: "User shipping address updated successfully",
      user,
    });
  }
);
