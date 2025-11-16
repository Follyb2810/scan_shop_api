import { Router } from 'express';
import * as controller from './productunit.controller';

const router = Router();

router.get('/', controller.first);

export default router;
