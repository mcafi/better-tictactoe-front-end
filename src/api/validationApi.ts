import { BaseResponse, FormValues } from "../interfaces";

export async function validateForm(
  formValues: FormValues
): Promise<BaseResponse> {
  const res = await fetch("http://localhost:3001/info/validate-form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });
  const data: BaseResponse = await res.json();
  return data;
}
