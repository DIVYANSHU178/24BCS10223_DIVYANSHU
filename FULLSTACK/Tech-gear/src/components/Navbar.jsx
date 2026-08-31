import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <Link to="/products">All Products</Link>
      <Link to="/products?category=audio">Audio Only</Link>
      <Link to="/products?maxPrice=100">Under $100</Link>
    </nav>
  )
}

export default Navbar
