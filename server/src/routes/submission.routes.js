import { Router } from 'express';
import { uploadstorage } from '../middleware/upload.js';
import { upload } from '../controllers/submission.controller.js';
import { ensureLoggedIn } from '../middleware/protectRoute.js';

const SubmissionRouter = Router();

SubmissionRouter.put("/upload", ensureLoggedIn, uploadstorage.single('file'), upload);

export default SubmissionRouter;