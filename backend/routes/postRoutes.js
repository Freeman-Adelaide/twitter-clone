import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { getUserPosts, createPost, deletePost, commentOnPost, likeUnlikePost, getAllPosts, getlikedPosts, getFollowingPosts } from '../controllers/postControllers.js';

const postRouter = express.Router()
 
postRouter.get("/all", protectRoute, getAllPosts);
postRouter.get("/following", protectRoute, getFollowingPosts);
postRouter.get("/likes/:id", protectRoute, getlikedPosts);
postRouter.get("/user/username", protectRoute, getUserPosts);
postRouter.post('/create', protectRoute, createPost);
postRouter.post('/like/:id', protectRoute, likeUnlikePost);
postRouter.post('/comment/:id', protectRoute, commentOnPost );
postRouter.delete('/:id', protectRoute, deletePost);


export default postRouter;