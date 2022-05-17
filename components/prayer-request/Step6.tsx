import { FC } from "react";

interface Props {
  formik: any;
}

const Step6: FC<Props> = ({ formik = {} }) => {
  return (
    <div className="space-y-11">
      <p className="font-inter text-4xl">
        Thank you for submitting your request for {formik.values.nameOfPerson}.
      </p>
      <p className="font-inter text-4xl">
        We have sent over your custom Prayerchain to you provided.
      </p>
    </div>
  );
};

export default Step6;
