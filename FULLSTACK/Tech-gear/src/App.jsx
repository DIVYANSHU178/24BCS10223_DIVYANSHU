import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProductCatalog from './components/ProductCatalog'
import ProductDetails from './components/ProductDetails'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductCatalog />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
      </Routes>
    </>
  )
}

export default App
