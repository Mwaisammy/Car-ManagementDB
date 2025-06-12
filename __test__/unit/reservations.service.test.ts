import db from "../../src/Drizzle/db";
import { ReservationTable } from "../../src/Drizzle/schema";
import {createReservationService, deleteReservationService, getReservationByIdService, getReservationService, updateReservationService} from "../../src/reservation/reservation.service"

jest.mock('../../src/Drizzle/db', () => ({
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),

  query: {
    ReservationTable: {
      findFirst: jest.fn(),
      findMany: jest.fn()
    }
  },
  
 
}));

beforeEach(() => {
    jest.clearAllMocks();
});


describe('Reservations service', () => {
    describe('createReservationService', () => {
         it('should insert a new reservation', async () => {
            const reservation = {
                customerID: 3,
                carID: 4,
                reservationDate: '2025-06-09',
                pickupDate: '2025-06-20',
                returnDate: '2025-06-14'
            };
            const insertedReservation = { reservationID: 1, ...reservation };
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValueOnce([insertedReservation])
                })
            });
            const result = await createReservationService(reservation);
            expect(db.insert).toHaveBeenCalledWith(ReservationTable);
            expect(result).toEqual("Reservation added successfully");
        });

         it("should return null if insertion fails", async () => {
            const reservation = {
                reservationID: 1,
                customerID: 3,
                carID: 4,
                reservationDate: '2025-06-09',
                pickupDate: '2025-06-20',
                returnDate: '2025-06-14'
            };
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValueOnce([null])
                })
            });
            const result = await createReservationService(reservation);
            expect(result).toBeNull();
        });

    })

    
        describe("getReservationService", () => {
            it("should return all reservations", async () => {
                const reservation = [
                    {
                        reservationID: 1,
                        customerID: 3,
                        carID: 4,
                        reservationDate: '2025-06-09',
                        pickupDate: '2025-06-20',
                        returnDate: '2025-06-14'
                    },
                    {
                        reservationID: 2,
                        customerID: 3,
                        carID: 4,
                        reservationDate: '2025-07-09',
                        pickupDate: '2025-07-20',
                        returnDate: '2025-07-14'
                    }
                ];
                (db.query.ReservationTable.findMany as jest.Mock).mockResolvedValueOnce(reservation);
                const result = await getReservationService();
                expect(result).toEqual(reservation);
            });
        
           
        
            
        })


            
    describe("getReservationByIdService", () => {
        it("should return a reservation by ID", async () => {
       const reservation = {
                reservationID: 1,
                customerID: 3,
                carID: 4,
                reservationDate: '2025-06-09',
                pickupDate: '2025-06-20',
                returnDate: '2025-06-14'
            };
        (db.query.ReservationTable.findFirst as jest.Mock).mockResolvedValueOnce(reservation);
        const result = await getReservationByIdService(1);
        expect(db.query.ReservationTable.findFirst).toHaveBeenCalled();
        expect(result).toEqual(reservation);

    });
    
            it('should return null if no reservation is found', async () => {
                (db.query.ReservationTable.findFirst as jest.Mock).mockResolvedValueOnce(null);
                const result = await getReservationByIdService(9999);
                expect(result).toBeNull();
            });
    
});


     describe("updateReservationByIdService", () => {
        it("should update reservation and return success message", async () => {
        (db.update as jest.Mock).mockReturnValue({
            set: jest.fn().mockReturnValue({
                where: jest.fn().mockResolvedValueOnce(null)
                
            }),
            
        });
        const result = await updateReservationService(1, {
                reservationID: 1,
                customerID: 3,
                carID: 4,
                reservationDate: '2025-06-09',
                pickupDate: '2025-06-20',
                returnDate: '2025-06-14'
        });
        expect(db.update).toHaveBeenCalledWith(ReservationTable);
        expect(result).toBe("Reservation updated successfully");
        });
    });


    describe("deleteReservationService", () => {
        it("should delete a reservation and return success message", async () => {
            (db.delete as jest.Mock).mockReturnValue({
                where: jest.fn().mockResolvedValueOnce(undefined)
            });
            const result = await deleteReservationService(1);
            expect(db.delete).toHaveBeenCalledWith(ReservationTable);
            expect(result).toBe("Reservation deleted successfully");
        });
    });



})