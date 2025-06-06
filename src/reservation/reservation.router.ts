import { Express } from "express";
import { createReservationController,getReservationController,getReservationByIdController,getReservationsByCustomerIdController,updateReservationController,deleteReservationController,} from "./reservation.controller";
import { adminRoleAuth, bothRoleAuth } from "../middleware/bearAuth";


const reservation = (app: Express) => {
  app.route("/reservation").post(
    bothRoleAuth,
    
    async (req, res, next) => {
      try {
        await createReservationController(req, res);
      } catch (error: any) {
        next(error);
      }
    }
  );

  app.route("/reservations").get(
    adminRoleAuth,
    
    async (req, res, next) => {
      try {
        await getReservationController(req, res);
      } catch (error: any) {
        next(error);
      }
    }
  );

 
  app.route("/reservations/customer/:customerID").get(
    bothRoleAuth,
    
    async (req, res, next) => {
      try {
        await getReservationsByCustomerIdController(req, res);
      } catch (error: any) {
        next(error);
      }
    }
  );

  app.route("/reservation/:id").get(
   bothRoleAuth,
    async (req, res, next) => {
      try {
        await getReservationByIdController(req, res);
      } catch (error: any) {
        next(error);
      }
    }
  );

  app.route("/reservation/:id").put(
    bothRoleAuth,
    
    async (req, res, next) => {
      try {
        await updateReservationController(req, res);
      } catch (error: any) {
        next(error);
      }
    }
  );

  app.route("/reservation/:id").delete(
    bothRoleAuth,
    
    async (req, res, next) => {
      try {
        await deleteReservationController(req, res);
      } catch (error: any) {
        next(error);
      }
    }
  );
};

export default reservation;