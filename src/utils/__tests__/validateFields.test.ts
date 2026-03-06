import { describe, it, expect } from 'vitest'
import { validateLogin, validateSignup } from '../validateFields'

describe('validateSignup', () => {

  it('shouldReturnsErrorWhenNameIsEmpty', () => {
    const errors = validateSignup({ name: '', email: '', password: '', confirmPassword: '' })
    expect(errors.name).toBe('Name is required')
  })

  it('shouldReturnsErrorWhenNameContainsNumbers', () => {
    const errors = validateSignup({ name: 'Jatin123', email: '', password: '', confirmPassword: '' })
    expect(errors.name).toBe('Name must only contain letters')
  })

  it('shouldReturnsErrorForInvalidEmail', () => {
    const errors = validateSignup({ name: 'Jatin', email: 'not-an-email', password: '', confirmPassword: '' })
    expect(errors.email).toBe('Enter a valid email')
  })
  it('shouldReturnsErrorWhenEmailExceedsMaxLength', () => {
    const longEmail = 'a'.repeat(101) + '@example.com';
    const errors = validateSignup({ name: 'Jatin', email: longEmail, password: '', confirmPassword: '' })
    expect(errors.email).toBe('Email must not exceed 100 characters')
  })

  it('shouldReturnsErrorWhenPasswordIsTooShort', () => {
    const errors = validateSignup({ name: 'Jatin', email: 'j@j.com', password: 'Ab1!', confirmPassword: '' })
    expect(errors.password).toBe('Password must be 8 to 16 characters long')
  })
  it('shouldReturnsErrorWhenPasswordLacksUppercase', () => {
    const errors = validateSignup({ name: 'Jatin', email: 'j@j.com', password: 'abcdef1!', confirmPassword: '' })
    expect(errors.password).toBe('Password must include uppercase, lowercase, number & special character')
  })
  it('shouldReturnsErrorWhenPasswordsDoNotMatch', () => {
    const errors = validateSignup({ name: 'Jatin', email: 'j@j.com', password: 'Abcdef1!', confirmPassword: 'different' })
    expect(errors.confirmPassword).toBe('Passwords do not match')
  })

  it('shouldReturnsNoErrorsForValidInput', () => {
    const errors = validateSignup({
      name: 'Jatin',
      email: 'jatin@example.com',
      password: 'Abcdef1!',
      confirmPassword: 'Abcdef1!',
    })
    expect(Object.keys(errors)).toHaveLength(0)
  })

})

describe('validateLogin', () => {

    it('shouldReturnsErrorWhenEmailIsEmpty', () => {
        const errors = validateLogin({ email: '', password: '' })
        expect(errors.email).toBe('Email is required')
    })

    it('shouldReturnsErrorForInvalidEmail', () => {
        const errors = validateLogin({ email: 'not-an-email', password: '' })
        expect(errors.email).toBe('Enter a valid email address')
    })

    it('shouldReturnsErrorWhenPasswordIsEmpty', () => {
        const errors = validateLogin({ email: 'j@j.com', password: '' })
        expect(errors.password).toBe('Password is required')
    })

    it('shouldReturnsNoErrorsForValidInput', () => {
        const errors = validateLogin({
            email: 'j@j.com',
            password: 'Abcdef1!',
        })
        expect(Object.keys(errors)).toHaveLength(0)
    })

})
