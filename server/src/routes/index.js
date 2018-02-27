import { Router } from 'express';
import peopleRouter from './people';
import ImagesTestRouter from './imagesTest';

let router = Router();

router.use('/imagesTest', ImagesTestRouter);
router.use('/people', peopleRouter);

export default router;