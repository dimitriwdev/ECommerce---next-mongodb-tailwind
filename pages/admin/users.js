import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useReducer } from 'react'
import { toast } from 'react-toastify'
import Layout from '../../components/Layout'
import { getError } from '../../utils/error'

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, users: action.payload, error: '' }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }

    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, error: '' }
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true }
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false }
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false }

    default:
      return state
  }
}

export default function AdminUsers() {

  const [{ loading, error, users, loadingDelete, successDelete }, dispatch] = useReducer(reducer, {
    loading: true,
    users: [],
    error: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get(`/api/admin/users`)
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }

    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' })
    } else {
      fetchData()
    }
  }, [successDelete])



  const deleteHandler = async (userId) => {
    if (!window.confirm('Are you sure?')) {
      return
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' })
      await axios.delete(`/api/admin/users/${userId}`)
      dispatch({ type: 'DELETE_SUCCESS' })
      toast.success('User deleted successfully', { theme: 'colored' })
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' })
      toast.error(getError(err), { theme: 'colored' })
    }
  }

  return (
    <Layout title='Users'>
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
                <a>Products</a>
              </Link>
            </li>
            <li className='my-4'>
              <Link href='/admin/users'>
                <a className='font-bold text-primary'>Users</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className='overflow-x-auto md:col-span-4'>
          <h1 className='text-xl my-10'>Users</h1>
          {loadingDelete && <div>Deleting user...</div>}
          {
            loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className='warning p-3 bg-bgError rounded'>{error}</div>
            ) : (
              <div className='overflow-x-auto mb-10'>
                <table className='min-w-full'>
                  <thead className='border-b'>
                    <tr>
                      <th className='p-5 text-left'>ID</th>
                      <th className='p-5 text-left'>NAME</th>
                      <th className='p-5 text-left'>EMAIL</th>
                      <th className='p-5 text-left'>ADMIN</th>
                      <th className='p-5 text-left'>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className='border-b'
                      >
                        <td className='p-5'>...{user._id.substring(20, 24)}</td>
                        <td className='p-5'>{user.name}</td>
                        <td className='p-5'>{user.email}</td>
                        <td className='p-5'>{user.isAdmin ? 'YES' : 'NO'}</td>
                        <div className='p-5 flex nowrap'>
                          <button
                            type='button'
                          >
                            <Link href={`/admin/user/${user._id}`} passHref>
                              <a className='primary-btn mr-1 text-sm'>
                                Edit
                              </a>
                            </Link>
                          </button>
                          <button
                            type='button'
                            className='ml-1 text-warning text-sm'
                            onClick={() => deleteHandler(user._id)}
                          >
                            Delete
                          </button>
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

AdminUsers.auth = { AdminOnly: true }