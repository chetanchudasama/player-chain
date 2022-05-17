import { FC } from "react";
import Navbar from "./Navbar";
import Heading from "./Heading";
import Link from "next/link";
import Carousel from "./Carousel";
import Cards from "./Cards";

const HomePage: FC = () => {
  return (
    <div>
      <div className="bg-black px-5 sm:px-10">
        <Navbar />
        <Heading />
      </div>
      <div className="">
        <img src="/assets/images/escalator.png" alt="" className="w-full" />
        <div className="py-6 px-7.5 space-y-7.5">
          <div className="space-y-4">
            <p className="font-inter font-bold text-3xl tracking-tighter text-left">
              Prayer changes lives.
            </p>
            <p className="text-black/50 font-medium font-inter text-left">
              Prayerchain.io is the worlds first software that unifies people in
              Prayer.
            </p>
          </div>
          <div className="flex items-center space-x-2.5 justify-center sm:space-x-5">
            <Link href="/public-feed">
              <a className="bg-black text-white h-fit text-xs font-inter px-6 py-4.5 rounded-full text-center uppercase">
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
      </div>
      <div className="bg-black p-7.5">
        <Carousel mode="dark" />
        <div className="mt-10 space-y-7.5">
          <div className="space-y-2.5">
            <p className="font-inter text-white font-bold text-3xl tracking-tighter text-left">
              How Prayer Chain works. Explained in 3 simple steps
            </p>
            <p className="text-white/50 font-medium font-inter text-left">
              We believe in the power of prayer. Our one of a kind software
              creates opportunities that will connect, empower and increase your
              faith. Dont battle it alone, connect with other prayer warriors.
            </p>
          </div>
          <div className="flex items-center space-x-2.5 justify-center sm:space-x-5">
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
        <div className="mt-8 flex justify-center">
          <Cards />
        </div>
      </div>
      <div className="pt-7 px-7.5 pb-11">
        <div className="font-inter font-medium text-3xl tracking-tighter">
          Public Prayer Chain Feed
        </div>
        <div className="mt-6">
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
