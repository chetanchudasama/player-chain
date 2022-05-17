import { FC } from "react";
import InputWithValidation from "../common/inputs/InputWithValidation";

interface Props {
  formik: any;
}

const Step3: FC<Props> = ({ formik = {} }) => {
  return (
    <div className="">
      <div className="">
        <div className="font-inter text-4xl">
          Draft your custom Prayer Request
        </div>
        <div className="mt-7.5">
          <InputWithValidation
            formik={formik}
            name="customPrayerRequest"
            label="Write your custom request here"
            multiline={true}
            rows={6}
            required={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Step3;
