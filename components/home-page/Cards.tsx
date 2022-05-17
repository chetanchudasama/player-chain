import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";

interface Card {
  title: string;
  subtitle?: string;
  link: {
    text: string;
    to: string;
  };
}

const cards: Card[] = [
  {
    title: "Create a Prayer Chain",
    subtitle:
      "Create as many requests as desired. Just fill out our intake form.",
    link: {
      text: "start prayer Chain &gt;",
      to: "#",
    },
  },
  {
    title: "Share the request with your community",
    subtitle: "Easily share the reqest within your network with copy + paste.",
    link: {
      text: "start prayer Chain &gt;",
      to: "#",
    },
  },
  {
    title: " Engage with others as they pray on your behalf",
    link: {
      text: "start prayer Chain &gt;",
      to: "#",
    },
  },
];

const Cards: FC = () => {
  return (
    <div className="space-y-8 lg:grid lg:grid-cols-3 lg:gap-x-4 lg:space-y-0">
      {cards?.map((card: Card, index: number) => (
        <div
          key={index}
          className="bg-white rounded-lg max-w-80 flex flex-col items-center pt-14 pb-7.5"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black text-white font-inter font-medium text-3xl tracking-tighter">
            {index + 1}
          </div>
          <p className="mt-6 font-inter text-xl font-bold px-14 text-center">
            {card.title}
          </p>
          {card?.subtitle && (
            <p className="font-inter text-sm mt-2.5 px-14 text-center">
              {card.subtitle}
            </p>
          )}
          <Link href="#">
            <a
              className={classNames(
                "mt-5 text-white bg-gradient text-xs font-inter px-10 py-4 rounded-full uppercase",
                {
                  "!mt-11": !card?.subtitle,
                }
              )}
            >
              start prayer Chain &gt;
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Cards;
