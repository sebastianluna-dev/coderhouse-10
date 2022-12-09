import express from 'express'
import { productsDAO } from '../services/products.service.js'

const router = express.Router()

router.get('/', (req, res) => {
  const products = productsDAO.getAllProducts(8)
  res.send(products)
})

export { router as routerProducts }
