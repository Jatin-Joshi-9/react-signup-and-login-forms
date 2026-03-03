import { Field } from "formik";

type InputFieldProps = {
    name: string;
    label: string;
    type: string;
    rows?: number;
}

const InputField = ({label,name,type,rows}: InputFieldProps): React.JSX.Element => {
    const isTextarea =(type === "textarea");

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-sm font-medium text-neutral-700">
                {label}
            </label>
            <Field
                as={isTextarea ? "textarea" : undefined}
                id={name}
                name={name}
                type={!isTextarea ? type : undefined}
                rows={isTextarea ? rows : undefined}
                className="px-4 py-2.5 rounded-lg border text-sm outline-none transition-all duration-200"
            />
        </div>
    )
}

export default InputField;