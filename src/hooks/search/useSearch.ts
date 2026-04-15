import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const useSearch = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const go = useCallback(
    (kw: string) => {
      const trimmed = kw.trim();
      if (trimmed) navigate(`/search?query=${encodeURIComponent(trimmed)}`);
    },
    [navigate],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") go(searchKeyword);
    },
    [go, searchKeyword],
  );

  const handleSearchButton = useCallback(
    () => go(searchKeyword),
    [go, searchKeyword],
  );

  return { searchKeyword, handleSearchButton, handleKeyDown, setSearchKeyword };
};

export default useSearch;
