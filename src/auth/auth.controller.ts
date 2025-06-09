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
        return res.status(201).json({ message: "User created successfully and verification code sent to email" });

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
  exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // Expires in 24 hours (1 day)
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



// --- 3. Verify User Account ---
export const verifyUserController = async (req: Request, res: Response) => {
    const { email, verificationCode } = req.body; 


    if (!email || !verificationCode) {
        return res.status(400).json({ message: "Email and verification code are required to verify your account." });
    }

    try {
        
        const user = await getUserByEmailService(email);

        // If no user found with the given email
        if (!user) {
            return res.status(404).json({ message: "User not found with the provided email address." });
        }

        // Check if the account is already verified to prevent redundant operations
        if (user.isVerified) {
            return res.status(400).json({ message: "Account is already verified." });
        }

        
   

        if (String(user.verificationCode).trim() === String(verificationCode).trim()) {
           
            await verifyUserService(email);

            try {
                await sendMail(
                    user.email,
                    "Account Verification Successful - Welcome!",
                    `Hello ${user.lastName},\n\nYour account has been successfully verified!\n\nYou can now log in and enjoy our services.\n\nThank you for choosing us!`, 
                    `<div>
                        <h2>Hello ${user.lastName},</h2>
                        <p>Your account has been successfully verified!</p>
                        <p>You can now log in and enjoy our services.</p>
                        <p>Thank you for choosing us!</p>
                    </div>` 
                );
               
            } catch (emailError: any) {
                
                
                return res.status(200).json({
                    message: "Account verified successfully, but there was an issue sending the confirmation email.",
                    emailError: emailError.message // Optionally include error details
                });
            }

            // Respond with success message
            return res.status(200).json({ message: "Account verified successfully!" });

        } else {
            
           
            return res.status(400).json({ message: "Invalid verification code provided." });
        }

    } catch (error: any) {
        console.error("Error in verifyUserController:", error);
        return res.status(500).json({ error: error.message || "Internal server error during account verification." });
    }
};


