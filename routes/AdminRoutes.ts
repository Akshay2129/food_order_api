import express,{Request,Response,NextFunction} from 'express';
import { CreateVandor, GetVandors,GetVandorByID } from '../controllers';


const routes=express.Router();

routes.post('/vandor',CreateVandor);
routes.get('/vandors',GetVandors);
routes.get('/vandor/:id',GetVandorByID)

routes.get( '/',(req:Request,res:Response,next:NextFunction)=>{
   res.json({message:"Hello from admin"})
});

export { routes as AdminRoute};