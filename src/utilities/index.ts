import { FormValues } from "../interfaces";

export function getDefaultFormValues(): FormValues {
  return {
    name: "",
    age: 0,
    married: false,
    dateOfBirth: "",
  };
}
