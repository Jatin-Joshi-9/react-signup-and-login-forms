import { useField } from "formik";

type CheckboxFieldProps = {
    name: string;
    label: string;
    type: string;
    value?: string;
}

const CheckboxField = ({ label, ...props }: CheckboxFieldProps):React.JSX.Element => {
    const [field] = useField(props);

    return (
        <div className="flex items-center gap-2">
            <input
                id={props.name}
                {...field}
                {...props}
                className="cursor-pointer"
            />

            <label
                htmlFor={props.name}
                className="text-sm font-medium text-neutral-700"
            >
                {label}
            </label>
        </div>
    )
}

export default CheckboxField;