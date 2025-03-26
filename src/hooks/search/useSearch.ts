import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSearch = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchKeyword.trim()) {
      navigate(`/search?query=${searchKeyword}`);
    }
  };

  const handleSearchButton = () => {
    if (searchKeyword.trim()) {
      navigate(`/search?query=${searchKeyword}`);
    }
  };

  return { searchKeyword, handleSearchButton, handleKeyDown, setSearchKeyword };
};

export default useSearch;
