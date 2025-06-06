
//Creating car contoller
//The contoller act like the bidge between the HTTP request and the application logic( services and database operations)


import { Request, Response } from "express";
import { createCarService, deleteCarService, getCarService, getCarServiceById, updateCarService } from "./car.service";

// create car controller
export const createCarController = async (req: Request, res: Response) => {
  try {
    const car = req.body;
    // console.log(car)
    const created = await createCarService(car);
    if (!created) return res.json({ message: "Car not created" });
    return res.status(201).json({ message: created });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};


//get all cars by controller 

export const getCarController = async( req: Request, res: Response) => {
    try {
        const cars = await getCarService()
       if (!cars || cars.length === 0) {
      return res.status(404).json({ message: "No cars found" });
    }

    return res.status(200).json({data: cars})
        
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
        
    }
}


//get car by id controller

export const getCarByIdController = async(req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)

        if(isNaN(id))return res.status(400).json({ message: "Invalid ID" });

        const car = await getCarServiceById(id)
        if(!car) return res.status(404).json({message: "Car was not found"})

            return res.status(200).json({data: car})


    } catch (error:any) {
        return res.status(500).json({ error: error.message });
        
    }
}


//update car by id controoller

export const updateCarController = async(req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        if(isNaN(id)) return res.json({message: "Invalid URL"})
        
        const car = req.body
        const existingCar = await getCarServiceById(id)
         if (!existingCar) return res.status(404).json({ message: "Car not found" });

         const updated = await updateCarService(id, car);
        if (!updated) return res.status(400).json({ message: "Car not   updated" });

        return res.status(500).json({message: "Car was updated successfully"})






        
        
    } catch (error:any) {
        return res.status(500).json({ error: error.message });
        
    }
}


//Delete car by id controller

export const deleteCarController = async(req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)

        if(isNaN(id)) return res.json({message: "Invalid ID"})
        
        const existingCar = await getCarServiceById(id)
        if(!existingCar) return res.status(404).json({message: "Car was not found"})

        const deletedCar = await deleteCarService(id)
        if(!deletedCar) return res.status(400).json({message: "Car was not deleted"})

        return res.status(200).json({message: "Car deleted successfully"})

        
        
        
    } catch (error: any) {
            return res.status(500).json({ error: error.message });

        
    }
}
