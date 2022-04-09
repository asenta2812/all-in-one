import { ErrorAlert } from '@components/alerts'
import Container from '@containers'
import AuthenticateContainer from '@containers/authenticate'
import { signInUserAction } from '@redux/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
function SignInPage() {
  const [title, setTitle] = useState(' ')
  const dispatch = useDispatch()
  const url = useLocation().pathname

  const onFinish = async (credentials) => {
    await dispatch(signInUserAction(credentials))
  }

  const onFinishFailed = ({ errorFields }) => {
    if (errorFields && errorFields.length > 0) {
      ErrorAlert('Failed : ' + errorFields[0]?.errors[0])
    }
  }

  useEffect(() => {
    if (url.includes('signin')) {
      setTitle('Welcome Back')
    } else {
      setTitle('Sign In To Continue')
    }
  }, [url])
  return (
    <Container>
      <AuthenticateContainer
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        title={title}
      />
    </Container>
  )
}

export default SignInPage
