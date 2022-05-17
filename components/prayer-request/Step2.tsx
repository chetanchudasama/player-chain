import { FC } from "react";
import classNames from "classnames";

interface Props {
  formik: any;
}

const Step2: FC<Props> = ({ formik = {} }) => {
  return (
    <div className="">
      <div className="">
        <div className="font-inter text-4xl">What do they need Prayer for?</div>
        <div className="mt-5 space-y-4 font-roboto">
          <div className="">
            <button
              className={classNames(
                "p-4 w-full border border-primary rounded text-left",
                {
                  "bg-primary text-white":
                    formik.values.prayerFor === "healing",
                }
              )}
              onClick={() => formik.setFieldValue("prayerFor", "healing")}
            >
              Healing
            </button>
          </div>
          <div className="">
            <button
              onClick={() => formik.setFieldValue("prayerFor", "guidance")}
              className={classNames(
                "p-4 w-full border border-primary rounded text-left",
                {
                  "bg-primary text-white":
                    formik.values.prayerFor === "guidance",
                }
              )}
            >
              Guidance
            </button>
          </div>
          <div className="">
            <button
              onClick={() => formik.setFieldValue("prayerFor", "other")}
              className={classNames(
                "p-4 w-full border border-primary rounded text-left",
                {
                  "bg-primary text-white": formik.values.prayerFor === "other",
                }
              )}
            >
              Other
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="font-inter text-4xl">
          Select the type of Prayerchain you would like.*
        </div>
        {formik.errors.typeOfPrayer && (
          <p className="my-1 text-red-500">{formik.errors.typeOfPrayer}</p>
        )}
        <div className="mt-5 space-y-4 font-roboto">
          <div className="space-y-3">
            <p className="text-xs text-black/50">
              *A public prayer chain is listed on our publice prayer feed, so
              more people can cover your need in prayer.
            </p>
            <p className="text-xs text-black/50">
              *A private prayer chain is only accessible throgh the link you are
              sent.
            </p>
          </div>
          <div className="mt-7.5 flex items-center justify-between space-x-4">
            <button
              onClick={() => formik.setFieldValue("typeOfPrayer", "public")}
              className={classNames(
                "p-4 w-full border border-primary rounded text-left",
                {
                  "bg-primary text-white":
                    formik.values.typeOfPrayer === "public",
                }
              )}
            >
              Public
            </button>
            <button
              onClick={() => formik.setFieldValue("typeOfPrayer", "private")}
              className={classNames(
                "p-4 w-full border border-primary rounded text-left",
                {
                  "bg-primary text-white":
                    formik.values.typeOfPrayer === "private",
                }
              )}
            >
              Private
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
