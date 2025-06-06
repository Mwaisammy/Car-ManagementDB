import { eq } from "drizzle-orm";

import db from "../Drizzle/db";
import { BookingsTable, TIBooking , CustomerTable} from "../Drizzle/schema";

export const createBookingService = async (booking: TIBooking) => {
  await db.insert(BookingsTable).values(booking).returning();
  return "Booking added successfully";
};

export const getBookingService = async () => {
  const bookings = await db.select().from(BookingsTable);
  return bookings;
};

export const getBookingByIdService = async (id: number) => {
  const booking = await db.query.BookingsTable.findFirst({
    where: eq(BookingsTable.bookingID, id),
  });
  return booking;
};

export const getBookingssByCustomerIdService = async (customerId: number) => {
  const reservations = await db.query.ReservationTable.findMany({
    where: eq(BookingsTable.customerID, customerId),
  });
  return reservations;
};

export const updateBookingService = async (id: number, booking: TIBooking) => {
  await db.update(BookingsTable).set(booking).where(eq(BookingsTable.bookingID, id)).returning();
  return "Booking updated successfully";
};

export const deleteBookingService = async (id: number) => {
  const deleted = await db.delete(BookingsTable).where(eq(BookingsTable.bookingID, id)).returning();
  return deleted[0];
};


// joining BookingsTable with customerTable and carTable

// export const getAllBookingsWithDetails = async () => {
//   return await db
//     .select({
//       bookingID: BookingsTable.bookingID,
//       rentalStartDate: BookingsTable.rentalStartDate,
//       rentalEndDate: BookingsTable.rentalEndDate,
//       totalAmount: BookingsTable.totalAmount,

//       customerFirstName: CustomerTable.firstName,
//       customerLastName: CustomerTable.lastName,
//       customerEmail: CustomerTable.email,

//       carModel: CarTable.carModel,
//       carYear: CarTable.year,
//       rentalRate: CarTable.rentalRate,
//     })
//     .from(BookingsTable)
//     .innerJoin(CustomerTable, eq(BookingsTable.customerID, CustomerTable.customerID))
//     .innerJoin(CarTable, eq(BookingsTable.carID, CarTable.carID));
// };
