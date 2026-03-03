import { Field } from "formik";

type OptionType = {
    value: string;
    label: string;
}

type SelectFieldProps = {
    name: string;
    label: string;
    options: OptionType[];
}

const SelectField = ({ label, name, options }: SelectFieldProps): React.JSX.Element => {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-sm font-medium text-neutral-700">
                {label}
            </label>
            <Field
                as="select"
                id={name}
                name={name}
                className="p-2.5 rounded-lg border text-sm outline-none transition-all duration-200"
            >
                <option value="">Select {label}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </Field>
        </div>
    );
};

export default SelectField;