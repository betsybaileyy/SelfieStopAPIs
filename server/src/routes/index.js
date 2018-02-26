import { Router } from 'express';
import peopleRouter from './people';

let router = Router();

router.use('/people', peopleRouter);

export default router;