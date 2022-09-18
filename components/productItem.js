import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import { Store } from '../utils/Store'
import { useRouter } from 'next/router'

export default function ProductItem({ product }) {
  const { state, dispatch } = useContext(Store)
  const router = useRouter()

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((item) => item.slug === product.slug)
    const quantity = existItem ? existItem.quantity + 1 : 1

    if (product.countInStock < quantity) {
      alert('Sorry, this product is out of stock')
      return
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } })
    router.push('/cart')
  }
  return (
    <div className='card'>
      <Link href={`/product/${product.slug}`}>
        <a>
          <Image
            src={product.image}
            alt={product.name}
            width={915}
            height={915}
            layout='responsive'
            className='rounded shadow'
          />
        </a>
      </Link>
      <div className='flex flex-col justify-center items-center p-5'>
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className='text-lg'>{product.name}</h2>
          </a>
        </Link>
        <p className='mb-2 text-sm italic'>{product.brand}</p>
        <p>{product.price} &euro;</p>
        <button className='primary-btn' type='button' onClick={addToCartHandler}>
          Add to cart
        </button>
      </div>
    </div>
  )
}
