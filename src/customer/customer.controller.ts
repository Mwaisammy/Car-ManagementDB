import { Request, Response } from "express";
import { deleteCustomerService, getCustomerByIdService, getCustomerService, updateCustomerService } from "./customer.service";




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
