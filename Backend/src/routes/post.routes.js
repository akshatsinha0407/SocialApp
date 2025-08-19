import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { createPost } from '../controller/post.controlle.js';
import multer from 'multer';
 import { createPostController, getPostController, createCommentController, createLikeController } from "../controllers/post.controller.js";
import { createCommentValidator, getPostsValidator, createLikeValidator } from "../middlewares/validator.middleware.js";


const upload = multer({ storage: multer.memoryStorage() });// Configure multer for file uploads

const router = express.Router();

/*
router.post('/create',
authMiddleware, 
upload.single('file'),
 createPost);
*/
/* POST /posts */
router.post('/',
    authMiddleware, // req.user
    upload.single("image"), // req.file
    createPostController)


    ///nn1
router.get('/',
    getPostsValidator, // Validate query parameters
    authMiddleware,
    getPostController
)


//nn2
router.post('/comment',
    //y hum first
    createCommentValidator,
    authMiddleware,
    createCommentController
)


//nn3
router.post('/like',
    createLikeValidator,
    authMiddleware,
    createLikeController
)

export default router;