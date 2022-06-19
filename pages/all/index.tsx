import React from "react";

const AllPhrases = () => {
  return (
    <div>
      <h1>All Phrases Threemax</h1>
      AllPhrases
    </div>
  );
};

AllPhrases.auth = {
  required: true,
  loading: <div>Loading...</div>,
  redirectTo: "/login",
};

export default AllPhrases;
