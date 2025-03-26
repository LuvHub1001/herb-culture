import { useNavigate } from "react-router-dom";

const useSearch = () => {
  const navigate = useNavigate();

  const handleSearchButton = () => {
    navigate("/search");
  };

  return { handleSearchButton };
};

export default useSearch;
