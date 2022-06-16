import axios from "axios";

// https://maxthree.herokuapp.com
// http://localhost:8000

export const loginRequest = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(
    "https://maxthree.herokuapp.com/auth/signin",
    { email, password },
    { withCredentials: true }
  );
  return response.data;
};
