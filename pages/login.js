import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { useForm } from 'react-hook-form'



export default function LoginScreen() {

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const submitHandler = ({ email, password }) => {
    console.log(email, password);
  }

  return (
    <Layout title='Login'>
      <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
        <h1 className='mb-4 text-xl'>Login</h1>
        <div className='mb-4'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            autoFocus
            className='w-full p-2 border-2 rounded mt-2'
            {...register('email', {
              required: 'Please enter an email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9.-]+$/i,
              }
            })}
          />
          {
            errors.email &&
            <div className='warning'>
              {errors.email.message}
            </div>
          }
        </div>
        <div className='mb-4'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            className='w-full p-2 border-2 rounded mt-2'
            {...register('password', {
              required: 'Please enter your personal password',
              minLength: { value: 6, message: 'password should contain more than 6 characters' }
            })}
          />
          {
            errors.password &&
            <div className='warning'>
              {errors.password.message}
            </div>
          }
        </div>
        <div className='mb-4'>
          <button className='primary-btn'>Login</button>
        </div>
        <div className='mb-4'>
          Don&apos;t have an account? &nbsp;
          <Link href={'/register'}>
            <a className='text-link'>
              Register
            </a>
          </Link>
        </div>
      </form>
    </Layout>
  )
}
