import { Form, Formik } from "formik";
import InputField from "./InputField";
import Button from "./Button";
import { validateComment } from "../utils/validateTicket";
import axios from "axios";
import toast from "react-hot-toast";
import { addComment } from "../api/ticket.api";

const AddComment = ({ id }: { id: string | undefined }): React.ReactNode => {
    const handleSubmit = async (values: { body: string }) => {
        try {
            const data = await addComment(id, values.body);
            if (data.success) {
                toast.success(data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message);
            }
        }
    }

    return (
        <div className="border-t border-neutral-200 pt-4 space-y-4">
            <h1 className="font-semibold">Add Comment</h1>

            <Formik
                initialValues={{ body: "" }}
                validate={validateComment}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form className="flex flex-col gap-4">
                        <InputField
                            label=""
                            name="body"
                            type="textarea"
                            rows={4}
                        />

                        <div className="mt-2">
                            <Button
                                label="Add Comment"
                                type="submit"
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddComment;