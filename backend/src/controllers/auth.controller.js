import User from "../models/userSchema.js";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/generateToken.js";
import { setAuthCookies } from "../utils/setAuthCookies.js";
export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    //    validation
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!email.includes("@")) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (!userName.match(/^[a-zA-Z0-9_]+$/)) {
      return res.status(400).json({ message: "Invalid username" });
    }

   

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    } 



    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id);
    setAuthCookies(res, token);
    return res.status(201).json({ message: "User created successfully", user: {
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
    } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!email.includes("@")) {
            return res.status(400).json({ message: "Invalid email" });
        }

      

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        } 

        // check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // compare password
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user._id);
        setAuthCookies(res, token);

        return res.status(200).json({ message: "Login successful", user: {
          _id: user._id,
          userName: user.userName,
          email: user.email,
        } });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


