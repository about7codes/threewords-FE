import axios from "axios";
import { parseCookies } from "nookies";
import React from "react";

const CreatePhrase = () => {
  return (
    <div>
      <h1>CreatePhrase Threemax</h1>
      Create
    </div>
  );
};

CreatePhrase.auth = {
  required: true,
  loading: <div>Loading...</div>,
  redirectTo: "/login",
};

export default CreatePhrase;
