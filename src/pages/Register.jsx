import { Button, Link } from "@mui/material"
import InputField from "../components/InputField"
import { useState } from 'react'
import { register } from "../services/authService"
import Spinner from "../components/Spinner"
import { Link as RouterLink } from "react-router-dom"

export default function Register({ onLogin }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(undefined)
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(undefined)
  const [repeatPassword, setRepeatPassword] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState(undefined)
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState(undefined)
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState(undefined)
  const [valid, setValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function changeEmail(value) {
    setEmail(value.trim())
    if (value.includes('@')) {
      const position = value.indexOf('@') + 1
      if (!value.includes('@', position) && value.includes('.', position)) {
        setEmailError(false)
      } else {
        setEmailError(true)
      }
    } else {
      setEmailError(true)
    }
    validity()
  }

  function changePassword(value) {
    setPassword(value.trim())
    if (value.length >= 8) {
      setPasswordError(false)
    } else {
      setPasswordError(true)
    }
    validity()
  }

  function changeRepeatPassword(value) {
    setRepeatPassword(value.trim())
    if (value === password) {
      setRepeatPasswordError(false)
    } else {
      setRepeatPasswordError(true)
    }
    validity()
  }

  function changeFirstName(value) {
    setFirstName(value)
    if (value.length >= 3) {
      setFirstNameError(false)
    } else {
      setFirstNameError(true)
    }
    validity()
  }

  function changeLastName(value) {
    setLastName(value)
    if (value.length >= 3) {
      setLastNameError(false)
    } else {
      setLastNameError(true)
    }
    validity()
  }

  function validity() {
    if (emailError === false &&
      firstNameError === false &&
      lastNameError === false &&
      passwordError === false &&
      repeatPasswordError === false
    ) {
      setValid(true)
    } else {
      setValid(false)
    }
  }

  async function handleRegister() {
    try {
      setIsLoading(true)
      await register({
        email: email,
        password: password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        isPublisher: false
      })
    } catch (err) {
      setIsLoading(false)
      setEmail('')
      setPassword('')
      setRepeatPassword('')
      setFirstName('')
      setLastName('')
      return
    }
    onLogin()
  }

  if (isLoading) {
    <Spinner></Spinner>
  }

  return (
    <div className="content">
      <h1>Register</h1>
      <InputField label="Name" type="text" error={lastNameError} errorText="Name has to consist of at least 3 chars." value={lastName} onChange={changeLastName} />
      <InputField label="Prename" type="text" error={firstNameError} errorText="Prename has to consist of at least 3 chars." value={firstName} onChange={changeFirstName} />
      <InputField label="Email" type="email" error={emailError} errorText="Email not valid." value={email} onChange={changeEmail} />
      <InputField label="Password" type="password" error={passwordError} errorText="Password has to consist of at least 8 chars." value={password} onChange={changePassword} />
      <InputField label="Repeat Password" type="password" error={repeatPasswordError} errorText="Passwords are not identical." value={repeatPassword} onChange={changeRepeatPassword} />
      <Button variant="contained" disabled={!valid} onClick={handleRegister}>Register</Button>
      <p>Have already an account? <Link underline="hover" to="/login" component={RouterLink}>Login</Link></p>
    </div>
  )
}