import express,{Request,Response,NextFunction} from 'express';
import { GetVandorProfile, UpdateVandorProfile, UpdateVandorService, VandorLogin } from '../controllers';
import { Authenticate } from '../middlewares';

const routes=express.Router();

routes.post('/login',VandorLogin);

routes.use(Authenticate);
routes.get('/profile', GetVandorProfile);
routes.put('/profile',UpdateVandorProfile);
routes.put('/service',UpdateVandorService);


routes.get( '/',(req:Request,res:Response,next:NextFunction)=>{
   res.json({message:"Hello from Vandor"})
});

export { routes as VandorRoutes };