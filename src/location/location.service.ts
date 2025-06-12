import { eq } from "drizzle-orm";

import { LocationTable, TILocation } from "../Drizzle/schema";
import db from "../Drizzle/db";


// Create Location
export const createLocationService = async (location: TILocation) => {
  const [inserted] = await db.insert(LocationTable).values(location).returning()

  if(inserted){
    return inserted
  }

  return null
};

// Get all Locations
export const getLocationService = async () => {
  const locations = await db.query.LocationTable.findMany()
  return locations;
};

// Get Location by ID
export const getLocationByIdService = async (id: number) => {
  const location = await db.query.LocationTable.findFirst({
    where: eq(LocationTable.locationID, id),
  });
  return location;
};

// Update Location
export const updateLocationService = async (id: number, location: TILocation) => {
    await db.update(LocationTable).set(location).where(eq(LocationTable.locationID, id))
    return "Location updated successfully";
}

// Delete Location
export const deleteLocationService = async (id: number) => {
  const deletedLocation = await db
    .delete(LocationTable)
    .where(eq(LocationTable.locationID, id))
  return "Location deleted successfully";
};