import bcrypt from 'bcryptjs';
import { createCustomerService, customerLoginService, deleteCustomerService, getCustomerByIdService, getCustomerService, updateCustomerService } from './auth.service';
import { Request, Response } from 'express';
import "dotenv/config";
import jwt from 'jsonwebtoken';
import { sendMail } from '../mailer/mailer';

export const createCustomerController = async (req: Request, res: Response) => { 
    try {

      const customer = req.body;
      const password = customer.password;
      const hashedPassword = bcrypt.hashSync(password, 10);
      customer.password = hashedPassword;

        // Generate a verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
        customer.verificationCode = verificationCode;
        customer.isVerified = false; // Set isVerified to false by default
        

      

        const createUser = await createCustomerService(customer);

        if(!createUser) return res.status(400).json({ message: "Customer not created" });

        try {
          await sendMail(
            customer.email,
            "Verify your account",
            `Hello ${customer.lastName}, your verification code is: ${customer.verificationCode}`,

            `<div>
            <h2>
            Hello ${customer.lastName}, your verification code is: <strong>${customer.verificationCode}</strong>
            </h2>
            </div>`

          )
          
        } catch (emailError: any) {
          console.error("Failed to send registration email", emailError)
          
        }
        return res.status(201).json({ message: "Customer created successfully and verification code sent to email" });

    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};


export const loginCustomerController = async (req: Request, res: Response) => {
  try {
    const customer = req.body;

    // Check if customer exists
    const customerExist = await customerLoginService(customer);

    if (!customerExist) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Compare password using bcrypt
    const customerMatch = await bcrypt.compareSync(customer.password, customerExist.password);

    if (!customerMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Prepare JWT payload - mostly user information to enbale genereation of JWT token
    // Note: customerID is unique and used as the subject (sub) in the JWT
    const payload = {
      sub: customerExist.customerID,
      customer_id: customerExist.customerID,
      first_name: customerExist.firstName,
      last_name: customerExist.lastName,
      role: customerExist.role, 
      exp: Math.floor(Date.now() / 1000) + 60, // Expires in 1 minute
    };

    //Generate the token using JWT

    const secret = process.env.JWT_SECRET as string;

    if (!secret) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    // Generate JWT token using the payload and secret
    // The payload contains the customer information and expiration time
    const token = jwt.sign(payload, secret);

    // Return token and basic customer info
    return res.status(200).json({
      message: "Login successful",
      token,
      customer: {
        customer_id: customerExist.customerID,
        first_name: customerExist.firstName,
        last_name: customerExist.lastName,
        email: customerExist.email
      },
    });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export const getAllCustomersController = async (req: Request, res: Response) => {
  try {
    const customers = await getCustomerService();
    return res.status(200).json(customers);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export const getCustomerByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id); 
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const customer = await getCustomerByIdService(id);

    if (!customer) return res.status(404).json({ message: "Customer not found" });


    return res.status(200).json({ data: customer });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


export const updateCustomerController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const customerData = req.body;

    const exixtingCustomer = await getCustomerByIdService(id);
    if (!exixtingCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }


    const updatedCustomer = await updateCustomerService(id, customerData);
     if (!updatedCustomer) {
            return res.status(400).json({ message: "Customer not updated" });
        }
    return res.status(200).json({ message: "Customer updated successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteCustomerController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const existingCustomer = await getCustomerByIdService(id);
    if(!existingCustomer){
      return res.status(404).json({ message: "Customer not found" });
    }

    const deletedCustomer = await deleteCustomerService(id);

    if(!deletedCustomer){
      return res.status(400).json({ message: "Customer not deleted" })
    }


    return res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}


