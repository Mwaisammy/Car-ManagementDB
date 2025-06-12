import { eq } from "drizzle-orm";
import db from "../Drizzle/db"
import { CarTable, TICar } from "../Drizzle/schema"



//Create a car in the database
export const createCarService = async (car:TICar) => {

     const [inserted] = await db.insert(CarTable).values(car).returning()

  if(inserted){
    return inserted
  }
  return null
}


//Get all cars in the database
export const getCarService = async () => {
    const cars = await db.query.CarTable.findMany();
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

export const updateCarService = async (carID: number, car: TICar) => {
    await db.update(CarTable)
        .set(car)
        .where(eq(CarTable.carID, carID));
    return "Car updated successfully";
}

//delete car by id
export const deleteCarService = async (carID: number) => {
    await db.delete(CarTable).where(eq(CarTable.carID, carID));
    return "Car deleted successfully";

}





