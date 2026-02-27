import { Form, Formik } from "formik";
import InputField from "./InputField";
import Button from "./Button";
import type { TicketType } from "../types/ticket";
import { validateTicket } from "../utils/validateTicket";
import axios from "axios";
import { createTicket } from "../services/ticket.service";
import toast from "react-hot-toast";

const initialValues: TicketType = {
    title: "",
    description: "",
}

const CreateTicket = () => {
    const handleSubmit = async (values: TicketType) => {
        try {
            const data = await createTicket(values)
            if (data.success) {
                toast.success(data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Something went wrong. Try again");
            }
        }
    }
    return (
        <section className="w-full flex items-center justify-center mt-20">
            <div className="w-full p-8 max-w-md bg-white rounded-2xl border border-neutral-200 space-y-6">
                <h1 className="text-xl sm:text-2xl text-center font-extrabold">Create Ticket</h1>

                <Formik
                    initialValues={initialValues}
                    validate={validateTicket}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="flex flex-col gap-4">
                            <InputField
                                label="Title"
                                name="title"
                                type="text"
                            />

                            <InputField 
                                label="Description"
                                name="description"
                                type="textarea"
                            />
                            
                            <div className="mt-2">
                                <Button
                                    label="Create Ticket"
                                    type="submit"
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    )
}

export default CreateTicket;