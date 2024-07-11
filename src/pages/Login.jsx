import { login } from "../services/authService"
import { useState } from "react"
import { Button, Link } from "@mui/material"
import Spinner from "../components/Spinner"
import InputField from "../components/InputField";
import { Link as RouterLink } from "react-router-dom";


export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(undefined);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(undefined);
  const [valid, setValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function changeEmail(value) {
    setEmail(value.trim())
    validity()
  }

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

  function validity() {
    if (passwordError === false &&
      emailError === false
    ) {
      setValid(true)
    } else {
      setValid(false)
    }
  }

  async function handleLogin() {
    setIsLoading(true)
    const loginresult = await login({
        email: email,
        password: password
      })
    if (!loginresult) {
      setIsLoading(false)
      setEmail('')
      setPassword('')
      return
    }
    onLogin()
  }
  
  if (isLoading) {
    return (
      <Spinner></Spinner>
    )
  }

  return (
    <div className="content">
      <h1>Login</h1>
      <InputField label="Email" type="email" value={email} onChange={changeEmail} />
      <InputField label="Password" type="password" vlaue={password} onChange={changePassword} />
      <Button variant="contained" disabled={!valid} onClick={handleLogin}>Login</Button>
      <p>Don't have an account yet?  <Link underline="hover" to="/register" component={RouterLink}>Register</Link></p>
    </div>
  )
}