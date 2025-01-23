import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const helloAPI = async (req, res) => {
  res.send('This is the Holiday Calendar API service.');
};


const registerUser = async (req, res) => {
  const { firstName, lastName, password, email, contact, dob, gender } = req.body;

  try {
      // List of required fields
      const requiredFields = ["firstName", "lastName", "password", "email", "contact", "dob", "gender"];
      const missingFields = requiredFields.filter(field => !req.body[field]);
      if (missingFields.length > 0) {
        return res.status(400).json({ 
          error: "All fields are required.", 
          missingFields 
        });
      }


      // Check Existing  Email
      let user = await userModel.findOne({ email });
      if (user) return res.status(400).json("User already exist");


    const newUser = new userModel({firstName, lastName, password, email, contact, dob, gender});
    const response = await newUser.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {

    if (!email || !password )
      return res.status(400).json("Enter Username and Password");


    const user = await userModel.findOne({ email });
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json("Invalid credentials");
    }
  
    // Generate access token
    const accessToken = jwt.sign(
      { email: user.email},
      "jwt-access-token-secret-key",
      { expiresIn: "50m" }
    );
  
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
  
};



export {
  helloAPI,
  registerUser,
  loginUser,
};
