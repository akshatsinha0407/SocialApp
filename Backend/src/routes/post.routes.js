import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { createPost } from '../controller/post.controller';
import {multer} from 'multer';


const upload = multer({ dest: 'uploads/' }); // Configure multer for file uploads

const router = express.Router();

router.post('/create', authMiddleware, upload.single('file'), createPost);
export default router;