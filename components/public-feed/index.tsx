import Router from "next/router";
import { FC } from "react";
import Feeds from "./Feeds";
import NewToday from "./NewToday";

const PublicFieldPage: FC = () => {
  return (
    <div className="py-6 px-4 sm:px-10 lg:px-14">
      <button>
        <img
          src="/assets/icons/arrow-back.svg"
          alt=""
          onClick={() => Router.push("/")}
        />
      </button>
      <div className="mt-2.5">
        <div className="text-4xl font-inter tracking-tight">Discover</div>
        <div className="mt-7.5">
          <NewToday />
        </div>
        <div className="mt-12">
          <Feeds />
        </div>
      </div>
    </div>
  );
};

export default PublicFieldPage;
