import { useState, useEffect, useMemo } from 'react'

const MOCK_ASSETS = [
  {
    id: 1,
    name: 'Apple Inc.',
    symbol: 'AAPL',
    assetClass: 'Stocks',
    quantity: 10,
    currentPrice: 195.5,
  },
  {
    id: 2,
    name: 'Microsoft Corp.',
    symbol: 'MSFT',
    assetClass: 'Stocks',
    quantity: 8,
    currentPrice: 420.25,
  },
  {
    id: 3,
    name: 'Bitcoin',
    symbol: 'BTC',
    assetClass: 'Crypto',
    quantity: 0.5,
    currentPrice: 65000,
  },
  {
    id: 4,
    name: 'Ethereum',
    symbol: 'ETH',
    assetClass: 'Crypto',
    quantity: 2,
    currentPrice: 3500,
  },
  {
    id: 5,
    name: 'US Treasury Bond',
    symbol: 'UST',
    assetClass: 'Bonds',
    quantity: 20,
    currentPrice: 102.5,
  },
  {
    id: 6,
    name: 'Gold ETF',
    symbol: 'GLD',
    assetClass: 'Commodities',
    quantity: 15,
    currentPrice: 220.75,
  },
]

const categories = ['All', 'Stocks', 'Crypto', 'Bonds', 'Commodities']
const currencies = ['USD', 'EUR', 'INR']

function formatCurrency(value, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
    maximumFractionDigits: 2,
  }).format(value)
}

function FilterBar({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, currency, setCurrency }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or symbol"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        {currencies.map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
    </div>
  )
}

function PortfolioMetrics({ totalValue, currency, assetCount }) {
  return (
    <div>
      <h2>Portfolio Metrics</h2>

      <p>Current Value: {formatCurrency(totalValue, currency)}</p>
      <p>Total Value: {formatCurrency(totalValue, currency)}</p>
      <p>Assets: {assetCount}</p>
    </div>
  )
}

function AssetTable({ assets, currency }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Symbol</th>
          <th>Category</th>
          <th>Value</th>
          <th>Quantity</th>
        </tr>
      </thead>

      <tbody>
        {assets.map((asset) => (
          <tr key={asset.id}>
            <td>{asset.name}</td>
            <td>{asset.symbol}</td>
            <td>{asset.assetClass}</td>
            <td>{formatCurrency(asset.quantity * asset.currentPrice, currency)}</td>
            <td>{asset.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function App() {
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currency, setCurrency] = useState('USD')

  useEffect(() => {
    const timer = setTimeout(() => {
      setAssets(MOCK_ASSETS)
      setLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [])

  const { filteredAssets, totalValue } = useMemo(() => {
    window.analyticsMemoCount = (window.analyticsMemoCount || 0) + 1

    const lowerSearch = searchTerm.trim().toLowerCase()

    const filtered = assets.filter((asset) => {
      const matchesSearch =
        asset.name.toLowerCase().includes(lowerSearch) ||
        asset.symbol.toLowerCase().includes(lowerSearch)
      const matchesCategory =
        selectedCategory === 'All' || asset.assetClass === selectedCategory

      return matchesSearch && matchesCategory
    })

    const total = filtered.reduce(
      (sum, asset) => sum + asset.quantity * asset.currentPrice,
      0
    )

    return {
      filteredAssets: filtered,
      totalValue: total,
    }
  }, [assets, searchTerm, selectedCategory])

  useEffect(() => {
    const formattedTotal = formatCurrency(totalValue, 'USD')
    document.title = `Portfolio - Total: ${formattedTotal}`
  }, [totalValue])

  return (
    <>
      <h1>Nova Financial Portfolio</h1>

      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        currency={currency}
        setCurrency={setCurrency}
      />

      {loading ? (
        <p>Loading assets.....</p>

      ) : (
        <>
          <PortfolioMetrics
            totalValue={totalValue}

            currency={currency}
            assetCount={filteredAssets.length}
          />

          <AssetTable assets={filteredAssets} currency={currency} />
        </>
      )}
    </>
  )
}

export default App
