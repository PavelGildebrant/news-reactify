import styles from './styles.module.css';
const Search = ({keywords, setKeywords}) => {
  return (
    <div className={styles.search}>
      <input
        onChange={(e) => setKeywords(e.target.value)}
        type="text"
        value={keywords}
        className={styles.input}
        placeholder='javaScript'
      />
    </div>
  );
};

export default Search;
