import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useReducer } from 'react'
import Layout from '../../components/Layout'
import { getError } from '../../utils/error'


function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload, error: '' }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: '' }
    default:
      state
  }
}

export default function AdminProducts() {

  const [{ loading, products, error }, dispatch] = useReducer(reducer, {
    loading: true,
    products: [],
    error: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get(`/api/admin/products`)
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }
    fetchData()
  }, [])

  return (
    <Layout title='Admin Product'>
      <div className='grid md:grid-cols-5 md:gap-5'>
        <div>
          <ul>
            <li className='my-4'>
              <Link href='/admin/dashboard'>
                <a>Dashboard</a>
              </Link>
            </li>
            <li className='my-4'>
              <Link href='/admin/orders'>
                <a>Orders</a>
              </Link>
            </li>
            <li className='my-4'>
              <Link href='/admin/products'>
                <a className='font-bold text-primary'>Products</a>
              </Link>
            </li>
            <li className='my-4'>
              <Link href='/admin/users'>
                <a>Users</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className='overflow-x-auto md:col-span-4'>
          <h1 className='text-xl my-10'>Products</h1>
          {
            loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className='warning p-3 bg-bgError rounded'>{error}</div>
            ) : (
              <div className='overflow-x-auto'>
                <table className='min-w-full'>
                  <thead className='border-b'>
                    <tr>
                      <th className='p-5 text-left'>ID</th>
                      <th className='p-5 text-left'>NAME</th>
                      <th className='p-5 text-left'>PRICE</th>
                      <th className='p-5 text-left'>CATEGORY</th>
                      <th className='p-5 text-left'>COUNT</th>
                      <th className='p-5 text-left'>Rating</th>
                      <th className='p-5 text-left'>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr
                        key={product._id}
                        className='border-b'
                      >
                        <td className='p-5'>...{product._id.substring(20, 24)}</td>
                        <td className='p-5'>{product.name}</td>
                        <td className='p-5'>{product.price}{' '}&euro;</td>
                        <td className='p-5'>{product.category}</td>
                        <td className='p-5'>{product.countInStock}</td>
                        <td className='p-5'>{product.rating}</td>
                        <div className='p-5'>
                          <Link href={`/admin/product/${product._id}`}><a className='text-primary mr-1'>Edit</a></Link>
                          <button className='ml-1'>Delete</button>
                        </div>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
        </div>
      </div>
    </Layout>
  )
}

AdminProducts.auth = { adminOnly: true }
