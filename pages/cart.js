
import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/Layout'
import { Store } from '../utils/Store'
import bin from '../public/icons/bin.png'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import axios from 'axios'
import { toast } from 'react-toastify'

function CartScreen() {
  const router = useRouter()
  const { state, dispatch } = useContext(Store)
  const {
    cart: { cartItems }
  } = state

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
  }

  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty)

    // TODO: verify comparison countInStock/quantity
    const { data } = await axios.get(`/api/products/${item._id}`)

    if (data.countInStock < quantity) {
      return toast.error('Sorry, this item is out of stock', { theme: "colored" });
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } })
    toast.success('Item updated', { theme: "colored" });
  }

  return (
    <Layout title="Shopping Cart">
      <h1 className='my-10 text-xl'>Shopping Cart</h1>
      {cartItems.length === 0 ?
        <div>
          Cart is empty,{' '}
          <Link href='/'>
            <a className='text-link'>
              Go shopping
            </a>
          </Link>
        </div>
        :
        <div className='grid md:grid-cols-4 md:gap-5'>
          <div className='overflow-x-auto md:col-span-3'>
            <table className='min-w-full'>
              <thead className='border-b'>
                <tr>
                  <th className='p-5 text-left'>Item</th>
                  <th className='p-5 text-right'>Quantity</th>
                  <th className='p-5 text-right'>Price</th>
                  <th className='p-5'>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className='border-b'>
                    <td>
                      <Link href={`/product/${item.slug}`}>
                        <a className='flex items-center'>
                          <div className='w-1/4'>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={915}
                              height={915}
                              className='rounded'
                            />
                          </div>
                          &nbsp;
                          &nbsp;
                          {item.name}
                        </a>
                      </Link>
                    </td>
                    <td className='p-5 text-right'>
                      <select value={item.quantity} onChange={(e) => updateCartHandler(item, e.target.value)}>
                        {[...Array(item.countInStock).keys()].map((item) => (
                          <option key={item + 1} value={item + 1}>
                            {item + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className='p-5 text-right'>{item.price} &euro;</td>
                    <td className='p-5 flex items-center justify-center'>
                      <button className='pt-2' onClick={() => removeItemHandler(item)}>
                        <Image src={bin} alt='delete item' width={20} height={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className='card p-5'>
              <ul>
                <li>
                  <div className='pb-3'>Subtotal: ({cartItems.reduce((a, c) => a + c.quantity, 0)})
                    {' '}
                    : {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}{' '}&euro;
                  </div>
                </li>
                <li>
                  <button
                    onClick={() => router.push('login?redirect=/shipping')}
                    className='primary-btn w-full'
                  >
                    Check Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      }
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false })