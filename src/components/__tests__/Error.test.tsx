import { render, screen } from '@testing-library/react'
import { Formik, Form } from 'formik'
import Error from '../Error'
import { describe, expect, it } from 'vitest'
const renderWithFormik = (
    name: string,
    initialError: Record<string, string> = {},
    initialTouched: Record<string, boolean> = {}
) => {
    return render(
        <Formik
            initialValues={
                {
                    [name]: ''
                }
            }
            initialErrors={initialError}
            initialTouched={initialTouched}
            onSubmit={() => { }}>
            <Form>
                <Error name={name} />
            </Form>
        </Formik>
    )
}
describe("Error Component", () => {
    it("shouldRender", () => {
        const { container } = renderWithFormik("email");
        expect(container).toBeTruthy();
    })

    it("shouldNotDisplayErrorWhenThereIsNoError", () => {
        renderWithFormik("email");
        expect(screen.queryByRole("generic", { name: /error/i })).not.toBeInTheDocument();
    });
})