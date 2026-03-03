import { ErrorMessage } from "formik";

type ErrorProps = {
    name: string;
}

const Error = ({ name }: ErrorProps): React.JSX.Element => {
    return (
        <ErrorMessage name={name}>
            {(msg) => <div className="text-xs text-red-500 mt-0.5 font-semibold">{msg}</div>}
        </ErrorMessage>
    )
}

export default Error;