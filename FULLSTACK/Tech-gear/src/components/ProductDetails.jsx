import { Link, useParams } from 'react-router-dom'
import PRODUCTS from '../data/productsData'

function ProductDetails() {
  const { productId } = useParams()
  const product = PRODUCTS.find((item) => item.id === Number(productId))

  if (!product) {
    return (
      <div>
        <h2>Product not found!</h2>
        <Link to="/products">Back to Products</Link>
      </div>
    )
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>ID: {product.id}</p>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <Link to="/products">Back to Products</Link>
    </div>
  )
}

export default ProductDetails
