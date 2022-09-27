import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import CheckoutWizard from '../components/CheckoutWizard'
import Layout from '../components/Layout'
import { Store } from '../utils/Store'

export default function Payment() {
  const [selectedMethod, setSelectedMethod] = useState('')
  const router = useRouter()
  const { state, dispatch } = useContext(Store)
  const { cart } = state
  const { shippingAddress, paymentMethod } = cart

  const submitHandler = (e) => {
    e.preventDefault()
    if (!selectedMethod) {
      return toast.error('Payment method is required', { theme: "colored" })
    }
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedMethod })
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectedMethod,
      })
    )
    router.push('/placeorder')
  }

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping')
    }
    setSelectedMethod(paymentMethod || '')
  }, [router, shippingAddress, paymentMethod])

  return (
    <Layout title='Payment Method'>
      <CheckoutWizard activeStep={2} />
      <form className='mx-auto max-w-screen-md' onSubmit={(e) => submitHandler(e)}>
        <h1 className='text-xl my-10'>Payment Method</h1>
        {
          ['Paypal', 'Stripe', 'Cash on delivery'].map((method) => (
            <div
              key={method}
              className='mb-4'
            >
              <input
                type='radio'
                id={method}
                name='paymentMethod'
                className='p-2 outline-none'
                checked={selectedMethod === method}
                onChange={() => setSelectedMethod(method)}
              />
              <label htmlFor={method} className='p-2'>{method}</label>
            </div>
          ))
        }
        <div className='mb-4 mt-10 flex justify-between'>
          <Link href='/shipping'>
            <a className='default-btn px-10'>Back</a>
          </Link>
          <button className='primary-btn px-10'>Next</button>
        </div>
      </form>
    </Layout >
  )
}

Payment.auth = true