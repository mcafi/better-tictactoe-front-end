import { FormValues, ValidationError } from "../interfaces";

export function getDefaultFormValues(): FormValues {
  return {
    name: "",
    age: 0,
    married: false,
    dateOfBirth: "",
  };
}

export function getValidationErrorMessage(
  property: string,
  errors: ValidationError[]
): string | null {
  const validationError = errors.find((error) => error.property === property);
  if (!validationError) {
    return null;
  }
  if (validationError.constraints) {
    return Object.values(validationError.constraints).join(", ");
  }
  return null;
}
