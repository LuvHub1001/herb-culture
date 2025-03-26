import { useSearch } from "../../hooks";

function SearchBar() {
  const { handleSearchButton } = useSearch();

  return (
    <div className="flex w-screen mt-10 justify-center items-center">
      <input
        type="text"
        className="border-2 rounded-lg w-120 h-15 placeholder:text-lg p-2"
        placeholder="원하시는 문화행사를 검색하세요"
      />
      <img
        src="/assets/images/search.svg"
        className="absolute right-178 cursor-pointer"
        onClick={handleSearchButton}
      />
    </div>
  );
}

export default SearchBar;
