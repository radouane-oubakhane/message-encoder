import express from "express";
import User from "../models/user.model";
import GetUserDto from "../dtos/get-user";
import {
  vigenereCipherEncryption,
  vigenereCipherDecryption,
} from "../cryptography/vigenere-cipher";
import constants from "../constants";

const usersRouter = express.Router();

// POST /users/register
usersRouter.post("/register", async (request, response) => {
  try {
    const { lastName, firstName, email, password } = request.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response
        .status(400)
        .json({ message: "L'utilisateur déjà existant" });
    }

   
    const newUser = new User({
      lastName,
      firstName,
      email,
      password: vigenereCipherEncryption(password, constants.VIGENERE_KEY),
    });

    
    const savedUser = await newUser.save();

  
    const getUserDto: GetUserDto = {
      _id: savedUser._id.toString(),
      lastName: savedUser.lastName,
      firstName: savedUser.firstName,
      email: savedUser.email,
    };

    console.log("User saved: ", getUserDto);


    return response.status(201).json(getUserDto);
  } catch (error) {
    console.log("Error in POST /users/register: ", error);
    return response.status(500).json({ error: error });
  }
});

// POST /users/login

usersRouter.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return response
        .status(400)
        .json({ message: "L'utilisateur n'existe pas" });
    }

    if (
      vigenereCipherEncryption(password, constants.VIGENERE_KEY) !==
      existingUser.password
    ) {
      return response
        .status(400)
        .json({ message: "Le mode de passe est incorrect" });
    }

    const getUserDto: GetUserDto = {
      _id: existingUser._id.toString(),
      lastName: existingUser.lastName,
      firstName: existingUser.firstName,
      email: existingUser.email,
    };

    console.log("User logged in: ", getUserDto);

   
    return response.status(200).json(getUserDto);
  } catch (error) {
    console.log("Error in POST /users/login: ", error);
    return response.status(500).json({ error: error });
  }
});

export default usersRouter;
