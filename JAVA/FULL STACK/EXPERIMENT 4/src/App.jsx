import { useState } from 'react'
import './App.css'

function App() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPhotos = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/photos')
      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await res.json()
      setPhotos(data.slice(0, 100)) // display first 100 photos
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      
      <button 
        className="fetch-btn" 
        onClick={fetchPhotos} 
        disabled={loading}
      >
        {loading ? 'Fetching Photos...' : 'Fetch Photos'}
      </button>

      <div className="photos-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <div className="photo-info">
              <span className="photo-id">ID: #{photo.id}</span>
              <p className="photo-title">{photo.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
