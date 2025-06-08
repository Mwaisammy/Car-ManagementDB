// src/services/joins.service.ts
import { db } from "../Drizzle/db";
import { eq } from "drizzle-orm";

import {
  CustomerTable,
  ReservationTable,
  CarTable,
  BookingsTable,
  LocationTable,
  PaymentTable,
} from "../Drizzle/schema";

export const getCustomerReservations = () => {
  return db
    .select()
    .from(ReservationTable)
    .innerJoin(CustomerTable, eq(CustomerTable.customerID, ReservationTable.customerID))
    .innerJoin(CarTable, eq(CarTable.carID, ReservationTable.carID));
};

export const getBookingsWithPayments = () => {
  return db
    .select()
    .from(BookingsTable)
    .leftJoin(PaymentTable, eq(BookingsTable.bookingID, PaymentTable.bookingID));
};

export const getCarsWithLocation = () => {
  return db
    .select()
    .from(CarTable)
    .leftJoin(LocationTable, eq(CarTable.locationID, LocationTable.locationID));
};

export const getCustomerBookingWithCarDetails = () => {
  return db
    .select()
    .from(BookingsTable)
    .innerJoin(CustomerTable, eq(BookingsTable.customerID, CustomerTable.customerID))
    .innerJoin(CarTable, eq(BookingsTable.carID, CarTable.carID));
};
