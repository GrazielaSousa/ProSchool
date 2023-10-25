import { PropTypes } from 'prop-types';

export const Pagination = ({ currentPage, totalPages, handlePageChange, isPaginationEnabled }) => {
  const generatePageButtons = () => {
    const pageButtons = [];

    for (let i = 0; i < totalPages; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? 'active' : ''}
          disabled={!isPaginationEnabled}
        >
          {i + 1}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0 || !isPaginationEnabled}
      >
        Anterior
      </button>
      {generatePageButtons()}
      <button
        onClick={() =>
          handlePageChange(Math.min(totalPages - 1, currentPage + 1))
        }
        disabled={currentPage >= totalPages - 1 || !isPaginationEnabled}
      >
        Próximo
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  isPaginationEnabled: PropTypes.bool.isRequired,
};
