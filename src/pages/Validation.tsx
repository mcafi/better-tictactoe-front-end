import { useEffect, useState } from "react";
import { BaseResponse, FormValues } from "../interfaces";
import { getDefaultFormValues } from "../utilities";
import "../style/Validation.css";

export function Validation() {
  const [formValues, setFormValues] = useState<FormValues>(
    getDefaultFormValues()
  );
  const test = async () => {
    const res = await fetch("http://localhost:3001/info/validate-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: BaseResponse = await res.json();
    console.log(data);
  };

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  return (
    <div className="page">
      <h1>Validation</h1>
      <form onSubmit={test}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formValues.name}
            onChange={(event) =>
              setFormValues({ ...formValues, name: event.target.value })
            }
          />
        </div>
        <div>
          <input
            type="number"
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
          <select
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
          <input
            type="date"
            name="dateOfBirth"
            value={formValues.dateOfBirth}
            onChange={(event) =>
              setFormValues({ ...formValues, dateOfBirth: event.target.value })
            }
          />
        </div>
        <button type="submit">Test</button>
      </form>
    </div>
  );
}
