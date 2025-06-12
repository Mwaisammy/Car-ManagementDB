import { createBookingService, deleteBookingService, getBookingByIdService, getBookingService, updateBookingService } from "../../src/booking/booking.service";
import db from "../../src/Drizzle/db";
import { BookingsTable } from "../../src/Drizzle/schema";




jest.mock('../../src/Drizzle/db', () => ({
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),

  query: {
    BookingsTable: {
      findFirst: jest.fn(),
      findMany: jest.fn()
    }
  },
  
 
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe( 'Booking Service', () => {
    describe('createBookingService', () => {
        it('should insert a new booking', async () => {
            const booking = {
                carID: 1,
                customerID: 1,
                rentalStartDate: '2023-01-01',
                rentalEndDate: '2023-01-05',
                totalAmount: '150'
            };
            const insertedBooking = { bookingId: 1, ...booking };
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValueOnce([insertedBooking])
                })
            });
            const result = await createBookingService(booking);
            expect(db.insert).toHaveBeenCalledWith(BookingsTable);
            expect(result).toEqual(insertedBooking);
        });
    
        it("should return null if insertion fails", async () => {
            const booking = {
                carID: 1,
                customerID: 1,
                rentalStartDate: '2023-01-01',
                rentalEndDate: '2023-01-05',
                totalAmount: '150'
            };
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValueOnce([null])
                })
            });
            const result = await createBookingService(booking);
            expect(result).toBeNull();
        });
    
    
    });






    describe("getBookingService", () => {
        it("should return all bookings", async () => {
            const booking = [
                {
                    bookingId: 1,
                    carId: 1,
                    customerId: 1,
                    rentalStartDate: '2023-01-01',
                    rentalEndDate: '2023-01-05',
                    totalAmount: '150'
                },
                {
                    bookingId: 2,
                    carId: 2,
                    customerId: 2,
                    rentalStartDate: '2023-12-01',
                    rentalEndDate: '2023-12-05',
                    totalAmount: '250'
                }
            ];
            (db.query.BookingsTable.findMany as jest.Mock).mockResolvedValueOnce(booking);
            const result = await getBookingService();
            expect(result).toEqual(booking);
        });
    
       
        
        
    });
    
    
    describe("getBookingByIdService", () => {
        it("should return a booking by ID", async () => {
        const booking = {
            bookingId: 1,
            carId: 1,
            customerId: 1,
            rentalStartDate: '2023-01-01',
            rentalEndDate: '2023-01-05',
            totalAmount: '150'
        };
        (db.query.BookingsTable.findFirst as jest.Mock).mockResolvedValueOnce(booking);
        const result = await getBookingByIdService(1);
        expect(db.query.BookingsTable.findFirst).toHaveBeenCalled();
        expect(result).toEqual(booking);

    });
    
            it('should return null if no booking is found', async () => {
                (db.query.BookingsTable.findFirst as jest.Mock).mockResolvedValueOnce(null);
                const result = await getBookingByIdService(9999);
                expect(result).toBeNull();
            });
    
});


    describe("updateBookingByIdService", () => {
        it("should update booking and return success message", async () => {
        (db.update as jest.Mock).mockReturnValue({
            set: jest.fn().mockReturnValue({
                where: jest.fn().mockResolvedValueOnce(null)
                
            }),
            
        });
        const result = await updateBookingService(1, {
            carID: 1,
            customerID: 1,
            rentalStartDate: '2023-01-01',
            rentalEndDate: '2023-01-06',
            totalAmount: '150'
        });
        expect(db.update).toHaveBeenCalledWith(BookingsTable);
        expect(result).toBe("Booking updated successfully");
        });
    });


    describe("deleteBookingService", () => {
        it("should delete a booking and return success message", async () => {
            (db.delete as jest.Mock).mockReturnValue({
                where: jest.fn().mockResolvedValueOnce(undefined)
            });
            const result = await deleteBookingService(1);
            expect(db.delete).toHaveBeenCalledWith(BookingsTable);
            expect(result).toBe("Booking deleted successfully");
        });
    });










})












