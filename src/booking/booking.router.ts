import { Express } from "express";
import { createBookingController , deleteBookingController, getBookingByIdController, getBookingController, getBookingsByCustomerIdController, updateBookingController,} from "./booking.controller";
import { adminRoleAuth, bothRoleAuth } from "../middleware/bearAuth";



const booking = (app: Express) => {
  app.route("/booking").post(
     bothRoleAuth,

    async (req, res, next) => {
      try {
        await createBookingController(req, res);
      } catch (error: any) {
        next(error);
      }
    }
  );

  app.route("/bookings").get(
    adminRoleAuth,
    
    async (req, res, next) => {
      try {
        await getBookingController(req, res);
      } catch (error: any) {
        next(error);
      }
    }
  );

  app.route("/booking/:id").get(
    bothRoleAuth,
  
    async (req, res, next) => {
      try {
        await getBookingByIdController(req, res);
      } catch (error: any) {
        next(error);
      }
    }
  );

  app.route("/bookings/customer/:customerID").get(
    bothRoleAuth,
  
      async (req, res, next) => {
        try {
          await getBookingsByCustomerIdController(req, res);
        } catch (error: any) {
          next(error);
        }
      }
    );

  app.route("/booking/:id").put(
    bothRoleAuth,
  
    async (req, res, next) => {
      try {
        await updateBookingController(req, res);
      } catch (error: any) {
        next(error);
      }
    }
  );

  app.route("/booking/:id").delete(
    bothRoleAuth,

    async (req, res, next) => {
      try {
        await deleteBookingController(req, res);
      } catch (error: any) {
        next(error);
      }
    }
  );


  //join route
  // app.route("booking/:id").get(

  //   async (req, res, next) => {
  //     try {
  //       await fetchBookings(req, res)
        
  //     } catch (error) {
  //       next(error)
        
  //     }
  //   }
  // )

}

export default booking


 
