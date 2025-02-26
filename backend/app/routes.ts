import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import resumeRoutes from "./resume/resume.route";
import userRoutes from "./user/user.route";

const router = Router();

router.use("/user", userRoutes);
router.use("/resume", resumeRoutes);

export default router;
