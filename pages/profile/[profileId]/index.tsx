import { NextPage } from "next";
import React from "react";
import { useRouter } from "next/router";
import ProfilePage from "../../../components/profile-page";

const Profile: NextPage = () => {
  const router = useRouter();
  const profileId = router.query.profileId;
  return <ProfilePage id={profileId as any} secretId="" />;
};

export default Profile;
