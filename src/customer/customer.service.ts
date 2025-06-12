import { eq, sql } from "drizzle-orm"
import db from "../Drizzle/db"
import { CustomerTable, TICustomer } from "../Drizzle/schema"



// get all customers 
export const getCustomerService = async () => {
    const customers = await db.query.CustomerTable.findMany();
    return customers;
}

// get customer by id
export const getCustomerByIdService = async (id: number) => {
    const customer = await db.query.CustomerTable.findFirst({
        where: eq(CustomerTable.customerID, id)
    })
    return customer;
}
//get customer by email
export const getCustomerByEmailService = async (email: string) => {
    return await db.query.CustomerTable.findFirst({
        where: sql`${CustomerTable.email} = ${email}`
    });
}; 

// update customer by id
export const updateCustomerService = async (id: number, customer: TICustomer) => {
    await db.update(CustomerTable).set(customer).where(eq(CustomerTable.customerID, id))
    return "Customer updated successfully";
}

// delete customer by id
export const deleteCustomerService = async (id: number) => {
    await db.delete(CustomerTable).where(eq(CustomerTable.customerID, id))
    return "Customer deleted successfully";
}