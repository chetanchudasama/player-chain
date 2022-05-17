import { FC } from "react";
import classNames from "classnames";

interface Props {
  formik: any;
}

const Step4: FC<Props> = ({ formik = {} }) => {
  return (
    <div className="">
      <div className="">
        <div className="font-inter text-4xl">
          What type of Prayer do they need?
        </div>
        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-4 font-roboto">
          <button
            onClick={() => formik.setFieldValue("prayerPeriod", "24 HR")}
            className={classNames(
              "p-4 w-full border border-primary rounded text-left",
              {
                "bg-primary text-white": formik.values.prayerPeriod === "24 HR",
              }
            )}
          >
            24 HR
          </button>
          <button
            onClick={() => formik.setFieldValue("prayerPeriod", "48 HR")}
            className={classNames(
              "p-4 w-full border border-primary rounded text-left",
              {
                "bg-primary text-white": formik.values.prayerPeriod === "48 HR",
              }
            )}
          >
            48 HR
          </button>
          <button
            onClick={() => formik.setFieldValue("prayerPeriod", "3 DAY")}
            className={classNames(
              "p-4 w-full border border-primary rounded text-left",
              {
                "bg-primary text-white": formik.values.prayerPeriod === "3 DAY",
              }
            )}
          >
            3 DAY
          </button>
          <button
            onClick={() => formik.setFieldValue("prayerPeriod", "7 DAY")}
            className={classNames(
              "p-4 w-full border border-primary rounded text-left",
              {
                "bg-primary text-white": formik.values.prayerPeriod === "7 DAY",
              }
            )}
          >
            7 DAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4;
