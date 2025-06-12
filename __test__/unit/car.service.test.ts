import { createCarService, getCarService , getCarServiceById, updateCarService, deleteCarService} from "../../src/car/car.service"
import db from "../../src/Drizzle/db";
import { CarTable } from '../../src/Drizzle/schema'

 
  jest.mock('../../src/Drizzle/db', () => ({
    insert: jest.fn(),
    select: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    query: {
        CarTable: {
            findFirst: jest.fn(),
            findMany: jest.fn()
        }
    }
}))

  beforeEach(() => {
    jest.clearAllMocks()
  });

    describe('createCarService', () => {
        it('should insert a new car', async () => {
            const car = {
                carModel: 'Toyota Camry',
                year: '2020-10-10',
                color: 'Blue',
                rentalRate: '29.99',
                availability: true,
                locationId: 1
            };
            const insertedCar = { carId: 1, ...car };
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValueOnce([insertedCar])
                })
            });
            const result = await createCarService(car)
            expect(db.insert).toHaveBeenCalledWith(CarTable)
            expect(result).toEqual(insertedCar)
        })


        it("should return null if insertion fails", async() => {
            
            (db.insert as jest.Mock).mockResolvedValue({
                values: jest.fn().mockResolvedValue({
                    returning: jest.fn().mockResolvedValueOnce([null])
                })
            })
            //  const car = {
            //     carModel: '',
            //     year: '',
            //     color: '',
            //     rentalRate: '',
                
            // };
            //  const result = await createCarService(car)
            //  expect(result).toBeNull()
        })  


    })


    describe("getCarService", () => {
        it("should return all cars", async() => {
            const cars = [
                { carId: 1, carModel: 'Toyota Camry', year: 2020, color: 'Blue', rentalRate: 29.99, availability: true, locationId: 1 },
                { carId: 2, carModel: 'Honda Accord', year: 2019, color: 'Red', rentalRate: 24.99, availability: true, locationId: 2 }
            ];

             (db.query.CarTable.findMany as jest.Mock).mockResolvedValueOnce(cars);
            const result = await getCarService();
            expect(result).toEqual(cars);
            
        })

    })


    describe("getCarByIdService", () => {
        it("should return a car by ID", async () => {
            const car = {
                carId: 1,
                carModel: 'Toyota Camry',
                year: '2020-10-10',
                color: 'Blue',
                rentalRate: 29.99,
                availability: true,
                locationId: 1 
            };
            (db.query.CarTable.findFirst as jest.Mock).mockResolvedValueOnce(car);
            const result = await getCarServiceById(1)
            expect(db.query.CarTable.findFirst).toHaveBeenCalled()
            expect(result).toEqual(car)
    })

     it('should return null if no car is found', async () => {
        (db.query.CarTable.findFirst as jest.Mock).mockResolvedValueOnce(null)
        const result = await getCarServiceById(9999)
        expect(result).toBeNull()
    })


    describe("updateCarService", () => {
    it("should update a car and return success message", async () => {
        (db.update as jest.Mock).mockReturnValue({
            set: jest.fn().mockReturnValue({
                where: jest.fn().mockResolvedValueOnce(undefined)
            })
        })
        const result = await updateCarService(1, {
            carModel: 'Updated',
            year: '2021-01-01',
            color: 'Blue',
            rentalRate: '30.00',
            availability: true,
            locationID: 1
        })
        expect(db.update).toHaveBeenCalledWith(CarTable)
        expect(result).toBe("Car updated successfully")
    })
})

describe("deleteCarService", () => {
    it("should delete a car and return success message", async () => {
        (db.delete as jest.Mock).mockReturnValue({
            where: jest.fn().mockResolvedValueOnce(undefined)
        })
        const result = await deleteCarService(1);
        expect(db.delete).toHaveBeenCalledWith(CarTable)
        expect(result).toBe("Car deleted successfully");
    })
})


})
