import { formData } from "../components/pages/homePage";
import axios from "axios";

const token = localStorage.getItem("authToken") || "";
const getJobs = async () => {
  const response = await axios.get("http://localhost:8080/api/jobs", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response;
};

const createJob = async ({ formData }: { formData: formData }) => {
  const res = await axios.post("http://localhost:8080/api/addjob", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res;
};

const updateJob = async ({ job }: { job: formData }) => {
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
  const res = await axios.delete(`http://localhost:8080/api/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res;
};
export { getJobs, createJob, updateJob, deleteJob };
