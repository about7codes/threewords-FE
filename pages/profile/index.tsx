import React from "react";

const Profile = () => {
  return <div>Profile</div>;
};

Profile.auth = {
  required: true,
  loading: <div>Loading...</div>,
  redirectTo: "/login",
};

export default Profile;
