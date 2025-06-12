import db from "../../src/Drizzle/db";
import { MaintenanceTable } from "../../src/Drizzle/schema";
import {createMaintenanceService, deleteMaintenanceService, getMaintenanceByIdService, getMaintenanceService, updateMaintenanceService} from "../../src/maintenance/maintenance.service";

jest.mock('../../src/Drizzle/db', () => ({
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),

  query: {
    MaintenanceTable: {
      findFirst: jest.fn(),
      findMany: jest.fn()
    }
  },
  
 
}));

beforeEach(() => {
    jest.clearAllMocks();
});


describe("Maintenance service", () => {
    describe("createMaintenaceService", () => {
         it('should insert a new maintenance', async () => {
                    const maintenance = {
                        carID: 2,
                        maintenanceDate:'2025-06-09' ,
                        description: "Oil change and tire rotation",
                        cost: "5000"
                    };
                    const insertedMaintenance = { maintenanceID: 1, ...maintenance };
                    (db.insert as jest.Mock).mockReturnValue({
                        values: jest.fn().mockReturnValue({
                            returning: jest.fn().mockResolvedValueOnce([insertedMaintenance])
                        })
                    });
                    const result = await createMaintenanceService(maintenance);
                    expect(db.insert).toHaveBeenCalledWith(MaintenanceTable);
                    expect(result).toEqual("Maintenance added successfully");
                });


                   it("should return null if insertion fails", async () => {
                            const maintenance = {
                                maintenanceID: 1,
                                carID: 2,
                                maintenanceDate:'2025-06-09' ,
                                description: "Oil change and tire rotation",
                                cost: "5000"
                            };
                            (db.insert as jest.Mock).mockReturnValue({
                                values: jest.fn().mockReturnValue({
                                    returning: jest.fn().mockResolvedValueOnce([null])
                                })
                            });
                            const result = await createMaintenanceService(maintenance);
                            expect(result).toBeNull();
                        });
                

    })

      describe("getMaintenanceService", () => {
            it("should return all maintenances", async () => {
                const maintenance = [
                    {
                                maintenanceID: 1,
                                carID: 2,
                                maintenanceDate:'2025-06-09' ,
                                description: "Oil change and tire rotation",
                                cost: "5000"
                    },
                    {
                               maintenanceID: 2,
                                carID: 2,
                                maintenanceDate:'2025-06-09' ,
                                description: "Brake inspection and fluid top-up",
                                cost: "8000"
                    }
                ];
                (db.query.MaintenanceTable.findMany as jest.Mock).mockResolvedValueOnce(maintenance);
                const result = await getMaintenanceService();
                expect(result).toEqual(maintenance);
            });
        
           
        
            
        })


          describe("getMaintenanceByIdService", () => {
                it("should return a maintenace by ID", async () => {
                const maintenance = {
                        maintenanceID: 1,
                        carID: 2,
                        maintenanceDate:'2025-06-09' ,
                        description: "Oil change and tire rotation",
                        cost: "5000"
                    };
            
                (db.query.MaintenanceTable.findFirst as jest.Mock).mockResolvedValueOnce(maintenance);
                const result = await getMaintenanceByIdService(1);
                expect(db.query.MaintenanceTable.findFirst).toHaveBeenCalled();
                expect(result).toEqual(maintenance);
        
            });
            
                    it('should return null if no maintenance is found', async () => {
                        (db.query.MaintenanceTable.findFirst as jest.Mock).mockResolvedValueOnce(null);
                        const result = await getMaintenanceByIdService(9999);
                        expect(result).toBeNull();
                    });
            
        });


         describe("updateReservationByIdService", () => {
                it("should update maintenance and return success message", async () => {
                (db.update as jest.Mock).mockReturnValue({
                    set: jest.fn().mockReturnValue({
                        where: jest.fn().mockResolvedValueOnce(null)
                        
                    }),
                    
                });
                const result = await updateMaintenanceService(1, {
                        maintenanceID: 1,
                        carID: 2,
                        maintenanceDate:'2025-06-09' ,
                        description: "Oil change and tire rotation",
                        cost: "5000"
                });
                expect(db.update).toHaveBeenCalledWith(MaintenanceTable);
                expect(result).toBe("Maintenance updated successfully");
                });
            });
        
        
            describe("deleteMaintenanceService", () => {
                it("should delete a maintenace and return success message", async () => {
                    (db.delete as jest.Mock).mockReturnValue({
                        where: jest.fn().mockResolvedValueOnce(undefined)
                    });
                    const result = await deleteMaintenanceService(1);
                    expect(db.delete).toHaveBeenCalledWith(MaintenanceTable);
                    expect(result).toBe("Maintenance deleted successfully");
                });
            });



})
