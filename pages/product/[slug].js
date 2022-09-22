
import React, { useContext } from 'react'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { Store } from '../../utils/Store'
import Product from '../../models/Product'
import db from '../../utils/db'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function ProductScreen(props) {
  const { product } = props
  const { state, dispatch } = useContext(Store)
  const router = useRouter()

  if (!product) {
    return (
      <Layout title='Product not found'>
        <p>Sorry, there&apos;s no item on this page</p>
      </Layout>
    )
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((item) => item.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    // TODO: verify comparison countInStock/quantity
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Item out of stock');
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };
  return (
    <Layout title={product.name}>
      <div className='py-2'>
        <Link href='/'>
          <a className='text-primary'>Back to home page
          </a>
        </Link>
      </div>
      <div className='mt-4 grid md:grid-cols-4 md:gap-3'>
        <div className='md:col-span-2'>
          <Image
            src={product.image}
            alt={product.name}
            width={915}
            height={915}
            layout='responsive'
            className='rounded-lg'
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className='text-lg'>{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>{product.rating} of {product.numReviews} reviews</li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className='card p-5'>
            <div className='mb-2 flex justify-between'>
              <div>Price</div>
              <div>{product.price} &euro;</div>
            </div>
            <div className='mb-2 flex justify-between'>
              <div>Status</div>
              <div>{product.countInStock > 0 ? 'In stock' : 'Currently out of stock'}</div>
            </div>
            <button className='primary-btn w-full' onClick={addToCartHandler}>Add to cart</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { params } = context
  const { slug } = params

  await db.connect()
  const product = await Product.findOne({ slug }).lean()
  await db.disconnect()

  return {
    props: {
      product: product ? db.convertDocToObj(product) : null
    }
  }
}