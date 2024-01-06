import React, { useState } from 'react'

import { connect } from 'react-redux'
import { signUpStart } from '../../redux/user/user.actions'

// components
import FormInput from '../FormInput/FormInput'
import CustomButton from '../CustomButton/CustomButton'

import './SignUp.scss'

function SignUp({ signUpStart }) {
  const [userCredentials, setUserCredentials] = useState({
    displayName: 'Amir Solo',
    email: 'me@amirsolo.com',
    password: 'amirsolopass',
    confirmPassword: 'amirsolopass'
  })

  const { displayName, email, password, confirmPassword } = userCredentials

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return alert("Passwords don't match")
    }

    const userCredentials = { displayName, email, password }
    signUpStart(userCredentials)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserCredentials({ ...userCredentials, [name]: value })
  }

  return (
    <div className='sign-up'>
      <h2 className='title'>I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          onChange={handleChange}
          label='Display Name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          label='Password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
          label='Confirm Password'
          required
        />
        <CustomButton type='submit'>SIGN UP</CustomButton>
      </form>
    </div>
  )
}

const mapDisptachToProps = (dispatch) => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDisptachToProps)(SignUp)
