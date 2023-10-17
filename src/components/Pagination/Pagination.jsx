import styles from './styles.module.css';

const Pagination = ({
  totalPages,
  currentPage,
  hundlePageClick,
  hundlePreviousPage,
  hundleNextPage,
}) => {
  return (
    <div className={styles.pagination}>
      <button disabled={currentPage<=1} className={styles.arrow} onClick={hundlePreviousPage}>
        {'<'}
      </button>
      <div className={styles.list}>
        {[...Array(totalPages)].map((_, index) => {
          return (
            <button
              onClick={() => hundlePageClick(index + 1)}
              className={styles.pageNumber}
              disabled={index + 1 === currentPage}
              key={index}>
              {index + 1}
            </button>
          );
        })}
      </div>
      <button disabled={currentPage>=totalPages} onClick={hundleNextPage} className={styles.arrow}>
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
