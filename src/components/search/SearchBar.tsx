import { useSearch } from "../../hooks";

function SearchBar() {
  const { searchKeyword, handleSearchButton, handleKeyDown, setSearchKeyword } =
    useSearch();

  return (
    <div className="flex w-screen mt-10 justify-center items-center max-sm:p-4">
      <div className="relative w-120">
        <input
          type="text"
          className="border-2 rounded-lg w-full h-15 placeholder:text-lg p-2 pr-12"
          placeholder="원하시는 문화행사를 검색하세요"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <img
          src="/assets/images/search.svg"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer w-6 h-6"
          onClick={handleSearchButton}
        />
      </div>
    </div>
  );
}

export default SearchBar;
