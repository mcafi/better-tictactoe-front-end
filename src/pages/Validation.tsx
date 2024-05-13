import { useEffect, useMemo, useState } from "react";
import { FormStatus, FormValues, ValidationError } from "../interfaces";
import { getDefaultFormValues, getValidationErrorMessage } from "../utilities";
import "../style/Validation.css";
import { validateForm } from "../api/validationApi";
import { InputWrapper } from "../components/InputWrapper";
import { LoadingStatus } from "../components/LoadingStatus";

export function Validation() {
  const [formValues, setFormValues] = useState<FormValues>(
    getDefaultFormValues()
  );
  const [status, setStatus] = useState<FormStatus>(FormStatus.IDLE);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(FormStatus.LOADING);
    try {
      const res = await validateForm(formValues);
      if (res.success) {
        setStatus(FormStatus.VALID);
      } else {
        setStatus(FormStatus.INVALID);
        setErrors(res.errors);
      }
    } catch (error) {
      setStatus(FormStatus.ERROR);
    }
  };

  const nameError = useMemo(() => {
    if (!errors.length || status !== FormStatus.INVALID) return null;
    return getValidationErrorMessage("name", errors);
  }, [errors, status]);

  const ageError = useMemo(() => {
    if (!errors.length || status !== FormStatus.INVALID) return null;
    return getValidationErrorMessage("age", errors);
  }, [errors, status]);

  const marriedError = useMemo(() => {
    if (!errors.length || status !== FormStatus.INVALID) return null;
    return getValidationErrorMessage("married", errors);
  }, [errors, status]);

  const dateOfBirthError = useMemo(() => {
    if (!errors.length || status !== FormStatus.INVALID) return null;
    return getValidationErrorMessage("dateOfBirth", errors);
  }, [errors, status]);

  useEffect(() => {
    setStatus(FormStatus.IDLE);
  }, [formValues]);

  return (
    <div className="page">
      <div className="container">
        <h1>Validation</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <InputWrapper
              name="name"
              label="Name"
              placeholder="Name"
              value={formValues.name}
              onUpdateValue={(value) =>
                setFormValues({ ...formValues, name: value })
              }
              errorMessage={nameError}
              showErrorMessage={status === FormStatus.INVALID}
            />
          </div>
          <div>
            <InputWrapper
              type="number"
              name="age"
              label="Age"
              placeholder="Age"
              value={String(formValues.age)}
              onUpdateValue={(value) =>
                setFormValues({ ...formValues, age: parseInt(value) })
              }
              errorMessage={ageError}
              showErrorMessage={status === FormStatus.INVALID}
            />
          </div>
          <div>
            <label htmlFor="married">Married</label>
            <select
              id="married"
              name="married"
              value={String(formValues.married)}
              className={
                marriedError && status === FormStatus.INVALID
                  ? "input-error"
                  : ""
              }
              onChange={(event) =>
                setFormValues({
                  ...formValues,
                  married:
                    event.target.value === ""
                      ? null
                      : event.target.value === "true",
                })
              }
            >
              <option value="">Choose an option</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <p className="validation validation-error">
              {marriedError && status === FormStatus.INVALID ? (
                marriedError
              ) : (
                <span>&nbsp;</span>
              )}
            </p>
          </div>
          <div>
            <InputWrapper
              type="date"
              name="dateOfBirth"
              label="Date of Birth"
              placeholder="Date of Birth"
              value={formValues.dateOfBirth}
              onUpdateValue={(value) =>
                setFormValues({ ...formValues, dateOfBirth: value })
              }
              errorMessage={dateOfBirthError}
              showErrorMessage={status === FormStatus.INVALID}
            />
          </div>
          <button type="submit" disabled={status === FormStatus.LOADING}>
            Validate data
          </button>
          <LoadingStatus formStatus={status} />
        </form>
      </div>
    </div>
  );
}
