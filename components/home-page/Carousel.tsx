import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import { api } from "../common/api";

interface Props {
  mode?: "light" | "dark";
}

const Carousel: FC<Props> = ({ mode = "light" }) => {
  const [user, setUser] = useState([]);
  const getPublicPrayerChainFeed = async () => {
    try {
      const { data }: any = await api({
        url: "/public",
        method: "get",
      });
      if (data) {
        const publicFeed = data?.map((feed: any) => feed);
        setUser(publicFeed);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPublicPrayerChainFeed();
  }, []);
  return (
    <div className="flex space-x-4 -mx-7.5 px-7.5 overflow-x-auto pb-3">
      {user?.map((user: any, index: any) => (
        <div key={index} className="w-80 shrink-0">
          {user?.prayer?.media?.type === "video" ? (
            <video
              controls
              playsInline
              src={user?.prayer?.media?.src || ""}
              key={index}
              className="w-full h-48"
            />
          ) : (
            <img
              key={index}
              src={user?.prayer?.media?.src || ""}
              alt=""
              className="w-full h-48"
            />
          )}

          <div className="flex items-center mt-4">
            <img
              src={user?.prayer_need?.picture || ""}
              alt=""
              className="w-7 h-7 rounded-full"
            />
            <div className="ml-2">
              <p
                className={classNames("font-roboto font-bold text-sm", {
                  "text-white": mode === "dark",
                })}
              >
                {user?.prayer_need?.name || ""}
              </p>
              <p
                className={classNames(
                  "text-black/80 font-roboto font-bold text-xs",
                  {
                    "text-white/80": mode === "dark",
                  }
                )}
              >
                {user?.prayer_need?.name || ""}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
