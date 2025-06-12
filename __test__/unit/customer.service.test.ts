import db from "../../src/Drizzle/db";
import { CustomerTable } from "../../src/Drizzle/schema";
import { deleteCustomerService, getCustomerByIdService, getCustomerService, updateCustomerService } from "../../src/customer/customer.service"


jest.mock("../../src/Drizzle/db", () => ({
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),

  query: {
    CustomerTable: {
      findFirst: jest.fn(),
      findMany: jest.fn()
    }
  }
}))



beforeEach(() => {
    jest.clearAllMocks();
});


describe('Customer service', () => {
    describe('getCustomerService', () => {
        it("should return all customers", async () => {

            const customer = [{
                customerID: 1,
                firstName: "Sam",
                lastName: "Mwai",
                email: "mwaisam@gmail.com",
                phoneNumber: "2345678889",
                address: "Ark Valley, London",
                password: "dev"
            },
            {
                customerID: 2,
                firstName: "John",
                lastName: "Mwangi",
                email: "mwangijohn@gmail.com",
                phoneNumber: "2345678889",
                address: "Ark Valley, London",
                password: "dev"
            
            }
        
        ];

        (db.query.CustomerTable.findMany as jest.Mock).mockResolvedValueOnce(customer);
        const result = await getCustomerService();
        expect(result).toEqual(customer);

        })
    })


    describe("getCustomerByIdService", () => {
        it("should return a customer by ID", async () => {
            const customer = {
                customerID: 1,
                firstName: "Sam",
                lastName: "Mwai",
                email: "mwaisam@gmail.com",
                phoneNumber: "2345678889",
                address: "Ark Valley, London",
                password: "dev"
            };
            (db.query.CustomerTable.findFirst as jest.Mock).mockResolvedValueOnce(customer);
            const result = await getCustomerByIdService(1);
            expect(db.query.CustomerTable.findFirst).toHaveBeenCalled();
            expect(result).toEqual(customer);
        });
    
        it('should return null if no customer is found', async () => {
            (db.query.CustomerTable.findFirst as jest.Mock).mockResolvedValueOnce(null);
            const result = await getCustomerByIdService(9999);
            expect(result).toBeNull();
        });
    
    });


    describe("updateCustomerByIdService", () => {
        it("should update customer and return success message", async () => {
            (db.update as jest.Mock).mockReturnValue({
                set: jest.fn().mockReturnValue({
                    where: jest.fn().mockResolvedValueOnce(null)
                    
                }),
                
            });
            const result = await updateCustomerService(1, {
                customerID: 1,
                firstName: "Sam",
                lastName: "Mwai",
                email: "mwaisam@gmail.com",
                phoneNumber: "2345678889",
                address: "Ark Valley, London",
                password: "dev"
            });
            expect(db.update).toHaveBeenCalledWith(CustomerTable);
            expect(result).toBe("Customer updated successfully");
        });
    });

    describe("deleteCustomerService", () => {
        it("should delete a customer and return success message", async () => {
            (db.delete as jest.Mock).mockReturnValue({
                where: jest.fn().mockResolvedValueOnce(undefined)
            });
            const result = await deleteCustomerService(1);
            expect(db.delete).toHaveBeenCalledWith(CustomerTable);
            expect(result).toBe("Customer deleted successfully");
        });
    });


})

