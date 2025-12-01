import axios from "axios";
import { FormValues } from "../components/pages/loginPage";
const registerUser = ({ email, password }: FormValues) => {
  const res = axios.post("http://localhost:8080/api/register", {
    email,
    password,
  });
  return res;
};
export default registerUser;
