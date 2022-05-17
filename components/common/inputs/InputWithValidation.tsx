import { FC } from "react";
import { TextField } from "@mui/material";
import Styles from "../styles";

interface Props {
  label: string;
  placeholder?: string;
  type?: string;
  style?: object;
  autoFocus?: boolean;
  formik: any;
  name: string;
  readOnly?: boolean;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
}

const InputWithValidation: FC<Props> = ({
  label = "",
  placeholder = "",
  type = "text",
  style = {},
  autoFocus = false,
  formik = {},
  name,
  readOnly = false,
  multiline = false,
  rows = 4,
  disabled = false,
  required = true,
}) => {
  return (
    <div>
      <TextField
        label={label}
        name={name}
        placeholder={placeholder}
        fullWidth
        type={type}
        required={required}
        color="primary"
        error={formik.touched[name] && formik.errors[name]}
        sx={{
          "& .MuiInputBase-multiline, & .MuiInputBase-input": {
            backgroundColor: readOnly ? Styles["read-only"] : "white",
          },
          ...style,
        }}
        value={formik.values[name] || ""}
        autoFocus={autoFocus}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        InputProps={{
          readOnly,
        }}
        multiline={multiline}
        rows={rows}
        disabled={disabled || (readOnly && !Boolean(formik.values[name]))}
      />

      {formik.touched[name] && formik.errors[name] && (
        <>
          <p className="text-red-500 text-sm mt-1 ml-1">
            {formik.errors[name]}
          </p>
        </>
      )}
    </div>
  );
};

export default InputWithValidation;
