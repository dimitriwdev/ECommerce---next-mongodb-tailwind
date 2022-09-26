import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useReducer } from 'react'
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
    default:
      return state;
  }
}

export default function AdminProductEdit() {

  const { query } = useRouter()
  const productId = query.id

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
        const { data } = await axios.get(`/api/admin/products/${productId}`)
        dispatch({ type: 'FETCH_SUCCESS' })
        setValue('name', data.name)
        setValue('slug', data.slug)
        setValue('price', data.price)
        setValue('image', data.image)
        setValue('category', data.category)
        setValue('brand', data.brand)
        setValue('countInStock', data.countInStock)
        setValue('description', data.description)

      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }
    fetchData()
  }, [productId, setValue])

  const router = useRouter()

  const submitHandler = async ({
    name,
    slug,
    price,
    category,
    image,
    brand,
    countInStock,
    description
  }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' })
      await axios.put(`/api/admin/products/${productId}`, {
        name,
        slug,
        price,
        category,
        image,
        brand,
        countInStock,
        description
      })
      dispatch({ type: 'UPDATE_SUCCESS' })
      toast.success('Product updated successfully', { theme: 'colored' })
      router.push('/admin/products')
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) })
      toast.error(getError(err), { theme: 'colored' })
    }
  }

  return (
    <Layout title={`Edit Product ${productId}`}>
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
        <div className='md:col-span-4'>
          {
            loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className='warning p-3 bg-bgError rounded'>{error}</div>
            ) : (
              <form
                className='mx-auto max-w-screen-md'
                onSubmit={handleSubmit(submitHandler)}
              >
                <h1 className='text-xl my-10'>{`Edit Product ${productId}`}</h1>
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
                  <label htmlFor='slug'>Slug</label>
                  <input
                    type='text'
                    className='input'
                    id='slug'
                    {...register('slug', {
                      required: 'Please enter a slug'
                    })}
                  />
                  {errors.slug && (
                    <div className='warning'>{errors.slug.message}</div>
                  )}
                </div>
                <div className='mb-4'>
                  <label htmlFor='price'>Price</label>
                  <input
                    type='text'
                    className='input'
                    id='price'
                    {...register('price', {
                      required: 'Please enter a price'
                    })}
                  />
                  {errors.price && (
                    <div className='warning'>{errors.price.message}</div>
                  )}
                </div>
                <div className='mb-4'>
                  <label htmlFor='image'>Image</label>
                  <input
                    type='text'
                    className='input'
                    id='image'
                    {...register('image', {
                      required: 'Please enter an image'
                    })}
                  />
                  {errors.image && (
                    <div className='warning'>{errors.image.message}</div>
                  )}
                </div>
                <div className='mb-4'>
                  <label htmlFor='category'>Category</label>
                  <input
                    type='text'
                    className='input'
                    id='category'
                    {...register('category', {
                      required: 'Please enter a category'
                    })}
                  />
                  {errors.category && (
                    <div className='warning'>{errors.category.message}</div>
                  )}
                </div>
                <div className='mb-4'>
                  <label htmlFor='brand'>Brand</label>
                  <input
                    type='text'
                    className='input'
                    id='brand'
                    {...register('brand', {
                      required: 'Please enter a brand'
                    })}
                  />
                  {errors.brand && (
                    <div className='warning'>{errors.brand.message}</div>
                  )}
                </div>
                <div className='mb-4'>
                  <label htmlFor='countInStock'>Count in stock</label>
                  <input
                    type='text'
                    className='input'
                    id='countInStock'
                    {...register('countInStock', {
                      required: 'Please enter stock count'
                    })}
                  />
                  {errors.countInStock && (
                    <div className='warning'>{errors.countInStock.message}</div>
                  )}
                </div>
                <div className='mb-4'>
                  <label htmlFor='description'>Description</label>
                  <input
                    type='text'
                    className='input'
                    id='description'
                    {...register('description', {
                      required: 'Please enter a description'
                    })}
                  />
                  {errors.description && (
                    <div className='warning'>{errors.description.message}</div>
                  )}
                </div>
                <div className='mb-4'>
                  <button disabled={loadingUpdate} className='primary-btn'>
                    {loadingUpdate ? 'Loading...' : 'Update'}
                  </button>
                </div>
                <div className='mb-10'>
                  <Link href={`/admin/products`}>
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

AdminProductEdit.auth = { adminOnly: true }