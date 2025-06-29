import type { Product } from '#graphql/resolver'

export default (): Product[] => [
  {
    id: '1',
    name: 'Product 1',
    price: 100,
    description: 'Description 1'
  }
]
