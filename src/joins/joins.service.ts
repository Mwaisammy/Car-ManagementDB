// src/services/joins.service.ts
import  db  from "../Drizzle/db";
import { eq } from "drizzle-orm";

import {
  CustomerTable,
  ReservationTable,
  CarTable,
  BookingsTable,
  LocationTable,
  PaymentTable,
} from "../Drizzle/schema";

// 1. Get all reservations joined with customer and car details
// This function retrieves all reservations along with the associated customer and car details. If a reservation does not have a customer or car, it will still be included in the results with null values for those fields.


export const getCustomerReservations = async () => {
    return await db
        .select({
            reservation: ReservationTable,
            customer: CustomerTable,
            car: CarTable,
        })
        .from(ReservationTable)
        .leftJoin(CustomerTable, eq(CustomerTable.customerID, ReservationTable.customerID))
        .leftJoin(CarTable, eq(CarTable.carID, ReservationTable.carID));
};


// 2. Get bookings with optional payment info
// This function retrieves all bookings along with their associated payment details, if available. If a booking does not have a payment, it will still be included in the results with null values for the payment fields.
export const getBookingsWithPayments = async () => {
  try {
    const data = await db
      .select({
        booking: BookingsTable,
        payment: PaymentTable,
      })
      .from(BookingsTable)
      .leftJoin(PaymentTable, eq(BookingsTable.bookingID, PaymentTable.bookingID));
    console.log("Data from getBookingsWithPayments:", data); // Add this
    return data;
  } catch (error) {
    console.error("Error in getBookingsWithPayments:", error);
    throw error;
  }
};

// 3. Get cars with their associated location details
// This function retrieves all cars along with their associated location details, if available.



export const getCarsWithLocation = async () => {
  try {
    const data = await db
      .select({
        car: CarTable,
        location: LocationTable,
      })
      .from(CarTable)
      .leftJoin(LocationTable, eq(CarTable.locationID, LocationTable.locationID));
    console.log("Data from getCarsWithLocation:", data); 
    return data;
  } catch (error) {
    console.error("Error in getCarsWithLocation:", error);
    throw error;
  }
};

// 4. Get customer bookings with car details
// This function retrieves bookings made by customers along with the car details associated with each booking.

export const getCustomerBookingWithCarDetails = async () => {
  try {
    const data = await db
      .select({
        booking: BookingsTable,
        customer: CustomerTable,
        car: CarTable,
      })
      .from(BookingsTable)
      .innerJoin(CustomerTable, eq(BookingsTable.customerID, CustomerTable.customerID))
      .innerJoin(CarTable, eq(BookingsTable.carID, CarTable.carID));
    console.log("Data from getCustomerBookingWithCarDetails:", data);
    return data;
  } catch (error) {
    console.error("Error in getCustomerBookingWithCarDetails:", error);
    throw error;
  }
};