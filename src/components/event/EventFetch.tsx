import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { buttonGuAtom, currentGuAtom } from "../../jotai/atom.ts";
import { get } from "../../apis";
import { usePagination, useFetch } from "../../hooks";
import { EventSkeleton, Pagination } from "../";
import { EventType } from "../../types/EventType";

// ⭐todo 관심사 분리

function EventFetch() {
  const [totalItems, setTotalItems] = useState<number>(0);
  const { currentPage, setCurrentPage } = usePagination({
    totalItems,
    divider: 10,
  });

  const [buttonGu] = useAtom(buttonGuAtom);
  const [currentGu] = useAtom(currentGuAtom);

  const [allEvents, setAllEvents] = useState<EventType[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const startIndex = (currentPage - 1) * 10 + 1;
  const endIndex = currentPage * 10;

  // 전체 데이터 개수 가져오기 위함
  const totalCountRes = useFetch(get, `/culturalEventInfo/1/1`);
  const totalDataCount =
    totalCountRes?.data?.culturalEventInfo?.list_total_count;

  // 최대치로 나눌 수 있는 1000개씩 나누기
  useEffect(() => {
    const fetchAllEvents = async () => {
      if (totalDataCount) {
        const batchSize = 1000;
        const totalRequests = Math.ceil(totalDataCount / batchSize);
        const promises = [];

        for (let i = 0; i < totalRequests; i++) {
          const start = i * batchSize + 1;
          const end = Math.min((i + 1) * batchSize, totalDataCount);
          promises.push(get(`/culturalEventInfo/${start}/${end}`));
        }

        try {
          const results = await Promise.all(promises);
          const allData = results
            .map((res) => res?.data?.culturalEventInfo?.row || [])
            .flat();

          setAllEvents(allData);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      }
    };

    if (totalDataCount) {
      fetchAllEvents();
    }
  }, [totalDataCount]);

  // 지역구 필터
  useEffect(() => {
    if (allEvents.length > 0) {
      const selectedGu = buttonGu || currentGu; // 최초 접속 때에는 현재 접속 위치 기반의 지역구

      const filtered = allEvents.filter(
        (item: EventType) => item.GUNAME === selectedGu,
      );

      setFilteredEvents(filtered);
      setTotalItems(filtered.length);
    }
  }, [allEvents, buttonGu, currentGu]);

  const paginatedEvents = filteredEvents.slice(startIndex - 1, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [buttonGu]);

  return (
    <>
      <div className="flex w-screen justify-center mt-10">
        <div className="grid w-10/12 grid-cols-5 gap-6">
          {isLoading
            ? [...Array(10)].map((_, idx) => <EventSkeleton key={idx} />)
            : paginatedEvents.map((item: EventType, idx: number) => {
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
                        {item.TITLE.length > 18
                          ? item.TITLE.slice(0, 18) + "..."
                          : item.TITLE}
                      </div>
                      <div>구분: {item.CODENAME}</div>
                      <div>지역: {item.GUNAME}</div>
                      <div>기간: {item.DATE}</div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
      <Pagination
        key={buttonGu}
        totalItems={totalItems}
        divider={10}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default EventFetch;
