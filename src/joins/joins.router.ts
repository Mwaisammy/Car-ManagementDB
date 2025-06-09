import { Express } from "express";
import {
  fetchCustomerReservations,
  fetchBookingsWithPayments,
  fetchCarsWithLocation,
  fetchCustomerBookingDetails,
} from "./joins.controller";
import { adminRoleAuth, bothRoleAuth } from "../middleware/bearAuth";

const joins = (app: Express) => {
  // GET /joins/reservations
  app.route("/joins/reservations").get(
    bothRoleAuth,
    async (req, res, next) => {
      try {
        await fetchCustomerReservations(req, res);
      } catch (error: any) {
        next(error);
      }
    }
  );

  // GET /joins/bookings-payments
  app.route("/joins/bookings-payments").get(
    adminRoleAuth,
    async (req, res, next) => {
      try {
        await fetchBookingsWithPayments(req, res);
      } catch (error: any) {
        next(error);
      }
    }
  );

  // GET /joins/cars-location
  app.route("/joins/cars-location").get(
    adminRoleAuth,
    async (req, res, next) => {
      try {
        await fetchCarsWithLocation(req, res);
      } catch (error: any) {
        next(error);
      }
    }
  );

  // GET /joins/customer-bookings-cars
  app.route("/joins/customer-bookings-cars").get(
    bothRoleAuth,
    async (req, res, next) => {
      try {
        await fetchCustomerBookingDetails(req, res);
      } catch (error: any) {
        next(error);
      }
    }
  );
};

export default joins;
