import { FC } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Link from "next/link";

const Footer: FC = () => {
  return (
    <div className="px-6 sm:px-10 py-3 flex items-center justify-between border-t border-black/50">
      <Link href="/">
        <a>
          <HomeOutlinedIcon className="P-0" />
        </a>
      </Link>
      <Link href="/prayer-request">
        <a className="text-white bg-gradient text-xs font-inter px-8 py-4 rounded-full">
          <AddOutlinedIcon className="P-0" />
        </a>
      </Link>
      <Link href="/profile">
        <a>
          <PersonOutlineOutlinedIcon className="P-0" />
        </a>
      </Link>
    </div>
  );
};

export default Footer;
