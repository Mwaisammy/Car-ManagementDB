import { Express } from "express";
import {registerPaymentController,getPaymentController,getPaymentByIdController,getPaymentsByBookingIdController,updatePaymentController,deletePaymentController} from "./payment.controller";
import { adminRoleAuth, bothRoleAuth } from "../middleware/bearAuth";


const payment = (app: Express) => {
  app.route("/payment").post(
    bothRoleAuth,

    
    async (req, res, next) => {
    try {
      await registerPaymentController(req, res);
    } catch (error: any) {
      next(error);
    }
  });

  app.route("/payments").get(
    adminRoleAuth,
    
    async (req, res, next) => {
    try {
      await getPaymentController(req, res);
    } catch (error: any) {
      next(error);
    }
  });

  app.route("/payment/:id").get(
    bothRoleAuth,
    
    async (req, res, next) => {
    try {
      await getPaymentByIdController(req, res);
    } catch (error: any) {
      next(error);
    }
  });

  app.route("/payments/booking/:bookingID").get(
      bothRoleAuth,
      
      async (req, res, next) => {
        try {
          await getPaymentsByBookingIdController(req, res);
        } catch (error: any) {
          next(error);
        }
      }
    );

  app.route("/payment/:id").put(
    adminRoleAuth,

    
    async (req, res, next) => {
    try {
      await updatePaymentController(req, res);
    } catch (error: any) {
      next(error);
    }
  });

  app.route("/payment/:id").delete(
    adminRoleAuth,
    
    async (req, res, next) => {
    try {
      await deletePaymentController(req, res);
    } catch (error: any) {
      next(error);
    }
  });
};

export default payment;