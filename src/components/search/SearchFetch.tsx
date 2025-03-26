import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { get } from "../../apis";
import { useFetch, usePagination } from "../../hooks";
import { Pagination } from "../";
import { EventType } from "../../types/EventType";

function SearchFetch() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchKeyword = queryParams.get("query"); // 쿼리 파라미터에서 검색어 가져오기

  const [totalItems, setTotalItems] = useState<number>(0);
  const { currentPage, setCurrentPage } = usePagination({
    totalItems,
    divider: 10,
  });

  const startIndex = (currentPage - 1) * 10 + 1;
  const endIndex = currentPage * 10;

  const eventCategories = ["교육", "전시", "체험"];

  const isCategory = eventCategories.some((category) =>
    searchKeyword?.includes(category),
  );

  const searchRes = useFetch(
    get,
    isCategory
      ? `/culturalEventInfo/${startIndex}/${endIndex}/${searchKeyword}/`
      : `/culturalEventInfo/${startIndex}/${endIndex}/%20/${searchKeyword}`,
  );

  console.log(searchKeyword);

  useEffect(() => {
    if (searchRes?.data?.culturalEventInfo?.list_total_count) {
      const totalCount = searchRes.data.culturalEventInfo.list_total_count;
      setTotalItems(totalCount);
    }
  }, [searchRes]);

  const temp = searchRes?.data?.culturalEventInfo?.row || [];
  return temp.length > 0 ? (
    <>
      <div className="flex mt-10 justify-center font-bold text-2xl">
        <span className="text-red-400">"{searchKeyword}" &nbsp;</span>검색
        결과입니다.
      </div>
      <div className="flex w-screen justify-center mt-10">
        <div className="grid w-10/12 grid-cols-5 gap-6">
          {temp.map((item: EventType, idx: number) => (
            <div key={idx} className="border-2 border-[#EFEFEF] rounded-2xl">
              <a
                className="cursor-pointer"
                href={item.ORG_LINK}
                target="_blank"
              >
                <img
                  className="w-full h-70 rounded-tl-xl rounded-tr-xl"
                  src={item.MAIN_IMG}
                />
              </a>
              <div className="p-2">
                <div>
                  {item.TITLE.length > 18
                    ? item.TITLE.slice(0, 18) + "..."
                    : item.TITLE}
                </div>
                <div>구분: {item.CODENAME}</div>
                <div>지역: {item.GUNAME}</div>
                <div>기간: {item.DATE}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Pagination
        totalItems={totalItems}
        divider={10}
        onPageChange={setCurrentPage}
      />
    </>
  ) : (
    <div className="flex mt-10 justify-center font-bold text-2xl">
      <span className="text-red-400">"{searchKeyword}" &nbsp;</span>에 관한
      정보가 없습니다.
    </div>
  );
}

export default SearchFetch;
