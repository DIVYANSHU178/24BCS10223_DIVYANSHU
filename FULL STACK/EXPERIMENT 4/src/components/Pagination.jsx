function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems,
}) {
  if (totalPages <= 1 && totalItems <= itemsPerPage) return null

  // Calculate page number window
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      let start = Math.max(1, currentPage - 2)
      let end = Math.min(totalPages, currentPage + 2)

      if (currentPage <= 3) {
        start = 1
        end = 5
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 4
        end = totalPages
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
    }
    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Page {currentPage} of {totalPages} ({totalItems} items)
      </div>

      <div className="pagination-buttons">
        <button
          type="button"
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
          title="First Page"
        >
          «
        </button>

        <button
          type="button"
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          title="Previous Page"
        >
          ‹ Prev
        </button>

        {pageNumbers[0] > 1 && (
          <>
            <button
              type="button"
              className="page-btn"
              onClick={() => onPageChange(1)}
            >
              1
            </button>
            {pageNumbers[0] > 2 && <span className="pagination-dots">...</span>}
          </>
        )}

        {pageNumbers.map((page) => (
          <button
            key={page}
            type="button"
            className={`page-btn ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span className="pagination-dots">...</span>
            )}
            <button
              type="button"
              className="page-btn"
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          type="button"
          className="page-btn"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
          title="Next Page"
        >
          Next ›
        </button>

        <button
          type="button"
          className="page-btn"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(totalPages)}
          title="Last Page"
        >
          »
        </button>
      </div>

      <div className="per-page-selector">
        <label htmlFor="perPage">Per page:</label>
        <select
          id="perPage"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="select-input"
        >
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={48}>48</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  )
}

export default Pagination
