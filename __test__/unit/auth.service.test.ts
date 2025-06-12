import { createUserService, userLoginService } from "../../src/auth/auth.service"
import db from "../../src/Drizzle/db"
import { TICustomer } from "../../src/Drizzle/schema"


jest.mock('../../src/Drizzle/db', () => ({
    insert: jest.fn(() => ({
        //mock the insert method
        values: jest.fn().mockReturnThis() //mockReturnThis() is used to return the same object
    })),

    query: {
        CustomerTable: {
            findFirst: jest.fn()
        }
    }
}))


describe('Auth service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    })


    describe("createUserService", () => {
        it('should insert a user and return success message', async() => {
            const user = {
                firstName: 'Test',
                lastName: 'user',
                email: 'test@gmail.com',
                password: 'hashed',
                phoneNumber: '1234567890',
                address: '123 Test Street'
            }

            const result = await createUserService(user)
            expect(db.insert).toHaveBeenCalled()
            expect(result).toBe("Customer created successfully")

        })

    })


    describe('userLoginService', () => {
        it('should return user data if found', async () => {
            const mockUser = {
            customerID: 1,
            firstName:'Test',
            lastName: 'user',
            email:'test@gmail.com',
            password: 'hashed',
            phoneNumber: '1234567890',
            address: '123 Test Street'
            };
            (db.query.CustomerTable.findFirst as jest.Mock).mockResolvedValueOnce(mockUser)

        const result  = await userLoginService({email:'test@gmail.com'} as TICustomer)

        expect(db.query.CustomerTable.findFirst).toHaveBeenCalled()
        expect(result).toEqual(mockUser)
        })


        it('should return null if user not found', async() => {
            (db.query.CustomerTable.findFirst as jest.Mock).mockResolvedValueOnce(null)

            const result = await userLoginService({email:"test@gmail.com"} as TICustomer)
            expect(db.query.CustomerTable.findFirst).toHaveBeenCalled()
            expect(result).toBeNull()

             
        })
    })
})







