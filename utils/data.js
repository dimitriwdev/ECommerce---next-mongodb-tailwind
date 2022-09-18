import bcrypt from 'bcryptjs'

const data = {
  users: [
    {
      name: 'John',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456789'),
      isAdmin: true,
    },
    {
      name: 'Jane',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456789'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Free shirt',
      slug: 'free-shirt',
      category: 'Shirts',
      image: '/images/shirt1.webp',
      price: 70,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: 'A popular shirt',
    },
    {
      name: 'Fit shirt',
      slug: 'fit-shirt',
      category: 'Shirts',
      image: '/images/shirt2.webp',
      price: 80,
      brand: 'Adidas',
      rating: 3.2,
      numReviews: 10,
      countInStock: 20,
      description: 'A popular shirt',
    },
    {
      name: 'Slim shirt',
      slug: 'slim-shirt',
      category: 'Shirts',
      image: '/images/shirt3.webp',
      price: 90,
      brand: 'Raymond',
      rating: 4.8,
      numReviews: 3,
      countInStock: 20,
      description: 'A popular shirt',
    },
    {
      name: 'Golf pants',
      slug: 'golf-pants',
      category: 'Pants',
      image: '/images/pant1.webp',
      price: 90,
      brand: 'Oliver',
      rating: 2.9,
      numReviews: 13,
      countInStock: 20,
      description: 'Smart looking pants',
    },
    {
      name: 'Fit pants',
      slug: 'fit-pants',
      category: 'Pants',
      image: '/images/pant2.webp',
      price: 95,
      brand: 'Zara',
      rating: 3.7,
      numReviews: 7,
      countInStock: 20,
      description: 'A popular pants',
    },
    {
      name: 'Classic pants',
      slug: 'classic-pants',
      category: 'Pants',
      image: '/images/pant3.webp',
      price: 75,
      brand: 'casely',
      rating: 2.4,
      numReviews: 14,
      countInStock: 20,
      description: 'A popular pants',
    }
  ]
}

export default data