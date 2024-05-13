import { FormStatus } from "../interfaces";

export function LoadingStatus({ formStatus }: { formStatus: FormStatus }) {
  switch (formStatus) {
    case FormStatus.LOADING:
      return <div className="validation">Loading...</div>;
    case FormStatus.ERROR:
      return (
        <div className="validation validation-error">An error occurred</div>
      );
    case FormStatus.VALID:
      return (
        <div className="validation validation-success">
          Data provided is valid!
        </div>
      );
    case FormStatus.INVALID:
      return (
        <div className="validation validation-error">
          Data provided is not valid, check the details above
        </div>
      );
    default:
      return <div className="validation">&nbsp;</div>;
  }
}
