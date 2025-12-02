import { formData } from "./../components/pages/homePage";
import axios from "axios";

const getJobs = async (token: string) => {
  const response = await axios.get("http://localhost:8080/api/jobs", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response;
};

const addJob = async ({
  token,
  formData,
}: {
  token: string;
  formData: formData;
}) => {
  const res = await axios.post("http://localhost:8080/api/addjob", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res;
};

export { getJobs, addJob };
