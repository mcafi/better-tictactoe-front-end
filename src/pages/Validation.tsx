import { useEffect, useState } from "react";
import { BaseResponse, FormStatus, FormValues } from "../interfaces";
import { getDefaultFormValues } from "../utilities";
import "../style/Validation.css";

export function Validation() {
  const [formValues, setFormValues] = useState<FormValues>(
    getDefaultFormValues()
  );
  const [status, setStatus] = useState<FormStatus>(FormStatus.IDLE);

  const test = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(FormStatus.LOADING);
    try {
      const res = await fetch("http://localhost:3001/info/validate-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      const data: BaseResponse = await res.json();
      console.log(data);
    } catch (error) {
      setStatus(FormStatus.ERROR);
    }
  };

  useEffect(() => {
    setStatus(FormStatus.IDLE);
  }, [formValues]);

  return (
    <div className="page">
      <h1>Validation</h1>
      <form onSubmit={test}>
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
