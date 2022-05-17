import { FC } from "react";
import InputWithValidation from "../common/inputs/InputWithValidation";
import ImageUpload from "./ImageUpload";

interface Props {
  formik: any;
}

const Step1: FC<Props> = ({ formik = {} }) => {
  return (
    <div className="">
      <div className="">
        <div className="font-inter text-4xl">Prayerchain Request</div>
        <div className="mt-5 space-y-4">
          <InputWithValidation
            formik={formik}
            name="organizerName"
            label="Organizers Name"
          />
          <InputWithValidation
            formik={formik}
            name="organizerCell"
            label="Organizers Cell"
          />
        </div>
      </div>
      <div className="mt-6">
        <div className="font-inter text-4xl">Who needs Prayer?</div>
        <div className="mt-5 space-y-4">
          <InputWithValidation
            formik={formik}
            name="nameOfPerson"
            label="Name of person needing prayer"
          />
          <InputWithValidation
            formik={formik}
            name="socialMediaLink"
            label="Link to their Social Media"
          />
          <div className="pt-4">
            <ImageUpload
              name="pictureOfPerson"
              onChange={(file: any) =>
                formik.setFieldValue("pictureOfPerson", file)
              }
            />
            {formik.errors.pictureOfPerson && (
              <p className="text-red-500 mt-1 text-xs">
                {formik.errors.pictureOfPerson}
              </p>
            )}
            {formik.values.pictureOfPerson && (
              <p className="text-green-500 mt-1 text-xs">
                Profile picture uploaded
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
