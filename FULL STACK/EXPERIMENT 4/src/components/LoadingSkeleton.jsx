function LoadingSkeleton({ count = 8 }) {
  return (
    <div className="photos-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="photo-card skeleton-card">
          <div className="skeleton-image" />
          <div className="card-content">
            <div className="skeleton-badge" />
            <div className="skeleton-line" />
            <div className="skeleton-line short" />
            <div className="skeleton-button" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default LoadingSkeleton
