import { Router } from 'express';
import peopleRouter from './people';
import ImagesTestRouter from './imagesTest';
import AuthRouter from './auth';
import usersRouter from './users';
import locationsRouter from './locations';
import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw';

let router = Router();

router.use('/auth', AuthRouter);

router.post('*', tokenMiddleware, isLoggedIn);
router.put('*', tokenMiddleware, isLoggedIn);
router.delete('*', tokenMiddleware, isLoggedIn);

router.use('/locations', locationsRouter);
router.use('/imagesTest', ImagesTestRouter);
router.use('/users', usersRouter);
router.use('/people', peopleRouter);

export default router;