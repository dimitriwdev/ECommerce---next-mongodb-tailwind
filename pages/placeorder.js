import axios from 'axios'
import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import CheckoutWizard from '../components/CheckoutWizard'
import Layout from '../components/Layout'
import { getError } from '../utils/error'
import { Store } from '../utils/Store'

export default function PlaceOrder() {
  const [loading, setLoading] = useState(false)
  const { state, dispatch } = useContext(Store)
  const router = useRouter()

  const { cart } = state
  const { cartItems, shippingAddress, paymentMethod } = cart

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  ); // 123.4567 => 123.46

  const shippingPrice = itemsPrice >= 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment')
    }
  }, [router, paymentMethod])

  const placeOrderHandler = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
      })
      setLoading(false)
      dispatch({ type: 'CART_CLEAR_ITEMS' })
      Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      )

      router.push(`/order/${data._id}`)
    } catch (err) {
      setLoading(false)
      toast.error(getError(err))
    }

  }


  return (
    <Layout title='Place Order'>
      <CheckoutWizard activeStep={3} />
      <h1 className='my-10 text-xl'>Shopping Cart</h1>
      {cartItems === 0
        ? (
          <div className=''>Cart is empty. <Link href='/'><a className='text-primary'>Go Shopping</a></Link></div>
        ) : (
          <div className='grid md:grid-cols-4 md:gap-5'>
            <div className='overflow-x-auto md:col-span-3'>
              <div className='card p-5'>
                <h2 className='mb-2 text-lg'>Shipping Address</h2>
                <div className='flex justify-between items-end'>
                  <div>
                    <p>{shippingAddress.fullName}</p>
                    <p>{shippingAddress.address}</p>
                    <p>{shippingAddress.postcode}, {shippingAddress.city}</p>
                    <p>{shippingAddress.country}</p>
                  </div>
                  <div><Link href='/shipping'><a className='text-primary'>Edit</a></Link></div>
                </div>
              </div>
              <div className='card p-5'>
                <h2 className='mb-2 text-lg'>Payment Method</h2>
                <div className='flex justify-between'>
                  <div>{paymentMethod}</div>
                  <div><Link href='/payment'><a className='text-primary'>Edit</a></Link></div>
                </div>
              </div>
              <div className='card overflow-x-auto p-5'>
                <h2 className='mb-2 text-lg'>Order Items</h2>
                <table className='min-w-full'>
                  <thead className='border-b'>
                    <tr>
                      <th className='p-5 text-left'>Item</th>
                      <th className='p-5 text-right'>Quantity</th>
                      <th className='p-5 text-right'>Price</th>
                      <th className='p-5 text-right'>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, i) => (
                      <tr key={i} className='border-b'>
                        <td>
                          <Link href={`/product/${item.slug}`}>
                            <a className='flex items-center'>
                              <div className='flex w-20 py-1'>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={915}
                                  height={915}
                                  className='rounded'
                                />
                              </div>
                              &nbsp;
                              {item.name}
                            </a>
                          </Link>
                        </td>
                        <td className='p-5 text-right'>{item.quantity}</td>
                        <td className='p-5 text-right'>{item.price}{' '}&euro;</td>
                        <td className='p-5 text-right'>{item.quantity * item.price}{' '}&euro;</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className='flex justify-end mt-4'>
                  <Link href='/cart'>
                    <a className='text-primary'>
                      Edit
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <div className='card p-5'>
                <h2 className='mb-2 text-lg'>Order Summary</h2>
                <ul>
                  <li>
                    <div className='mb-2 flex justify-between'>
                      <div>Items</div>
                      <div>{itemsPrice}{' '}&euro;</div>
                    </div>
                    <div className='mb-2 flex justify-between'>
                      <div>Tax</div>
                      <div>{taxPrice}{' '}&euro;</div>
                    </div>
                    <div className='mb-2 flex justify-between'>
                      <div>Shipping</div>
                      <div>{shippingPrice === 0 ? 'Free' : shippingPrice + ' ' + '€'}</div>
                    </div>
                    <div className='mb-2 flex justify-between'>
                      <div>Total</div>
                      <div>{totalPrice}{' '}&euro;</div>
                    </div>
                  </li>
                  <li>
                    <button
                      disabled={loading}
                      onClick={placeOrderHandler}
                      className='primary-btn w-full'
                    >
                      {loading ? 'Loading...' : 'Place Order'}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )
      }
    </Layout>
  )
}

PlaceOrder.auth = true