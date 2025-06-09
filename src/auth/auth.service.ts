import { eq, sql } from "drizzle-orm"
import db from "../Drizzle/db"
import { CustomerTable, TICustomer } from "../Drizzle/schema"



export const createUserService = async(customer: TICustomer) =>{
    
    await db.insert(CustomerTable).values(customer)
    return "Customer created successfully"
} 



//get user by email
export const verifyUserService = async(email: string) => {
    await db.update(CustomerTable)
    .set({isVerified: true, verificationCode: null})
    .where(sql`${CustomerTable.email} = ${email}`)
    .execute();
    return "User verified successfully"

}
    

export const getUserByEmailService = async(email: string) => {
    return await db.query.CustomerTable.findFirst({
        where: sql`${CustomerTable.email} = ${email}`,
    
    })
}



//Login a customer

export const userLoginService = async(customer:TICustomer) => {
    //email and password are required for login
    const { email } = customer

    return await db.query.CustomerTable.findFirst({
        columns: {
            customerID: true,
            firstName: true,
            lastName: true,
            email: true,
            password: true,
            role: true


        }, where: sql`${CustomerTable.email} = ${email}`
    })

     
}

 





















//  import { sql } from "drizzle-orm";
// import { eq } from "drizzle-orm";
// import { CustomerTable, TICustomer, TSCustomer } from "../Drizzle/schema";
// import db from "../Drizzle/db";


// //register a customer
// export const createCustomerService = async (user: TICustomer) => {
//     await db.insert(CustomerTable).values(user);
//     return "Customer added successfully";
// }

// export const customerLoginService = async (customer: TSCustomer) => {
//     const { email } = customer; //extracts email property from customer

//     return await db.query.CustomerTable.findFirst({
//         columns: {
//             customerID: true,
//             firstName: true,
//             lastName: true,
//             email: true,
//             password: true,
//             role: true
//         }, where: sql`${CustomerTable.email} = ${email}`
//     })
// }

// // get all customers 
// export const getCustomerService = async () => {
//     const customers = await db.query.CustomerTable.findMany();
//     return customers;
// }

// // get customer by id
// export const getCustomerByIdService = async (id: number) => {
//     const customer = await db.query.CustomerTable.findFirst({
//         where: eq(CustomerTable.customerID, id)
//     })
//     return customer;
// }

// // update customer by id
// export const updateCustomerService = async (id: number, customer: TICustomer) => {
//     await db.update(CustomerTable).set(customer).where(eq(CustomerTable.customerID, id)).returning();
//     return "Customer updated successfully";
// }

// // delete customer by id
// export const deleteCustomerService = async (id: number) => {
//     await db.delete(CustomerTable).where(eq(CustomerTable.customerID, id)).returning();
//     return "Customer deleted successfully";
// }


