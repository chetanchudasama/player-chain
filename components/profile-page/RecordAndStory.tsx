import { FC, useState } from "react";
import RecordPrayer from "../common/record-prayer";

const RecordAndStory: FC = () => {
  const [viewStory, setViewStory] = useState(false);
  const [showRecordPrayerScreen, setShowRecordPrayerScreen] = useState(false);
  const [recordedPrayer, setRecordedPrayer] = useState<string>("");

  return (
    <div className="mt-8 space-y-4">
      <div className="">
        <button
          className="py-4.5 text-center w-full font-inter rounded-md bg-primary text-white"
          onClick={() => setShowRecordPrayerScreen(true)}
        >
          RECORD PRAYER FOR JANE &gt;
        </button>
        {showRecordPrayerScreen && (
          <RecordPrayer
            closePlayer={() => setShowRecordPrayerScreen(false)}
            setLink={(fileLink: string) => setRecordedPrayer(fileLink)}
          />
        )}
      </div>
      <div className="">
        {!viewStory ? (
          <button
            className="py-4.5 text-center w-full font-inter rounded-md border-2 border-black"
            onClick={() => setViewStory(true)}
          >
            JANE’S STORY
          </button>
        ) : (
          <div
            className="w-full h-96 flex flex-col items-center justify-center space-y-4 rounded-md border-2 border-black"
            onClick={() => setViewStory(false)}
          >
            <p className="text-center font-inter">JANE’S STORY:</p>
            <p className="text-center font-inter font-bold block">
              VIDEO OR TEXT
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordAndStory;
