import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../components/Layout'

export default function Unauthorized() {
  const router = useRouter()
  const message = router.query.message

  return (
    <Layout title='Unauthorized Page'>
      <h1 className='text-xl mt-10 mb-4'>Access Denied</h1>
      {
        message && <div className='warning mb-10'>{message}</div>
      }
      <Link href='/'>
        <a className='primary-btn'>Back to home page</a>
      </Link>
    </Layout>
  )
}
