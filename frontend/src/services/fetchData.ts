import axios from "axios";

const getInfo = async (token: string) => {
  const response = await axios.get("http://localhost:8080/api/jobs", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response;
};

export default getInfo;
