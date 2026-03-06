import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Button from '../Button'

describe('Button component', () => {
    it('shouldRenderTheLabelCorrectly', ()=> {
        render(<Button label="sign up" type="submit" />)
        expect(screen.getByText('sign up')).toBeInTheDocument()
    })

  it('shouldRenderButtonElement', () => {
    render(<Button label="Sign Up" type="submit" />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('shouldHaveTheCorrectTypeAttribute', () => {
    render(<Button label="Submit" type="submit" />)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('shouldHaveTheCorrectTypeAttributeWhenTypeIsReset', () => {
    render(<Button label="Reset" type="reset" />)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'reset')
  })

})