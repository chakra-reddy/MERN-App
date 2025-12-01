import { Router } from "express";
import { addJob, getJobs } from "../controllers/job.controller.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

router.get("/jobs", authenticateToken, getJobs);
router.post("/addjob", authenticateToken, addJob);
export default router;
