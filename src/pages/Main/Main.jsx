import { useEffect, useState } from 'react';
import NewsBanner from '../../components/NewsBanner/NewsBanner';
import styles from './styles.module.css';
import { getNews } from '../../API/apiNews';
import NewsList from '../../components/NewsList/NewsList';
import Sceleton from '../../components/Sceleton/Sceleton';
import Pagination from '../../components/Pagination/Pagination';
const Main = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const pageSize = 10;

  const [news, setNews] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const fetchNews = async (currentPage) => {
    try {
      setIsLoading(true);
      const response = await getNews(currentPage, pageSize);
      setNews(response.news);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage]);

  const hundleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const hundlePreviousPage = () => {
    if (currentPage > totalPages) {
      setCurrentPage(currentPage - 1);
    }
  };
  const hundlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className={styles.main}>
      {news.length > 0 && !isLoading ? (
        <NewsBanner item={news[0]} />
      ) : (
        <Sceleton type="banner" count={1} />
      )}
      <Pagination
        currentPage={currentPage}
        hundlePageClick={hundlePageClick}
        hundleNextPage={hundleNextPage}
        hundlePreviousPage={hundlePreviousPage}
        totalPages={totalPages}
      />
      {!isLoading ? (
        <NewsList news={news} />
      ) : (
        <Sceleton type="item" count={10} />
      )}

<Pagination
        currentPage={currentPage}
        hundlePageClick={hundlePageClick}
        hundleNextPage={hundleNextPage}
        hundlePreviousPage={hundlePreviousPage}
        totalPages={totalPages}
      />
    </main>
  );
};

export default Main;
