import './Search.scss';

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
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          name="search"
          className="search-input"
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        {value && (
          <button
            type="button"
            className="clear-btn"
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
