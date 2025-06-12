import db from "../../src/Drizzle/db";
import { LocationTable } from "../../src/Drizzle/schema";
import { createLocationService, deleteLocationService, getLocationByIdService, getLocationService, updateLocationService } from "../../src/location/location.service"


jest.mock('../../src/Drizzle/db', () => ({
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),

    query: {
        LocationTable: {
        findFirst: jest.fn(),
        findMany: jest.fn()
        }
    },
}))


beforeEach(() => {
    jest.clearAllMocks();
});


describe('Location service', () => {
    describe('createLocationService', () => {

        it('should insert a new location', async() => {
            const location = {
                locationName: "Nairobi",
                address: "Moi Avenue",
                contactNumber: "27834596"
            };
            const insertedLocation = { locationID: 1, ...location };

             (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValueOnce([insertedLocation])
                })
            });
            const result = await createLocationService(location);
            expect(db.insert).toHaveBeenCalledWith(LocationTable);
             expect(result).toEqual(insertedLocation);

        })
         it("should return null if insertion fails", async () => {
            const location = {
                locationID: 1,
                locationName: "Nairobi",
                address: "Moi Avenue",
                contactNumber: "27834596"
            };
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnValue({
                    returning: jest.fn().mockResolvedValueOnce([null])
                })
            });
            const result = await createLocationService(location);
            expect(result).toBeNull();
        });
    })


     describe("getBookingService", () => {
            it("should return all bookings", async () => {
                const location = [
                  {
                locationID: 1,
                locationName: "Nairobi",
                address: "Moi Avenue",
                contactNumber: "27834596"
                 },
                {
                locationID: 2,
                locationName: "Meru",
                address: "Nchuri Ncheke Road",
                contactNumber: "98765432"
                 }
                ];
                (db.query.LocationTable.findMany as jest.Mock).mockResolvedValueOnce(location);
                const result = await getLocationService();
                expect(result).toEqual(location);
            })

     })

      describe("getLocationByIdService", () => {
             it("should return a location by ID", async () => {
             const location = {
                 
                locationID: 1,
                locationName: "Nairobi",
                address: "Moi Avenue",
                contactNumber: "27834596"
                 
             };
             (db.query.LocationTable.findFirst as jest.Mock).mockResolvedValueOnce(location);
             const result = await getLocationByIdService(1);
             expect(db.query.LocationTable.findFirst).toHaveBeenCalled();
             expect(result).toEqual(location);
         })

           it('should return null if no location is found', async () => {
                (db.query.LocationTable.findFirst as jest.Mock).mockResolvedValueOnce(null);
                const result = await getLocationByIdService(9999);
                expect(result).toBeNull();
             })

        })

        describe("updateLocationByIdService", () => {
            it("should update location and return success message", async () => {
                (db.update as jest.Mock).mockReturnValue({
                    set: jest.fn().mockReturnValue({
                        where: jest.fn().mockResolvedValueOnce(null)
                        
                    }),
                    
                });
                const result = await updateLocationService(1, {
                    locationID: 1,
                    locationName: "Nairobi",
                    address: "Moi Avenue",
                    contactNumber: "27834596"
                });
                expect(db.update).toHaveBeenCalledWith(LocationTable);
                expect(result).toBe("Location updated successfully");
            });
        });


        describe("deleteLocationService", () => {
            it("should delete a location and return success message", async () => {
                (db.delete as jest.Mock).mockReturnValue({
                    where: jest.fn().mockResolvedValueOnce(undefined)
                });
                const result = await deleteLocationService(1);
                expect(db.delete).toHaveBeenCalledWith(LocationTable);
                expect(result).toBe("Location deleted successfully");
            });
        });



     


    



})
