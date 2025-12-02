import { Router } from "express";
import { addJob, editJob, getJobs } from "../controllers/job.controller.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

router.get("/jobs", authenticateToken, getJobs);
router.post("/addjob", authenticateToken, addJob);
router.put("/editjob", authenticateToken, editJob);
export default router;
