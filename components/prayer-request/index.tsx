import { FC, useState } from "react";
import { useFormik } from "formik";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import classNames from "classnames";
import Step5 from "./Step5";
import Step6 from "./Step6";
import * as Yup from "yup";
import Router from "next/router";
import Link from "next/link";
import RecordPrayer from "../common/record-prayer";
import { api } from "../common/api";
import { toast } from "react-toastify";

interface Values {
  organizerName: string;
  organizerCell: string;
  nameOfPerson: string;
  socialMediaLink: string;
  pictureOfPerson: any;
  prayerFor: string;
  typeOfPrayer: string;
  customPrayerRequest: string;
  prayerPeriod: string;
  prayerDate: string | string[];
  prayerTime: string;
}

const PrayerRequestForm: FC = () => {
  const [step, setStep] = useState(1);
  const [showRecordPrayerScreen, setShowRecordPrayerScreen] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // step 1
      organizerName: "",
      organizerCell: "",
      nameOfPerson: "",
      socialMediaLink: "",
      pictureOfPerson: "",
      // step 2
      prayerFor: "",
      typeOfPrayer: "",
      // step 3
      customPrayerRequest: "",
      // step 4
      prayerPeriod: "",
      // step 5
      prayerDate: "",
      prayerTime: "",
    },
    validationSchema: validateStep[step - 1],
    onSubmit: (values: Values) => {
      step === 5 && createPrayer(values);
      step < 5 && nextStep();
    },
  });

  const nextStep = () => {
    setStep((currentStep) => Math.min(6, currentStep + 1));
  };

  const previousStep = () => {
    setStep((currentStep) => Math.max(1, currentStep - 1));
    step === 1 && Router.push("/");
  };

  const createPrayer = async (values: Values) => {
    try {
      const body: any = {
        // step 1
        organizers_name: values.organizerName,
        organizers_cell: values.organizerCell,
        prayer_need: {
          name: values.nameOfPerson,
          social_media_link: values.socialMediaLink,
          picture: values.pictureOfPerson,
        },
        // step 2
        reason: values.prayerFor,
        prayer_chain_type: Number(values.typeOfPrayer !== "public"),
        // step 3
        custom_request: values.customPrayerRequest,
        // step 4
        prayer_type: values.prayerPeriod,
        // step 5
        prayer_date: {
          period: values.prayerDate
            ? typeof values.prayerDate === "string"
              ? "daily"
              : "days"
            : "",
          days: values.prayerDate
            ? typeof values.prayerDate === "string"
              ? ""
              : values.prayerDate.join(", ")
            : "",
        },
        prayer_time: {
          period: values.prayerTime
            ? values.prayerTime === "hourly"
              ? "hourly"
              : "time"
            : "",
          time: values.prayerTime
            ? values.prayerTime === "hourly"
              ? ""
              : values.prayerTime
            : "",
        },
      };

      const { data }: any = await api({
        url: "/upsert",
        method: "post",
        body,
      });
      if (data) {
        const id = data?.data?._id;
        const secretId = data?.data?.secret_id;
        localStorage.setItem("SecretId", secretId);
        localStorage.setItem("PrayerChainId", id);
      }
      nextStep();

      toast.success("Prayer created successfully");
    } catch (err) {
      // @ts-ignore
      err.response && toast.error(err.message);
      toast.error("Prayer not created, please try again");
    }
  };

  return (
    <div className="px-4 py-7 flex flex-col min-h-screen">
      <div>
        <img src="/assets/icons/arrow-back.svg" alt="" onClick={previousStep} />
      </div>
      <div className="flex flex-col grow">
        <div className="grow overflow-x-hidden mt-7">
          {step === 1 && <Step1 formik={formik} />}
          {step === 2 && <Step2 formik={formik} />}
          {step === 3 && <Step3 formik={formik} />}
          {step === 4 && <Step4 formik={formik} />}
          {step === 5 && <Step5 formik={formik} />}
          {step === 6 && <Step6 formik={formik} />}
        </div>
        <div className="mt-4">
          {step !== 6 && (
            <button
              className={classNames(
                "bg-primary text-white rounded-md w-full py-4.5",
                {
                  "!bg-white text-primary border border-primary": step === 3,
                }
              )}
              onClick={() => formik.handleSubmit()}
            >
              {step === 5 ? "Submit" : "Next"}
            </button>
          )}
          {step === 3 && (
            <button
              className="bg-primary text-white rounded-md w-full py-4.5 mt-2.5"
              onClick={() => setShowRecordPrayerScreen(true)}
            >
              RECORD MESSAGE
            </button>
          )}
          {step === 6 && (
            <Link href="/public-feed">
              <a className="bg-black block text-white rounded-md w-full px-4 text-center py-4.5 mt-2.5">
                VIEW OTHER PRAYERS
              </a>
            </Link>
          )}
        </div>
      </div>
      {showRecordPrayerScreen && (
        <RecordPrayer
          closePlayer={() => setShowRecordPrayerScreen(false)}
          setLink={(fileLink: string) =>
            formik.setFieldValue("customPrayerRequest", fileLink)
          }
        />
      )}
    </div>
  );
};

export default PrayerRequestForm;

const validateStep = [
  Yup.object().shape({
    organizerName: Yup.string().required("Organizers name is required"),
    organizerCell: Yup.string().required("Organizers cell is required"),
    nameOfPerson: Yup.string().required(
      "Name of person needing prayer is required"
    ),
    socialMediaLink: Yup.string().required(
      "Link to their social media is required"
    ),
    pictureOfPerson: Yup.string().required("Pictuer of person is required"),
  }),
  Yup.object().shape({
    typeOfPrayer: Yup.string().required("Type of prayer is required"),
  }),
];
