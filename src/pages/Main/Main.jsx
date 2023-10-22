import { useEffect, useState } from 'react';
import NewsBanner from '../../components/NewsBanner/NewsBanner';
import styles from './styles.module.css';
import { getNews, getCategories } from '../../API/apiNews';
import NewsList from '../../components/NewsList/NewsList';
import Sceleton from '../../components/Sceleton/Sceleton';
import Pagination from '../../components/Pagination/Pagination';
import Categories from '../../components/Categories/Categories';
import Search from '../../components/Search/Search';
import { useDebounce } from '../../helpers/hooks/useDebounce';
const Main = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const pageSize = 10;

  const [keywords, setKeywords] = useState('');
  const debouncedKeyWords = useDebounce(keywords, 1500);
  const [news, setNews] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const [isLoading, setIsLoading] = useState(true);

  const fetchNews = async (currentPage) => {
    try {
      setIsLoading(true);
      const response = await getNews({
        page_number: currentPage,
        page_size: pageSize,
        category: selectedCategory === 'ALL' ? null : selectedCategory,
        keywords: debouncedKeyWords,
      });
      setNews(response.news);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(['ALL', ...response.categories]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage, selectedCategory, debouncedKeyWords]);

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
  console.log(keywords);
  return (
    <main className={styles.main}>
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Search keywords={keywords} setKeywords={setKeywords} />
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
