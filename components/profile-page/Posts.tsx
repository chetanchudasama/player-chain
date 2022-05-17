import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import { api } from "../common/api";

const posts = [
  "/assets/images/post-1.png",
  "/assets/images/post-2.png",
  "/assets/images/post-3.png",
  "/assets/images/post-4.png",
  "/assets/images/post-5.png",
  "/assets/images/post-6.png",
];
interface Values {
  id: string;
  secretId: string;
}
const Posts: FC<Values> = ({ id, secretId }) => {
  const [secretIds, setSecretId] = useState(secretId);
  const [postId, setPostId] = useState([]);

  const renderPosts = [...postId];
  const left = renderPosts.filter(
    (post: string, index: number) => index % 2 === 0
  );

  const right = renderPosts.filter(
    (post: string, index: number) => index % 2 !== 0
  );
  const getPublicPrivateId = async () => {
    const isSecretId = secretIds !== "" ? `?secret_id=${secretId}` : "";
    try {
      const { data }: any = await api({
        url: `${id}/prayers${isSecretId}`,
        method: "get",
      });
 
      if (data) {
        const feeds = data?.public.map((feed: any) => feed.media);

        setPostId(feeds);
      } else {
        console.log("error.....");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      getPublicPrivateId();
    }
  }, [id]);

  return (
    <div className="mt-8">
      {postId.length === 0 ? (
        "No data available"
      ) : (
        <div className="flex space-x-2.5 sm:space-x-5 lg:space-x-7.5">
          <div className="w-1/2 space-y-2.5 sm:space-y-5 lg:space-y-7.5">
              {left?.map((post: any, index: number) => {
              if (post.type === "video") {
                return (
                  <video
                    controls
                    playsInline
                    src={post.src}
                    key={index}
                    className={classNames("w-full object-cover h-80", {
                      "!h-56": index === 0,
                    })}
                  />
                );
              } else {
                return (
                  <img
                    key={index}
                    src={post.src}
                    alt=""
                    className={classNames("w-full object-cover h-80", {
                      "!h-56": index === 0,
                    })}
                  />
                );
              }
            })}
          </div>
          <div className="w-1/2 space-y-2.5 sm:space-y-5 lg:space-y-7.5">
            {right?.map((post: any, index: number) => {
              if (post.type === "video") {
                return (
                  <video
                    controls
                    playsInline
                    src={post.src}
                    key={index}
                    className={classNames("w-full object-cover h-80", {
                      "!h-56": index === 0,
                    })}
                  />
                );
              } else {
                return (
                  <img
                    key={index}
                    src={post.src}
                    alt=""
                    className={classNames("w-full object-cover h-80", {
                      "!h-56": index === 0,
                    })}
                  />
                );
              }
            })}
          </div>
        </div>
      )}
      <div className="mt-8">
        <Link href="/public-feed">
          <a className="py-4.5 text-center block font-inter rounded-md border-2 border-black uppercase">
            View Public Prayer requests
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Posts;
