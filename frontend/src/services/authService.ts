import axios from "axios";

const postLogin = (credentials: { email: string; password: string }) => {
  const response = axios.post("http://localhost:8080/api/login", credentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export default postLogin;
