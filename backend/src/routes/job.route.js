import { Router } from "express";
import {
  addJob,
  deleteJob,
  editJob,
  getJobs,
} from "../controllers/job.controller.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

router.get("/jobs", authenticateToken, getJobs);
router.post("/addjob", authenticateToken, addJob);
router.put("/jobs/:id", authenticateToken, editJob);
router.delete("/jobs/:id", authenticateToken, deleteJob);
export default router;
