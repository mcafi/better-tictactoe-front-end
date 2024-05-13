import { useId } from "react";

type InputWrapperProps = {
  label: string;
  type?: string;
  name: string;
  value: string;
  placeholder: string;
  onUpdateValue: (e: any) => void;
  errorMessage: string | null;
  showErrorMessage: boolean;
};

export function InputWrapper({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onUpdateValue,
  errorMessage,
  showErrorMessage,
}: InputWrapperProps) {
  const inputID = useId();
  return (
    <>
      <label htmlFor={inputID}>{label}</label>
      <input
        type={type}
        id={inputID}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onUpdateValue(e.target.value)}
        className={errorMessage && showErrorMessage ? "input-error" : ""}
      ></input>
      <p className="validation validation-error">
        {errorMessage && showErrorMessage ? errorMessage : <span>&nbsp;</span>}
      </p>
    </>
  );
}
