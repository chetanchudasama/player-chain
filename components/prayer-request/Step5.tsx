import { FC } from "react";
import classNames from "classnames";
import { Slider } from "@mui/material";

interface Props {
  formik: any;
}

interface Days {
  index: number;
  short: string;
  full: string;
}

let days = [
  {
    index: 0,
    short: "s",
    full: "sunday",
  },
  {
    index: 1,
    short: "m",
    full: "monday",
  },
  {
    index: 2,
    short: "t",
    full: "tuesday",
  },
  {
    index: 3,
    short: "w",
    full: "wednesday",
  },
  {
    index: 4,
    short: "th",
    full: "thursday",
  },
  {
    index: 5,
    short: "f",
    full: "friday",
  },
  {
    index: 6,
    short: "s",
    full: "saturday",
  },
];

const getTime = (value: string) => {
  let milliseconds;
  let hour = +value.split(":")[0];
  let minute = +value.split(":")[1].slice(0, 2);
  let ampm = value.slice(-2);
  milliseconds =
    (((ampm === "PM" ? (hour === 12 ? 0 : 12) : 0) + hour) * 60 + minute) *
    60 *
    1000;
  if (hour === 12 && ampm === "AM") {
    milliseconds = 0;
  }
  return milliseconds;
};

const setTime = (value: number) => {
  let hour, minute, ampm;
  hour = Math.floor(value / (1000 * 60 * 60));
  minute = (value / (1000 * 60)) % 60;
  ampm = hour < 12 ? "AM" : "PM";
  return `${
    hour % 12 === 0 && ampm === "PM" ? 12 : hour % 12 === 0 ? 12 : hour % 12
  }:${minute.toString().length === 1 ? "0" : ""}${minute} ${ampm}`;
};

const Step5: FC<Props> = ({ formik = {} }) => {
  return (
    <div className="">
      <div className="mt-6">
        <div className="font-inter text-4xl">Select your Prayer Date</div>
        <div className="mt-5 space-y-4 font-roboto">
          <div className="grid grid-cols-2 gap-x-4">
            <button
              onClick={() => formik.setFieldValue("prayerDate", "daily")}
              className={classNames(
                "p-4 w-full border border-primary rounded text-left",
                {
                  "bg-primary text-white": formik.values.prayerDate === "daily",
                }
              )}
            >
              Daily
            </button>
            <button
              onClick={() =>
                formik.setFieldValue(
                  "prayerDate",
                  Array.isArray(formik.values.prayerDate)
                    ? formik.values.prayerDate
                    : ["monday"]
                )
              }
              className={classNames(
                "p-4 w-full border border-primary rounded overflow-x-hidden text-left",
                {
                  "bg-primary text-white": Array.isArray(
                    formik.values.prayerDate
                  ),
                }
              )}
            >
              <div className="whitespace-nowrap overflow-x-auto capitalize">
                {Array.isArray(formik.values.prayerDate)
                  ? formik.values.prayerDate.length > 0
                    ? formik.values.prayerDate.join(", ")
                    : ["monday"]
                  : "monday"}
              </div>
            </button>
          </div>
        </div>
        {Array.isArray(formik.values.prayerDate) && (
          <div className="mt-6 flex space-x-2">
            {days.map((day: Days) => (
              <div
                className={classNames(
                  "w-10 h-10 capitalize text-sm flex items-center justify-center border border-primary text-primary rounded-full",
                  {
                    "bg-primary !text-white border-none":
                      formik.values.prayerDate.includes(day.full),
                  }
                )}
                key={day.index}
                onClick={() =>
                  formik.setFieldValue(
                    "prayerDate",
                    formik.values.prayerDate.includes(day.full)
                      ? formik.values.prayerDate.filter(
                          (d: string) => d !== day.full
                        )
                      : [...formik.values.prayerDate, day.full].sort(
                          (a: string, b: string) => {
                            return (
                              days.findIndex((d) => d.full === a) -
                              days.findIndex((d) => d.full === b)
                            );
                          }
                        )
                  )
                }
              >
                {day.short}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-7.5">
        <div className="font-inter text-4xl">Select your Prayer Time</div>
        <div className="mt-9 space-y-4 font-roboto">
          <div className="grid grid-cols-2 gap-x-4">
            <button
              onClick={() => formik.setFieldValue("prayerTime", "hourly")}
              className={classNames(
                "p-4 w-full border border-primary rounded text-left",
                {
                  "bg-primary text-white":
                    formik.values.prayerTime === "hourly",
                }
              )}
            >
              Hourly
            </button>
            <button
              onClick={() =>
                formik.setFieldValue(
                  "prayerTime",
                  formik.values.prayerTime &&
                    formik.values.prayerTime !== "hourly"
                    ? formik.values.prayerTime
                    : "12:00 AM"
                )
              }
              className={classNames(
                "p-4 w-full border border-primary rounded overflow-x-hidden capitalize text-left",
                {
                  "bg-primary text-white":
                    formik.values.prayerTime &&
                    formik.values.prayerTime !== "hourly",
                }
              )}
            >
              {formik.values.prayerTime && formik.values.prayerTime !== "hourly"
                ? formik.values.prayerTime
                : "12:00 AM"}
            </button>
          </div>
          {formik.values.prayerTime && formik.values.prayerTime !== "hourly" && (
            <div className="mt-6">
              <Slider
                aria-label="Prayer Time"
                value={getTime(formik.values.prayerTime)}
                valueLabelDisplay="off"
                step={30 * 60 * 1000}
                min={0}
                max={Math.floor(24 * 60 * 60 * 1000 - 60 * 1000)}
                // @ts-ignore
                onChange={(e: any, value: number) =>
                  formik.setFieldValue("prayerTime", setTime(value))
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step5;
