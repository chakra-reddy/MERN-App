import { formData } from "../components/pages/homePage";
import axios from "axios";
import { getAuthSession } from "../utils/auth";

const token = getAuthSession();
const getJobs = async () => {
  if (!token) throw new Error("No auth token found");
  const response = await axios.get("http://localhost:8080/api/jobs", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response;
};

const createJob = async ({ formData }: { formData: formData }) => {
  if (!token) throw new Error("No auth token found");
  const res = await axios.post("http://localhost:8080/api/addjob", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res;
};

const updateJob = async ({ job }: { job: formData }) => {
  if (!token) throw new Error("No auth token found");
  const res = await axios.put(
    `http://localhost:8080/api/jobs/${job._id}`,
    job,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res;
};

const deleteJob = async ({ id }) => {
  if (!token) throw new Error("No auth token found");
  const res = await axios.delete(`http://localhost:8080/api/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res;
};
export { getJobs, createJob, updateJob, deleteJob };
