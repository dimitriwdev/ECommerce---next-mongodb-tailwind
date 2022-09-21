import Image from 'next/image'
import Link from 'next/link'

export default function ProductItem({ product, addToCartHandler }) {

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
        <button className='primary-btn' type='button' onClick={() => addToCartHandler(product)}>
          Add to cart
        </button>
      </div>
    </div>
  )
}
