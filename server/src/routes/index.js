import { Router } from 'express';
import peopleRouter from './people';
import ImagesTestRouter from './imagesTest';
import AuthRouter from './auth';

let router = Router();

router.use('/auth', AuthRouter);

router.use('/imagesTest', ImagesTestRouter);

router.use('/people', peopleRouter);

export default router;