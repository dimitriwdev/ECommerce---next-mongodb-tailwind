import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react'
import Layout from '../components/Layout';
import { getError } from '../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function OrderHistory() {

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: ''
  })

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/history`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchOrder()
  }, [])
  return (
    <Layout title='Order History'>
      <h1 className='my-10 text-xl'>Order History</h1>
      {
        loading
          ? <div className='my-10'>Loading...</div>
          : error
            ? <div className='warning'>{error}</div>
            : orders.length > 0 ? <div className='overflow-x-auto mb-10'>
              <table className='min-w-full'>
                <thead className='border-b'>
                  <tr>
                    <th className='p-5 text-left'>ID</th>
                    <th className='p-5 text-left'>DATE</th>
                    <th className='p-5 text-left'>TOTAL</th>
                    <th className='p-5 text-left'>PAID</th>
                    <th className='p-5 text-left'>DELIVERED</th>
                    <th className='p-5 text-left'>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className='border-b'
                    >
                      <td className='p-5'>...{order._id.substring(20, 24)}</td>
                      <td className='p-5'>{order.createdAt.substring(0, 10)}</td>
                      <td className='p-5'>{order.totalPrice} &euro; </td>
                      <td className='p-5'>
                        {
                          order.isPaid
                            ? `${order.paidAt.substring(0, 10)}`
                            : 'Not paid'
                        }
                      </td>
                      <td className='p-5'>
                        {
                          order.isDelivered
                            ? `${order.deliveredAt.substring(0, 10)}`
                            : 'Not delivered'
                        }
                      </td>
                      <td className='p-5'>
                        <Link href={`/order/${order._id}`} passHref>
                          <a className='text-primary'>Details</a>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
              :
              <div>
                No orders,{' '}
                <Link href='/'>
                  <a className='text-link'>
                    Go shopping!
                  </a>
                </Link>
              </div>
      }
    </Layout>
  )
}

OrderHistory.auth = true
export default OrderHistory