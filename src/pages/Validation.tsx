import { useEffect, useMemo, useState } from "react";
import { FormStatus, FormValues, ValidationError } from "../interfaces";
import { getDefaultFormValues, getValidationErrorMessage } from "../utilities";
import "../style/Validation.css";
import { validateForm } from "../api/validationApi";

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
      <h1>Validation</h1>
      {nameError}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formValues.name}
            onChange={(event) =>
              setFormValues({ ...formValues, name: event.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Age"
            value={formValues.age}
            onChange={(event) =>
              setFormValues({
                ...formValues,
                age: parseInt(event.target.value),
              })
            }
          />
        </div>
        <div>
          <label htmlFor="married">Married</label>
          <select
            id="married"
            name="married"
            value={String(formValues.married)}
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
        </div>
        <div>
          <label htmlFor="date">Date of Birth</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formValues.dateOfBirth}
            onChange={(event) =>
              setFormValues({
                ...formValues,
                dateOfBirth: event.target.value,
              })
            }
          />
        </div>
        <button type="submit" disabled={status === FormStatus.LOADING}>
          Test
        </button>
        {status === FormStatus.LOADING && <div>Loading...</div>}
        {status}
      </form>
    </div>
  );
}
