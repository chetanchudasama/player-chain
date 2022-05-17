import Link from "next/link";
import { FC } from "react";

const Heading: FC = () => {
  return (
    <div className="pt-6 pb-12 space-y-10">
      <div className="mx-auto max-w-80 space-y-6">
        <p className="text-white font-inter text-xl tracking-tight text-center">
          <b>&#123;</b> Prayer.chain; <span className="font-light">NOUN</span>{" "}
          <b>&#125;</b>
        </p>
        <p className="text-white font-medium font-inter text-xl tracking-tight text-center">
          A list of people who agree to pray for a loved one during a troubled
          time.
        </p>
      </div>
      <div className="flex items-center space-x-2.5 sm:space-x-5 justify-center">
        <Link href="/public-feed">
          <a className="bg-white h-fit text-xs font-inter px-6 py-4.5 rounded-full text-center uppercase">
            show all prayers
          </a>
        </Link>
        <Link href="#">
          <a className="text-white h-fit bg-gradient text-xs font-inter px-6 py-4.5 rounded-full text-center uppercase">
            start prayer Chain &gt;
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Heading;
