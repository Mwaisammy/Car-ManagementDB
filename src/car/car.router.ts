import { Express } from "express";
import { createCarController, deleteCarController, getCarByIdController, getCarController, updateCarController } from "./car.controller";
import { adminRoleAuth, bothRoleAuth } from "../middleware/bearAuth";




const car = (app: Express) => {
    app.route("/car").post(
        adminRoleAuth,

        async(req, res, next) => {
            try {
                await createCarController(req, res)
                
            } catch (error) {
                next(error)
                
            }        
        }
    )

    app.route("/cars").get(

    
        bothRoleAuth,
        async (req, res, next) => {
            try {
                await getCarController(req, res);
                
            } catch (error: any) {
        next(error);
      }
        }
    )

    app.route("/car/:id").get(

        bothRoleAuth,

        async(req, res, next) => {
            try {
                 await getCarByIdController(req, res);
                
            } catch (error) {
                 next(error);
                
            }
        }
    )

    app.route("/car/:id").put(

        adminRoleAuth,
        async (req, res, next) => {
            try {

            await updateCarController(req, res);

            } catch (error: any) {

                 next(error);
            }
        }
    )

    
    app.route("/car/:id").delete(

        adminRoleAuth,
        async (req, res, next) => {
            try {

                await deleteCarController(req, res);

            } catch (error: any) {

                 next(error);
            }
        }
    )



















};

export default car

