import { get } from "../../apis";
import { useFetch } from "../../hooks";
import { EventType } from "../../types/EventType";

function EventFetch() {
  const eventRes = useFetch(get, "/culturalEventInfo/1/50");

  return (
    eventRes && (
      <div className="flex w-screen justify-center mt-10    ">
        <div className="grid grid-cols-3 gap-6">
          {eventRes.data.culturalEventInfo.row.map(
            (item: EventType, idx: number) => {
              return (
                <div key={idx}>
                  <img className="w-70 h-70 rounded-2xl" src={item.MAIN_IMG} />
                  <div>지역: {item.GUNAME}</div>
                  <div>기간: {item.DATE}</div>
                  <div>비용: {item.USE_FEE === "" ? "무료" : item.USE_FEE}</div>
                </div>
              );
            },
          )}
        </div>
      </div>
    )
  );
}

export default EventFetch;
