import { faker } from '@faker-js/faker'

const randomProduct = () => ({
  title: faker.commerce.product(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(),
  department: faker.commerce.department()
})

const randomProductArray = (quantity) => {
  const products = []
  for (let i = 0; i < quantity; i++) {
    products.push(randomProduct())
  }
  return products
}

class ProductsService {
  getAllProducts (quantity) {
    return randomProductArray(quantity)
  }
}

const productsDAO = new ProductsService()
export { productsDAO }
