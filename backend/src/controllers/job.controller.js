import { Job } from "../models/job.model.js";

const addJob = async (req, res) => {
  const { title, requestedBy, positions, status } = req.body;

  if (!title || !requestedBy || !positions || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const job = new Job({ title, requestedBy, positions, status });
    const savedJob = await job.save();
    return res.status(201).json({
      message: "Job added succesfully",
      job: savedJob,
    });
  } catch (error) {
    console.log("Error while adding job: ", error);
    return res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};

const getJobs = async (_req, res) => {
  try {
    const jobs = await Job.find();
    return res.status(200).json({ jobs });
  } catch (error) {
    console.log("Error while fetching jobs: ", error);
    return res
      .status(500)
      .json({ message: `Internal Server Error: ${error.message}` });
  }
};

export { addJob, getJobs };
