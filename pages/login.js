import React, { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { useForm } from 'react-hook-form'
import { getError } from '../utils/error'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'


export default function LoginScreen() {
  const { data: session } = useSession()

  const router = useRouter()
  const { redirect } = router.query

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/')
    }
  }, [session, router, redirect])

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })
      if (result.error) {
        toast.error(result.error, { theme: "colored" });
      }
    } catch (err) {
      toast.error(getError(err), { theme: "colored" });
    }
  }

  return (
    <Layout title='Login'>
      <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
        <h1 className='my-10 text-xl'>Login</h1>
        <div className='mb-4'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            autoFocus
            className='input'
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
            className='input'
            {...register('password', {
              required: 'Please enter your personal password',
              minLength: { value: 6, message: 'Password should contain more than 6 characters' }
            })}
          />
          {
            errors.password &&
            <div className='warning'>
              {errors.password.message}
            </div>
          }
        </div>
        <div className='my-4'>
          <button className='primary-btn'>
            Login
          </button>
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
