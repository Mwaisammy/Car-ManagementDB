import { adminRoleAuth, bothRoleAuth } from "../middleware/bearAuth"
import { createUserController,loginUserController, verifyUserController } from "./auth.controller"
import { Express } from "express"



const authentication = (app: Express) => {
    app.route("/auth/register").post(
        adminRoleAuth,

      

        async(req, res, next) => {
            try {

                await createUserController(req, res)
                
            } catch (error) {
                next(error)
                
            }
        }
    )

    //verify user route

    app.route("/auth/verify").post(

        bothRoleAuth,
        async(req, res, next) => {
            try {
                await verifyUserController(req, res)

                
            } catch (error) {
                next(error)
                
            }
        }
    )

    //Login route

    app.route("/auth/login").post(

        bothRoleAuth,
        async(req, res, next) => {
            try {
                await loginUserController(req, res)
                
            } catch (error:any) {
                next()
            }
        }
    )
     


  }



export default authentication;