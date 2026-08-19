import styles from './Search.module.scss';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function Search({
  value,
  onChange,
  placeholder = '輸入搜尋關鍵字',
}: SearchProps) {
  return (
    <>
      <div className={styles['search-wrap']}>
        <span className={styles['search-icon']}>🔍</span>
        <input
          type="text"
          name="search"
          className={styles['search-input']}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        {value && (
          <button
            type="button"
            className={styles['clear-btn']}
            onClick={() => onChange('')}
            aria-label="清除搜尋內容"
          >
            ✕
          </button>
        )}
      </div>
    </>
  );
}
