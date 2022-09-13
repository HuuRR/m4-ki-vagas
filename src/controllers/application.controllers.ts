import { Request, Response } from "express";
import createApplicationService from "../services/application/createApplication.service";

const createApplicationControllers = async (request: Request, response: Response) => {
    const { vacancyId } = request.params;
    
    const { decoded: { id:userId } } = JSON.parse(request.headers.authorization!);
  
    const newAplication = await createApplicationService({ userId, vacancyId });
  
    return response.status(201).json(newAplication);
  };
  
  export default createApplicationControllers