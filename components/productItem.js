import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function productItem({ product }) {
  return (
    <div className='product-card'>
      <Link href={`/product/${product.slug}`}>
        <a>
          <Image
            src={product.image}
            alt={product.name}
            width={915}
            height={915}
            layput='responsive'
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
        <p className='mb-2'>{product.brand}</p>
        <p>{product.price} &euro;</p>
        <button className='primary-btn' type='button'>
          Add to cart
        </button>
      </div>
    </div>
  )
}
