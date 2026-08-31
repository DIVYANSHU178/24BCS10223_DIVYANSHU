import { useSearchParams, Link } from 'react-router-dom'
import PRODUCTS from '../data/productsData'

function ProductCatalog() {
  const [searchParams, setSearchParams] = useSearchParams()

  const activeCategoryFilter = searchParams.get('category') || ''
  const maxPriceFilter = searchParams.get('maxPrice')

  const matchingProducts = PRODUCTS.filter(
    (product) =>
      (!activeCategoryFilter || product.category === activeCategoryFilter) &&
      (!maxPriceFilter || product.price <= Number(maxPriceFilter))
  )

  const handleCategoryChange = (event) => {
    const nextCategory = event.target.value
    const nextParams = new URLSearchParams(searchParams)

    if (nextCategory) {
      nextParams.set('category', nextCategory)
    } else {
      nextParams.delete('category')
    }

    setSearchParams(nextParams)
  }

  const handleMaxPriceChange = (event) => {
    const nextMaxPrice = event.target.value
    const nextParams = new URLSearchParams(searchParams)

    if (nextMaxPrice) {
      nextParams.set('maxPrice', nextMaxPrice)
    } else {
      nextParams.delete('maxPrice')
    }

    setSearchParams(nextParams)
  }

  return (
    <div>
      <h2>Product Catalog</h2>

      <select value={activeCategoryFilter} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        <option value="audio">audio</option>
        <option value="peripherals">peripherals</option>
        <option value="display">display</option>
      </select>

      <input
        type="number"
        placeholder="Max price"
        value={maxPriceFilter || ''}
        onChange={handleMaxPriceChange}
      />

      <button onClick={() => setSearchParams({})}>Clear Filters</button>

      <ul>
        {matchingProducts.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>
              {product.name} - ${product.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductCatalog
