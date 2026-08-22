import { useState, useEffect } from 'react'

function PhotoModal({ photo, onClose }) {
  const [copied, setCopied] = useState(false)
  const [modalImgLoading, setModalImgLoading] = useState(true)
  const [modalImgError, setModalImgError] = useState(false)

  const fallbackFullUrl = `https://picsum.photos/seed/${photo.id}/600/600`

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(photo.url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="modal-body">
          <div className="modal-image-wrapper">
            {modalImgLoading && <div className="modal-img-skeleton" />}
            <img
              src={modalImgError ? fallbackFullUrl : photo.url}
              alt={photo.title}
              className={`modal-image ${modalImgLoading ? 'hidden' : 'visible'}`}
              onLoad={() => setModalImgLoading(false)}
              onError={() => {
                if (!modalImgError) {
                  setModalImgError(true)
                } else {
                  setModalImgLoading(false)
                }
              }}
            />
          </div>

          <div className="modal-info">
            <div className="modal-badges">
              <span className="badge badge-id">Photo ID: #{photo.id}</span>
              <span className="badge badge-album">Album ID: {photo.albumId}</span>
            </div>

            <h2 className="modal-title">{photo.title}</h2>

            <div className="modal-meta-section">
              <label>Full Image URL:</label>
              <div className="url-box">
                <input
                  type="text"
                  readOnly
                  value={photo.url}
                  className="url-input"
                />
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="btn-copy"
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="modal-actions">
              <a
                href={photo.url}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Open Original in New Tab ↗
              </a>
              <button
                type="button"
                className="btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhotoModal
