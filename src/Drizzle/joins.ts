// import { db, eq } from "";
import db from "./db";
import { BookingsTable, CustomerTable, CarTable } from "./schema";

export const getAllBookingsWithDetails = async () => {
  return await db
    .select({
      bookingId: BookingsTable.bookingID,
      customerName: CustomerTable.firstName,
      carModel: CarTable.carModel,
      totalAmount: BookingsTable.totalAmount,
    })
    .from(BookingsTable)
    .innerJoin(CustomerTable, BookingsTable.customerID.eq(CustomerTable.customerID))
    .innerJoin(CarTable, BookingsTable.carID.eq(CarTable.carID));
};
