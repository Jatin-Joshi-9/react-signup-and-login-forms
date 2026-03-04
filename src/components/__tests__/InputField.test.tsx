import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Formik, Form } from 'formik'
import InputField from '../InputField'


const renderWithFormik = (ui: React.ReactNode) => {
  return render(
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Form>{ui}</Form>
    </Formik>
  )
}

describe('InputField component', () => {


  it('shouldRenderTheLabelCorrectly', () => {
    renderWithFormik(<InputField label="Email" name="email" type="email" />)
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('shouldAssociateLabelWithInputViaHtmlFor', () => {
    renderWithFormik(<InputField label="Email" name="email" type="email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })


  it('shouldRenderAnInputWhenTypeIsText', () => {
    renderWithFormik(<InputField label="Full Name" name="name" type="text" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('shouldRenderAnInputWithCorrectTypeAttribute', () => {
    renderWithFormik(<InputField label="Password" name="password" type="password" />)
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password')
  })


  it('shouldRenderATextareaWhenTypeIsTextarea', () => {
    renderWithFormik(<InputField label="Description" name="description" type="textarea" rows={4} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).not.toHaveAttribute('type')
  })

  it('shouldRenderTextareaWithCorrectRowsAttribute', () => {
    renderWithFormik(<InputField label="Description" name="description" type="textarea" rows={6} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '6')
  })

})