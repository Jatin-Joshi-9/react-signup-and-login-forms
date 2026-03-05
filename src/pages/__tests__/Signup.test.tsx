import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Signup from '../Signup'
import { userSignup } from '../../api/auth.api'
import toast from 'react-hot-toast'


vi.mock('../../api/auth.api', () => ({
  userSignup: vi.fn(),
}))

vi.mock('react-hot-toast', () => ({
  default: { success: vi.fn(), error: vi.fn() },
}))

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

const renderSignup = () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  )
}

const fillFormWithValidData = async () => {
  await userEvent.type(screen.getByLabelText('Full Name'), 'Jatin Joshi')
  await userEvent.type(screen.getByLabelText('Email'), 'jatin@jj.com')
  await userEvent.type(screen.getByLabelText('Password'), 'Abcdef1!')
  await userEvent.type(screen.getByLabelText('Confirm Password'), 'Abcdef1!')
}


describe('Signup Page', () => {

  beforeEach(() => {
    vi.clearAllMocks() 
  })


  it('shouldRenderAllFormFields', () => {
    renderSignup()
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument()
  })

  it('shouldRenderTheSignupButton', () => {
    renderSignup()
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument()
  })

  it('shouldRenderTheLoginLink', () => {
    renderSignup()
    expect(screen.getByRole('link', { name: 'Login' })).toBeInTheDocument()
  })


  it('shouldShowValidationErrorsWhenFormIsSubmittedEmpty', async () => {
    renderSignup()
    await userEvent.click(screen.getByRole('button', { name: 'Sign Up' }))

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(screen.getByText('Password is required')).toBeInTheDocument()
      expect(screen.getByText('Please confirm your password')).toBeInTheDocument()
    })
  })

  it('shouldShowErrorWhenPasswordsDoNotMatch', async () => {
    renderSignup()
    await userEvent.type(screen.getByLabelText('Password'), 'Abcdef1!')
    await userEvent.type(screen.getByLabelText('Confirm Password'), 'Different1!')
    await userEvent.click(screen.getByRole('button', { name: 'Sign Up' }))

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument()
    })
  })

  it('shouldNotCallAPIWhenFormHasValidationErrors', async () => {
    renderSignup()
    await userEvent.click(screen.getByRole('button', { name: 'Sign Up' }))

    await waitFor(() => {
      expect(userSignup).not.toHaveBeenCalled()
    })
  })


  it('shouldCallUserSignupWithCorrectValuesOnValidSubmission', async () => {
    vi.mocked(userSignup).mockResolvedValue({ success: true, message: 'Registered!' })
    renderSignup()

    await fillFormWithValidData()
    await userEvent.click(screen.getByRole('button', { name: 'Sign Up' }))

    await waitFor(() => {
      expect(userSignup).toHaveBeenCalledWith({
        name: 'Jatin Joshi',
        email: 'jatin@jj.com',
        password: 'Abcdef1!',
        confirmPassword: 'Abcdef1!',
      })
    })
  })

  it('shouldShowSuccessToastOnSuccessfulSignup', async () => {
    vi.mocked(userSignup).mockResolvedValue({ success: true, message: 'Account created!' })
    renderSignup()

    await fillFormWithValidData()
    await userEvent.click(screen.getByRole('button', { name: 'Sign Up' }))

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Account created!')
    })
  })

  it('shouldNavigateToLoginOnSuccessfulSignup', async () => {
    vi.mocked(userSignup).mockResolvedValue({ success: true, message: 'Account created!' })
    renderSignup()

    await fillFormWithValidData()
    await userEvent.click(screen.getByRole('button', { name: 'Sign Up' }))

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login')
    })
  })


})