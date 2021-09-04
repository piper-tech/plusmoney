import { Router } from "express";
import userRoutes from "./routes/user-routes";

const router = Router();

userRoutes(router);

export { router };