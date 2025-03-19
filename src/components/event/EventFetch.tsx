import { get } from "../../apis";
import { useFetch } from "../../hooks";
import { EventType } from "../../types/EventType";

function EventFetch() {
  const eventRes = useFetch(get, "/culturalEventInfo/1/9");

  return (
    eventRes && (
      <div className="flex w-screen justify-center mt-10    ">
        <div className="grid w-1/2 grid-cols-3 gap-6">
          {eventRes.data.culturalEventInfo.row.map(
            (item: EventType, idx: number) => {
              return (
                <div key={idx} className="border-2 rounded-2xl">
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
                  <div className="mt-2">
                    <div>{item.TITLE}</div>
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
    )
  );
}

export default EventFetch;
