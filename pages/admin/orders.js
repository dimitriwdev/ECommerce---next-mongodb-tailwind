import axios from 'axios'
import Link from 'next/link'
import { useEffect, useReducer } from 'react'
import Layout from '../../components/Layout'
import { getError } from '../../utils/error'

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function AdminOrders() {

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/orders`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  console.log(orders);

  return (
    <Layout title='Admin Orders'>
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
                <a className='font-bold text-primary'>Orders</a>
              </Link>
            </li>
            <li className='my-4'>
              <Link href='/admin/products'>
                <a>Products</a>
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
          <h1 className='text-xl my-10'>Admin Orders</h1>
          {
            loading ? (
              <div className='my-10'>Loading...</div>
            ) : error ? (
              <div className='warning p-3 bg-bgError rounded'>{error}</div>
            ) : (
              <div className='overflow-x-auto mb-10'>
                <table className='min-w-full'>
                  <thead className='border-b'>
                    <tr>
                      <th className='p-5 text-left'>ID</th>
                      <th className='p-5 text-left'>USER</th>
                      <th className='p-5 text-left'>DATE</th>
                      <th className='p-5 text-left'>TOTAL</th>
                      <th className='p-5 text-left'>PAID</th>
                      <th className='p-5 text-left'>DELIVERED</th>
                      <th className='p-5 text-left'>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => {

                      return (
                        <tr
                          key={order._id}
                          className='border-b'
                        >
                          <td className='p-5'>...{order._id.substring(20, 24)}</td>
                          <td className='p-5'>{order.user ? order.user.name : 'DELETED USER'}</td>
                          <td className='p-5'>{order.createdAt.substring(0, 10)}</td>
                          <td className='p-5'>{order.totalPrice}{' '}&euro;</td>
                          <td className='p-5'>{order.isPaid ? order.paidAt.substring(0, 10) : 'Not paid'}</td>
                          <td className='p-5'>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'Not delivered'}</td>
                          <td className='p-5'><Link href={`/order/${order._id}`} passHref><a className='text-primary'>Details</a></Link></td>
                        </tr>
                      )
                    }
                    )}
                  </tbody>
                </table>
              </div>
            )}
        </div>
      </div>
    </Layout>
  )
}

AdminOrders.auth = true