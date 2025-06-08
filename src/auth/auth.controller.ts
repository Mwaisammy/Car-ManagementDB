import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import "dotenv/config";
import jwt from 'jsonwebtoken';
import { sendMail } from '../mailer/mailer';
import { createUserService, getUserByEmailService, userLoginService, verifyUserService } from './auth.service';

export const createUserController = async (req: Request, res: Response) => { 
    try {

      const user = req.body;
      const password = user.password;
      const hashedPassword = bcrypt.hashSync(password, 10);
      user.password = hashedPassword;

        // Generate a verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
        user.verificationCode = verificationCode;
        user.isVerified = false; // Set isVerified to false by default
        

      

        const createUser = await createUserService(user);

        if(!createUser) return res.status(400).json({ message: "user not created" });

        try {
        await sendMail(
          user.email,
  "Verify your account", // subject
  `Hello ${user.lastName}, your verification code is: ${user.verificationCode}`, // message
  `<div>
  <h2>Hello ${user.lastName}, your verification code is: <strong>${user.verificationCode}</strong></h2>
  <h2>Enter this code to verify your account.</h2>
  </div>` // html
);
          
        } catch (emailError: any) {
          console.error("Failed to send registration email", emailError)
          
        }
        return res.status(201).json({ message: "user created successfully and verification code sent to email" });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};


export const loginUserController = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    

    // Check if user exists
    const userExist = await userLoginService(user);

    if (!userExist) {
      return res.status(404).json({ message: "user not found" });
    }

    // Compare password using bcrypt
    const userMatch = await bcrypt.compareSync(user.password, userExist.password);

    if (!userMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Prepare JWT payload - mostly user information to enbale genereation of JWT token
    // Note: userID is unique and used as the subject (sub) in the JWT
    const payload = {
      sub: userExist.customerID,
      user_id: userExist.customerID,
      first_name: userExist.firstName,
      last_name: userExist.lastName,
      role: userExist.role, 
      exp: Math.floor(Date.now() / 1000) + 60, // Expires in 1 minute
    };

    //Generate the token using JWT

    const secret = process.env.JWT_SECRET as string;

    if (!secret) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    // Generate JWT token using the payload and secret
    // The payload contains the user information and expiration time
    const token = jwt.sign(payload, secret);

    // Return token and basic user info
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        user_id: userExist.customerID,
        first_name: userExist.firstName,
        last_name: userExist.lastName,
        email: userExist.email
      },
    });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}



export const verifyUserController = async (req: Request, res: Response) => {

  const { email, code } = req.body;


  try {

    const user = await getUserByEmailService(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if(user.verificationCode === code ) {
      await verifyUserService(email)

          //send verification email


      try {
      await sendMail(
        user.email,
        "Account Verification Successful", 
        `Hello ${user.lastName}, your account has been successfully verified.`, // message
        `<div><h2>Hello ${user.lastName}, your account has been successfully verified.</h2>
        <h2>You can now log in and enjoy our services.</h2>
        <h2>Thank you for choosing us!</h2>
        
        </div>` 
      )
      
    } catch (error: any) {
      console.error("Failed to send verification email", error);
      return res.status(500).json({ message: "Failed to send verification email" });
      
    }

    }else {
      return res.status(400).json({ message: "Invalid verification code" });
    }


    
      
    
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
    
  }
 }


