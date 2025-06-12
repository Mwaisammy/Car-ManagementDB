import { eq } from "drizzle-orm";
import db from "../Drizzle/db";
import { TIReservation, ReservationTable } from "../Drizzle/schema";

export const createReservationService = async (reservation: TIReservation) => {
  const [inserting] = await db.insert(ReservationTable).values(reservation).returning()

  if(inserting){
    return "Reservation added successfully"

  }
  return null

};

export const getReservationService = async () => {
  const reservations = await db.query.ReservationTable.findMany();
  return reservations;
};

export const getReservationByIdService = async (id: number) => {
  const reservation = await db.query.ReservationTable.findFirst({
    where: eq(ReservationTable.reservationID, id),
  });
  return reservation;
};

export const getReservationsByCustomerIdService = async (customerId: number) => {
  const reservations = await db.query.ReservationTable.findMany({
    where: eq(ReservationTable.customerID, customerId),
  });
  return reservations;
};

export const updateReservationService = async (id: number, reservation: TIReservation) => {
  await db.update(ReservationTable).set(reservation).where(eq(ReservationTable.reservationID, id))
  return "Reservation updated successfully";
};

export const deleteReservationService = async (id: number) => {
  const deleted = await db.delete(ReservationTable).where(eq(ReservationTable.reservationID, id))
  return "Reservation deleted successfully";
};