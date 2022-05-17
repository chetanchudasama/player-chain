import { FC } from "react";
import Link from "next/link";

const Navbar: FC = () => {
  return (
    <div className="flex justify-between items-center py-6">
      <div className="font-inter font-bold text-white text-xl tracking-tight">
        Prayerchain.io
      </div>
      <Link href="#">
        <a className="text-white bg-gradient text-xs font-inter px-6 py-4 rounded-full ml-3 text-center uppercase">
          start prayer Chain &gt;
        </a>
      </Link>
    </div>
  );
};

export default Navbar;
