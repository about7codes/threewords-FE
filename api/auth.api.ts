import axios from "axios";

// https://threewords-be.onrender.com
// https://maxthree.cyclic.app
// https://maxthree.herokuapp.com
// http://localhost:8000

// Login User
export const loginRequest = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axios.post("https://threewords-be.onrender.com/auth/signin", {
    email,
    password,
  });
  // Cookies.set("aToken", response.data.authToken);
  // Cookies.set("rToken", response.data.refreshToken);
  // console.log(response);
  return response.data;
};

// Signup/Create User
export const signupRequest = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axios.post("https://threewords-be.onrender.com/auth/signup", {
    email,
    password,
  });
  // Cookies.set("aToken", response.data.authToken);
  // Cookies.set("rToken", response.data.refreshToken);
  // console.log(response);
  return response.data;
};
