import db from "../../src/Drizzle/db";
import { InsuranceTable } from "../../src/Drizzle/schema";
import { createInsuranceService, deleteInsuranceService, getInsuranceByIdService, getInsuranceService, updateInsuranceService } from "../../src/insurance/insurance.service"


jest.mock('../../src/Drizzle/db', () => ({
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),

    query: {
        InsuranceTable: {
            findFirst: jest.fn(),
            findMany: jest.fn()
        }
    }

}))




beforeEach(() => {
    jest.clearAllMocks()
})


describe('Insurance service', () => {

    describe('createInsuranceService', () => {
        it('should insert a new insurance', async() => {
            const insurance = {
                carID: 1,
                insuranceProvider: "Britam",
                policyNumber: "AERT234",
                startDate: '2023-01-01',
                endDate: '2023-01-05'
        };

        const insertedInsurance = {insuranceID: 1, ...insurance};
        (db.insert as jest.Mock).mockReturnValue({
            values: jest.fn().mockReturnValue({
                returning: jest.fn().mockResolvedValueOnce([insertedInsurance])
            })

        });

        const result = await createInsuranceService(insurance)
        expect(db.insert).toHaveBeenCalledWith(InsuranceTable)
        expect(result).toEqual("Insurance added successfully")



        })


        it("should return null if insertion fails", async() => {

            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockReturnValueOnce([null]) 
                })
            })


        
        })
    })



      describe("getInsuranceService", () => {
        it("should return all insurance", async () => {
            const insurance = [
                {
                carID: 1,
                insuranceProvider: "Britam",
                policyNumber: "AERT234",
                startDate: '2023-01-01',
                endDate: '2023-01-05'
                },
                {
                carID: 2,
                insuranceProvider: "I&M Insurance",
                policyNumber: "AERT534",
                startDate: '2023-01-03',
                endDate: '2023-01-07'
                }
            ];
            (db.query.InsuranceTable.findMany as jest.Mock).mockResolvedValueOnce(insurance);
            const result = await getInsuranceService();
            expect(result).toEqual(insurance);
        });



    describe("getInsuranceByIdService", () => {
    it("should return a insurance by ID", async () => {
       const insurance = {
                carID: 1,
                insuranceProvider: "Britam",
                policyNumber: "AERT234",
                startDate: '2023-01-01',
                endDate: '2023-01-05'
        };
        (db.query.InsuranceTable.findFirst as jest.Mock).mockResolvedValueOnce(insurance);
        const result = await getInsuranceByIdService(1);
        expect(db.query.InsuranceTable.findFirst).toHaveBeenCalled();
        expect(result).toEqual(insurance);
    });

    it('should return null if no insurance is found', async () => {
        (db.query.InsuranceTable.findFirst as jest.Mock).mockResolvedValueOnce(null);
        const result = await getInsuranceByIdService(9999);
        expect(result).toBeNull();
    });

    });
    
       


    describe("updateInsuranceServiceById", () => {
    it("should update booking and return success message", async () => {
        (db.update as jest.Mock).mockReturnValue({
            set: jest.fn().mockReturnValue({
                where: jest.fn().mockResolvedValueOnce(null)
                
            }),
            
        });
        const result = await updateInsuranceService(1, {
                carID: 1,
                insuranceProvider: "Britam",
                policyNumber: "AERT234",
                startDate: '2023-01-01',
                endDate: '2023-01-05'
        });
        expect(db.update).toHaveBeenCalledWith(InsuranceTable);
        expect(result).toBe("Insurance updated successfully");
    });
});


describe("deleteInsuranceService", () => {
    it("should delete an insurance and return success message", async () => {
        (db.delete as jest.Mock).mockReturnValue({
            where: jest.fn().mockResolvedValueOnce(undefined)
        });
        const result = await deleteInsuranceService(1);
        expect(db.delete).toHaveBeenCalledWith(InsuranceTable);
        expect(result).toBe("Insurance deleted successfully");
    });
});

    });




  







})



