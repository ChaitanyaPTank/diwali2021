import style from './search.css';

const SearchBar = (props) => {
  const { handlers } = props;
  const {
    handleSearch,
    toggleOrdered,
    setLimit,
    searchOrdered
  } = handlers;

  return (
    <div className={style.top}>
      <div>
        <input placeholder="Search..." type="text" onKeyUp={handleSearch} />
      </div>
      <div style="display: flex; align-items: center; justify-content: center;">
        <input style="width: 16px; margin: 0.5rem;" type="checkbox" checked={searchOrdered} onChange={toggleOrdered} />
        <label htmlFor="ordered" onClick={toggleOrdered}>Search ordered</label>
      </div>
      <ul>
        <li onClick={() => { setLimit(5) }}>5</li>
        <li onClick={() => { setLimit(10) }}>10</li>
        <li onClick={() => { setLimit(15) }}>15</li>
        <li onClick={() => { setLimit(20) }}>20</li>
        <li onClick={() => { setLimit(25) }}>25</li>
      </ul>
    </div>
  )
}

export default SearchBar;
