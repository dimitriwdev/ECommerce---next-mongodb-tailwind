import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'

export default function SignupScreen() {
  return (
    <Layout title='Login'>
      <form className='mx-auto max-w-screen-md'>
        <h1 className='mb-4 text-xl'>Sign up</h1>
        <div className='mb-4'>
          <label htmlFor='email'>Email</label>
          <input type='email' className='w-full p-2 border-2 rounded mt-2' id='email' autoFocus />
        </div>
        <div className='mb-4'>
          <label htmlFor='password'>Password</label>
          <input type='password' className='w-full p-2 border-2 rounded mt-2' id='password' />
        </div>
        <div className='mb-4'>
          <button className='primary-btn'>Sign up</button>
        </div>
        <div className='mb-4'>
          Already have an account? &nbsp;
          <Link href={'/login'}>
            <a className='text-link'>
              Log in
            </a>
          </Link>
        </div>
      </form>
    </Layout>
  )
}
