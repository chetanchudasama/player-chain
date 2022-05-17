import { FC } from "react";

const BasicDetails: FC = () => {
  return (
    <div>
      <div className="">
        <img
          src="/assets/images/jane.png"
          alt=""
          className="w-28 h-28 rounded-full mx-auto"
        />
      </div>
      <div className="mt-7.5">
        <div className="font-inter tracking-tighter text-4xl text-center capitalize">
          Jane
        </div>
        <div className="mt-3 font-inter tracking-tighter text-xs text-center uppercase">
          San francisco, ca
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
