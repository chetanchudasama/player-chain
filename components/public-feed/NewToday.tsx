import { FC } from "react";

const NewToday: FC = () => {
  return (
    <div>
      <div className="text-sm font-inter uppercase font-black tracking-wider">
        what's new today
      </div>
      <div className="mt-6">
        <img src="/assets/images/escalator.png" alt="" className="w-full" />
        <div className="flex items-center mt-4">
          <img
            src="/assets/images/ridhwan-nordin.png"
            alt=""
            className="w-7 h-7 rounded-full"
          />
          <div className="ml-2">
            <p className="font-roboto font-bold text-sm">Ridhwan Nordin</p>
            <p className="text-black/80 font-roboto font-bold text-xs">
              @ridzjcob
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewToday;
