import React, { useEffect, useReducer } from 'react'
import axios from 'axios'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Link from 'next/link'
import Layout from '../../components/Layout'
import { getError } from '../../utils/error'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload, error: '' }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      state
  }
}

export default function AdminDashboard() {

  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/summary`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: summary.salesData.map((x) => x._id),
    datasets: [
      {
        label: 'Sales',
        backgroundColor: 'rgba(94, 140, 173, 1)',
        data: summary.salesData.map((x) => x.totalSales),
      },
    ],
  };

  return (
    <Layout title='Admin Dashboard'>
      <div className='grid md:grid-cols-5 md:gap-5'>
        <div>
          <ul>
            <li className='my-4'>
              <Link href='/admin/dashboard'>
                <a className='font-bold my-4 text-primary'>Dashboard</a>
              </Link>
            </li>
            <li className='my-4'>
              <Link href='/admin/orders'>
                <a>Orders</a>
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
        <div className='md:col-span-4'>
          <h1 className='text-xl my-10'>Admin Dashboard</h1>
          {
            loading ? (
              <div className='my-10'>Loading...</div>
            ) : error ? (
              <div className='warning p-3 bg-bgError rounded'>{error}</div>
            ) : (
              <div>
                <div className='grid grid-cols-1 md:grid-cols-4'>
                  <div className='card my-2 mr-2 p-5'>
                    <p className='text-3xl'>{summary.ordersPrice}{' '}&euro;</p>
                    <p>Sales</p>
                    <Link href='/admin/orders'>
                      <a className='text-primary'>View Sales</a>
                    </Link>
                  </div>
                  <div className='card m-2 p-5'>
                    <p className='text-3xl'>{summary.ordersCount}</p>
                    <p>Orders</p>
                    <Link href='/admin/orders'>
                      <a className='text-primary'>View Orders</a>
                    </Link>
                  </div>
                  <div className='card m-2 p-5'>
                    <p className='text-3xl'>{summary.productsCount}</p>
                    <p>Products</p>
                    <Link href='/admin/products'>
                      <a className='text-primary'>View Products</a>
                    </Link>
                  </div>
                  <div className='card my-2 ml-2 p-5'>
                    <p className='text-3xl'>{summary.usersCount}</p>
                    <p>Users</p>
                    <Link href='/admin/users'>
                      <a className='text-primary'>View Users</a>
                    </Link>
                  </div>
                </div>
                <h2 className='text-xl my-5'>Sales Report</h2>
                <Bar
                  options={{
                    legend: { dispaly: true, position: 'right' },
                  }}
                  data={data}
                />
              </div>
            )}
        </div>
      </div>
    </Layout>
  )
}

AdminDashboard.auth = { adminOnly: true }
