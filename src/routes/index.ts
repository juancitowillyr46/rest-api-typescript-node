import { Router } from 'express';
import userRoutes from './usersRoutes';

const router: Router = Router();

router.get('/', (req, res) => {
 res.send('Hello World');
});

router.use('/api/users', userRoutes);

export default router;