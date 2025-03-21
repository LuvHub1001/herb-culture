import { useEffect, useState } from "react";
import { usePagination } from "../../hooks";
import { useFetch } from "../../hooks";
import { Pagination } from "../";
import { EventType } from "../../types/EventType";
import { get } from "../../apis";

/**
 * todo
 * ⭐ 무한 렌더링 해결..
 */

function EventFetch() {
  const [totalItems, setTotalItems] = useState<number>(0);

  const { currentPage, setCurrentPage } = usePagination({
    totalItems,
    divider: 10,
  });

  const startIndex = (currentPage - 1) * 10 + 1;
  const endIndex = currentPage * 10;

  const eventRes = useFetch(
    get,
    `/culturalEventInfo/${startIndex}/${endIndex}`,
  );

  useEffect(() => {
    if (eventRes?.data?.culturalEventInfo?.list_total_count) {
      const totalCount = eventRes.data.culturalEventInfo.list_total_count;
      setTotalItems(totalCount);
    }
  }, [eventRes]);

  return (
    eventRes && (
      <>
        <div className="flex w-screen justify-center mt-10">
          <div className="grid w-10/12 grid-cols-5 gap-6">
            {eventRes.data.culturalEventInfo?.row?.map(
              (item: EventType, idx: number) => {
                return (
                  <div
                    key={idx}
                    className="border-2 border-[#EFEFEF] rounded-2xl"
                  >
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
                        {item.TITLE.length > 10
                          ? item.TITLE.slice(0, 24) + "..."
                          : item.TITLE}
                      </div>
                      <div>구분: {item.CODENAME}</div>
                      <div>지역: {item.GUNAME}</div>
                      <div>기간: {item.DATE}</div>
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </div>
        <Pagination
          totalItems={totalItems}
          divider={10}
          onPageChange={setCurrentPage}
        />
      </>
    )
  );
}

export default EventFetch;
