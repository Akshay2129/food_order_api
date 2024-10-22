import express, { Request, Response, NextFunction } from 'express';
import { AddFood, GetFoods, GetVandorProfile, UpdateVandorProfile, UpdateVandorService, VandorLogin } from '../controllers';
import { Authenticate } from '../middlewares';
import multer from 'multer';

const routes = express.Router();

// const imageStorage = multer.diskStorage({
//    destination(req, file, callback) {
//       callback(null, 'images');
//    },
//    filename(req, file, callback) {
//       const uniqueSuffix = Date.now() + '-' + file.originalname;
//       callback(null, uniqueSuffix);
//    },
// });

// const images = multer({ storage: imageStorage }).array('images', 10);

routes.post('/login', VandorLogin);

// routes.use(Authenticate);//pass the authentication token to the all api routes
routes.get('/profile', Authenticate, GetVandorProfile);
routes.put('/profile', Authenticate, UpdateVandorProfile);
routes.put('/service', Authenticate, UpdateVandorService);


routes.post('/food', Authenticate, AddFood);
routes.get('/foods', GetFoods);

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
   res.json({ message: "Hello from Vandor" })
});

export { routes as VandorRoutes };