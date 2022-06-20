import axios from "axios";
import Cookies from "js-cookie";

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
  // Cookies.set("aToken", response.data.authToken);
  // Cookies.set("rToken", response.data.refreshToken);
  // console.log("Headers", response.headers);
  return response;
};
