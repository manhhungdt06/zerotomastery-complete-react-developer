import React, { useState } from 'react'
import { connect } from 'react-redux'

import {
  googleSignInStart,
  emailSignInStart
} from '../../redux/user/user.actions'

// components
import FormInput from '../FormInput/FormInput'
import CustomButton from '../CustomButton/CustomButton'

import './SignIn.scss'

function SignIn({ googleSignInStart, emailSignInStart }) {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: ''
  })

  const { email, password } = userCredentials

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Sign in with email and password
      emailSignInStart(email, password)
    } catch (error) {
      console.error('error signing in user. ', error)
    }
    // Clear out form inputs
    setUserCredentials({ ...userCredentials, email: '', password: '' })
  }

  const onInputChange = (e) => {
    const { name, value } = e.target
    setUserCredentials({ ...userCredentials, [name]: value })
  }

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          handleChange={onInputChange}
          value={email}
          label='email'
          required
        />
        <FormInput
          name='password'
          type='password'
          value={password}
          handleChange={onInputChange}
          label='password'
          required
        />
        <div className='buttons'>
          <CustomButton type='submit'> Sign in </CustomButton>
          <CustomButton onClick={googleSignInStart} type='button' googleSignIn>
            {' '}
            Sign in with Google{' '}
          </CustomButton>
        </div>
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn)
