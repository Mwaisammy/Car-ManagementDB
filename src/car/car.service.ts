import { eq } from "drizzle-orm";
import db from "../Drizzle/db"
import { CarTable, TICar } from "../Drizzle/schema"



//Create a car in the database
export const createCarService = async (car:TICar) => {

    await db.insert(CarTable).values(car).returning();
    return "Car added successfully";
}


//Get all cars in the database
export const getCarService = async () => {
    const cars = await db.select().from(CarTable);
    return cars;
}

//Get car by id

export const getCarServiceById = async (id:number) => {
    const car = await db.query.CarTable.findFirst({
        where: eq(CarTable.carID, id),
    })

    return car;
}


//Update a car by specific id

export const updateCarService = async(id:number, car: TICar) => {
    await db.update(CarTable).set(car).where(eq(CarTable.carID, id)).returning()
    return "Car updated successfully";
}

export const deleteCarService = async (id:number) => {
    const deletedCar = await db.delete(CarTable).where(eq(CarTable.carID, id)).returning()

    return deletedCar[0]
}