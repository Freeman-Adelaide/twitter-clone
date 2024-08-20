import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {getNotifications, deleteNotifications, deleteNotification} from '../controllers/notificationControllers.js'

const notificationRouter = express.Router();

notificationRouter.get("/", protectRoute, getNotifications)
notificationRouter.delete("/", protectRoute, deleteNotifications);
notificationRouter.delete("/:id", protectRoute, deleteNotification);



export default notificationRouter