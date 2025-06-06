import { createCustomerController, deleteCustomerController, getAllCustomersController, getCustomerByIdController, loginCustomerController, updateCustomerController } from "./auth.controller"
import { Express } from "express"



const customer = (app: Express) => {
    app.route("/auth/register").post(

        async(req, res, next) => {
            try {

                await createCustomerController(req, res)
                
            } catch (error) {
                next(error)
                
            }
        }
    )

    //Login route

    app.route("/auth/login").post(
        async(req, res, next) => {
            try {
                await loginCustomerController(req, res)
                
            } catch (error:any) {
                next()
            }
        }
    )
     


//Get all customers
    app.route("/customers").get(
    
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
    
        async (req, res, next) => {
          try {
            await deleteCustomerController(req, res);
          } catch (error: any) {
            next(error);
          }
        }
      );
    
    
}



export default customer