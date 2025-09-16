import express from "express"
import { PostController } from "./post.controller";


const router = express.Router();


router.post('/create-post', PostController.createPost);
router.get('/all-posts', PostController.getAllPosts)
router.get('/post/:id', PostController.getPostById)
router.delete("/post-delete/:id", PostController.deletePost)



export const postRouter = router;