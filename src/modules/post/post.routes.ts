import express from "express"
import { PostController } from "./post.controller";


const router = express.Router();

router.get('/stats',PostController.getBlogStat)
router.post('/create-post', PostController.createPost);
router.get('/all-posts', PostController.getAllPosts)
router.get('/post/:id', PostController.getPostById)
router.patch("/update-post/:id", PostController.updatePost)
router.delete("/delete-post/:id", PostController.deletePost)



export const postRouter = router;