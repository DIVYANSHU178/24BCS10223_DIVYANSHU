import { useState } from 'react'

function PhotoCard({ photo, onSelect }) {
  const [imgError, setImgError] = useState(false)
  const [imgLoading, setImgLoading] = useState(true)

  // Fallback if via.placeholder.com fails to load
  const fallbackUrl = `https://picsum.photos/seed/${photo.id}/150/150`

  return (
    <div className="photo-card" onClick={() => onSelect(photo)}>
      <div className="card-image-wrapper">
        {imgLoading && <div className="img-placeholder-skeleton" />}
        <img
          src={imgError ? fallbackUrl : photo.thumbnailUrl}
          alt={photo.title}
          loading="lazy"
          className={`card-img ${imgLoading ? 'hidden' : 'visible'}`}
          onLoad={() => setImgLoading(false)}
          onError={() => {
            if (!imgError) {
              setImgError(true)
            } else {
              setImgLoading(false)
            }
          }}
        />
        <span className="badge badge-id">#{photo.id}</span>
      </div>

      <div className="card-content">
        <div className="card-header">
          <span className="badge badge-album">Album {photo.albumId}</span>
        </div>
        <h3 className="card-title" title={photo.title}>
          {photo.title}
        </h3>
        <button
          type="button"
          className="btn-view"
          onClick={(e) => {
            e.stopPropagation()
            onSelect(photo)
          }}
        >
          View Details
        </button>
      </div>
    </div>
  )
}

export default PhotoCard
