import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useReducer, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Layout from '../../../components/Layout'
import { getError } from '../../../utils/error'

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpdate: '' };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, errorUpdate: '' };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };

    default:
      return state;
  }
}

export default function AdminUserEdit() {
  const [isAdmin, setIsAdmin] = useState(false)
  const { query } = useRouter()
  const userId = query.id

  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()


  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get(`/api/admin/users/${userId}`)
        setIsAdmin(data.isAdmin)
        dispatch({ type: 'FETCH_SUCCESS' })
        setValue('name', data.name)

      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }
    fetchData()
  }, [setValue, userId])

  const router = useRouter()

  const SubmitHandler = async ({
    name
  }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' })
      await axios.put(`/api/admin/users/${userId}`, {
        name,
        isAdmin
      })
      dispatch({ type: 'UPDATE_SUCCESS' })
      toast.success('User updated successfully', { theme: 'colored' })
      router.push('/admin/users')
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) })
      toast.error(getError(err), { theme: 'colored' })
    }
  }

  return (
    <Layout title={`Edit User ${userId}`}>
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
              <Link href='/admin/users'>
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
        <div className='md:col-span-4'>
          {
            loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className='warning p-3 bg-bgError rounded'>{error}</div>
            ) : (
              <form
                className='mx-auto max-w-screen-md'
                onSubmit={handleSubmit(SubmitHandler)}
              >
                <h1 className='text-xl my-10'>{`Edit user ${userId}`}</h1>
                <div className='mb-4'>
                  <label htmlFor='name'>Name</label>
                  <input
                    type='text'
                    className='input'
                    id='name'
                    autoFocus
                    {...register('name', {
                      required: 'Please enter a name'
                    })}
                  />
                  {errors.name && (
                    <div className='warning'>{errors.name.message}</div>
                  )}
                </div>
                <div className='mb-4'>
                  <label htmlFor='isAdmin'>Admin</label>
                  <input
                    type='checkbox'
                    className='mx-4'
                    id='isAdmin'
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    checked={isAdmin}
                  />
                  {errors.isAdmin && (
                    <div className='warning'>{errors.isAdmin.message}</div>
                  )}
                </div>
                <div className='mb-4'>
                  <button disabled={loadingUpdate} className='primary-btn'>
                    {loadingUpdate ? 'Loading...' : 'Update'}
                  </button>
                </div>
                <div className='mb-10'>
                  <Link href={`/admin/users`}>
                    <a className='text-primary'>Back</a>
                  </Link>
                </div>
              </form>

            )}
        </div>
      </div>
    </Layout >
  )
}

AdminUserEdit.auth = { adminOnly: true }