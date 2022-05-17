import { ChangeEvent, FC } from "react";
import { TextField } from "@mui/material";
import Styles from "../styles";

interface Props {
  label: string;
  placeholder?: string;
  value: string | number;
  setValue?: (value: any) => void;
  type?: string;
  style?: object;
  autoFocus?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
}

const Input: FC<Props> = ({
  label = "",
  placeholder = "",
  value = "",
  setValue = () => {},
  type = "text",
  style = {},
  autoFocus = false,
  readOnly = false,
  disabled = false,
  multiline = false,
  rows = 4,
}) => {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      fullWidth
      type={type}
      color="primary"
      sx={{
        "& .MuiInputBase-input": {
          backgroundColor: readOnly ? Styles["read-only"] : "white",
        },
        ...style,
      }}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      autoFocus={autoFocus}
      InputProps={{
        readOnly,
      }}
      disabled={disabled || (readOnly && !Boolean(value))}
      multiline={multiline}
      rows={rows}
    />
  );
};

export default Input;
