import jwt from "jsonwebtoken"
import "dotenv/config";

import { Request, Response, NextFunction } from "express"


//Middleware to check if the user is loggedin

// export const isAuthenticated = (req:Request, res:Response, next:NextFunction) =>{
//     const authHeader = req.headers.authorization

//     if(!authHeader || !authHeader.startsWith("Bearer")){
//         res.status(401).json({ message: "Unauthorized access" })
//         return;
//     }

//     const token = authHeader.split(" ")[1]

//     try {

//         const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

//         //attaching users info
//         //req.customer = decoded;
//         (req as any).customer = decoded;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: "Invalid token" });

        
//     }
        


    
// }  

export const checkRoles = (requiredRole: "admin" | "user" | "both") => {
    return (req:Request, res:Response, next:NextFunction) => {

         const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer")){
        res.status(401).json({ message: "Unauthorized access" })
        return;
    }

    const token = authHeader.split(" ")[1]

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        //attaching users info
        //req.customer = decoded;
        (req as any).customer = decoded;

        if(typeof decoded === "object" && //Ensure decoded is an object
            decoded !== null && //Ensure decoded is not null
            "role" in decoded //Ensure the decoded token has a role property
        ){
            if(requiredRole === "both"){
                if (decoded.role === "admin" || decoded.role === "user"){
                    next()
                    return;
                }
            }else if (decoded.role === requiredRole){
                next();
                return;
            }

            res.status(401).json({message: "Unauthorized"})
            return;
            
            
        }else {
            res.status(401).json({message: "Invalid Token Payload"})
            return
        }
    } catch (error) {
        res.status(401).json({ message: "Invalid token" })
        return

        
    }
}

}


export const adminRoleAuth = checkRoles("admin")
export const userRoleAuth = checkRoles("user")
export const bothRoleAuth = checkRoles("both")