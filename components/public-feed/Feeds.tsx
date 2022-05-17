import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import { api } from "../common/api";

const posts = [
  "/assets/images/feed-1.png",
  "/assets/images/feed-2.png",
  "/assets/images/feed-3.png",
  "/assets/images/feed-4.png",
  "/assets/images/feed-5.png",
  "/assets/images/feed-6.png",
  "/assets/images/feed-7.png",
  "/assets/images/feed-8.png",
  "/assets/images/feed-9.png",
  "/assets/images/feed-10.png",
];

const feedLimit = 10;

const Feeds: FC = () => {
  const [show, setShow] = useState(feedLimit);
  const [feeds, setFeeds] = useState([]);

  const handleShow = () => {
    setShow((prev) =>
      Math.min(
        Math.max(prev + feedLimit, renderPosts?.length || feedLimit),
        feeds.length
      )
    );
  };

  const renderPosts = feeds.slice(0, show);
  const left = renderPosts.filter(
    (post: string, index: number) => index % 2 === 0
  );
  const right = renderPosts.filter(
    (post: string, index: number) => index % 2 !== 0
  );

  const getAllFeed = async () => {
    try {
      const { data }: any = await api({
        url: "/public/prayers",
        method: "get",
      });

      if (data) {
        const feeds = data.map((feed: any) => feed.prayer_need.picture);
        setFeeds(feeds);
      } else {
        console.log("error..");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllFeed();
  }, []);

  return (
    <div>
      <div className="text-sm font-inter uppercase font-black tracking-wider">
        browse all
      </div>
      <div className="mt-6">
        <div className="flex space-x-2.5 sm:space-x-5 lg:space-x-7.5">
          <div className="w-1/2 space-y-2.5 sm:space-y-5 lg:space-y-7.5">
            {left?.map((post: string, index: number) => (
              <img
                key={index}
                src={post}
                alt=""
                className={classNames("w-full object-cover h-80", {
                  "!h-56": index === 0,
                })}
              />
            ))}
          </div>
          <div className="w-1/2 space-y-2.5 sm:space-y-5 lg:space-y-7.5">
            {right?.map((post: string, index: number) => (
              <img
                key={index}
                src={post}
                alt=""
                className={classNames("w-full object-cover h-80", {
                  "!h-56": index === right.length - 1,
                })}
              />
            ))}
          </div>
        </div>
        <div className="mt-8">
          <button
            className="py-4.5 text-center w-full font-inter rounded-md border-2 border-black uppercase"
            onClick={handleShow}
          >
            see more
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feeds;
