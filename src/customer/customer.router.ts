import { Express } from "express"
import { deleteCustomerController, getAllCustomersController, getCustomerByIdController, updateCustomerController } from "./customer.controller";
import { adminRoleAuth, bothRoleAuth } from "../middleware/bearAuth";


export const customer  = (app: Express) => {

    //Get all customers
    app.route("/customers").get(
      adminRoleAuth,
    
        async (req, res, next) => {
          try {
            await getAllCustomersController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );

      // Get customer by ID
    
      app.route("/customer/:id").get(
        bothRoleAuth,
      
          async (req, res, next) => {
            try {
              await getCustomerByIdController(req, res);
            } catch (error: any) {
              next(error);
            }
          }
        );


        //Update customer by ID
    
      app.route("/customer/:id").put(
        adminRoleAuth,
      
        async (req, res, next) => {
          try {
            await updateCustomerController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );
    

      //Delete customer by id
      
      app.route("/customer/:id").delete(
        adminRoleAuth,
    
        async (req, res, next) => {
          try {
            await deleteCustomerController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );
    
    

}