import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import CheckoutWizard from '../components/CheckoutWizard'
import Layout from '../components/Layout'
import { Store } from '../utils/Store'

export default function Shipping() {
  const { state, dispatch } = useContext(Store)
  const router = useRouter()
  const { cart } = state
  const { shippingAddress } = cart

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName)
    setValue('address', shippingAddress.address)
    setValue('postcode', shippingAddress.postcode)
    setValue('city', shippingAddress.city)
    setValue('country', shippingAddress.country)
  }, [setValue, shippingAddress])


  const submitHandler = ({ fullName, address, postcode, city, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, postcode, city, country }
    })
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          postcode,
          city,
          country
        }
      })
    )
    router.push('/payment')
  }

  return (
    <Layout title='Shipping Address'>
      <CheckoutWizard activeStep={1} />
      <form
        className='mx-auto max-w-screen-md'
        onSubmit={handleSubmit(submitHandler)}>
        <h1 className='my-10 text-xl'>Shipping Address</h1>
        <div className='mb-4'>
          <label htmlFor='fullName'>Full Name</label>
          <input type='text' className='input' id='fullName' autoFocus {...register('fullName', { required: 'Please enter full name' })} />
          {errors.fullName && (<div className='warning'>{errors.fullName.message}</div>)}
        </div>
        <div className=''>
          <div className='mb-4'>
            <label htmlFor='address'>Address</label>
            <input type='text' className='input' id='address' autoFocus {...register('address', { required: 'Please enter address' })} />
            {errors.address && (<div className='warning'>{errors.address.message}</div>)}
          </div>
          <div className='mb-4'>
            <label htmlFor='postcode'>Postcode</label>
            <input type='text' className='input' id='postcode' autoFocus {...register('postcode', { required: 'Please enter postcode' })} />
            {errors.postcode && (<div className='warning'>{errors.postcode.message}</div>)}
          </div>
          <div className='mb-4'>
            <label htmlFor='city'>City</label>
            <input type='text' className='input' id='city' autoFocus {...register('city', { required: 'Please enter city' })} />
            {errors.city && (<div className='warning'>{errors.city.message}</div>)}
          </div>
          <div className='mb-4'>
            <label htmlFor='country'>Country</label>
            <input type='text' className='input' id='country' autoFocus {...register('country', { required: 'Please enter country' })} />
            {errors.country && (<div className='warning'>{errors.country.message}</div>)}
          </div>
        </div>
        <div className='w-full flex justify-end'>
          <button className='block primary-btn px-10 mt-2 mb-10'>
            Next
          </button>
        </div>
      </form>
    </Layout >
  )
}

Shipping.auth = true