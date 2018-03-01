import { Router } from 'express';
import peopleRouter from './people';
import AuthRouter from './auth';
import usersRouter from './users';
import locationsRouter from './locations';
import imagesRouter from './images';
import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw';

let router = Router();

router.use('/auth', AuthRouter);

router.post('*', tokenMiddleware, isLoggedIn);
router.put('*', tokenMiddleware, isLoggedIn);
router.delete('*', tokenMiddleware, isLoggedIn);

router.use('/locations', locationsRouter);
router.use('/users', usersRouter);
router.use('/images', imagesRouter);
router.use('/people', peopleRouter);

export default router;