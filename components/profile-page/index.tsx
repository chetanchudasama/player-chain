import Router from "next/router";
import { FC } from "react";
import BasicDetails from "./BasicDetails";
import Posts from "./Posts";
import RecordAndStory from "./RecordAndStory";

interface Values {
  id: string;
  secretId: string;
}
const ProfilePage: FC<Values> = ({ id, secretId }) => {
  return (
    <div className="py-6 px-4 sm:px-10 lg:px-14">
      <button>
        <img
          src="/assets/icons/arrow-back.svg"
          alt=""
          onClick={() => Router.push("/")}
        />
      </button>
      <div className="mt-3">
        <BasicDetails />
        <RecordAndStory />
        <Posts id={id as any} secretId={secretId as any} />
      </div>
    </div>
  );
};

export default ProfilePage;
