import { get } from "../../apis";
import { useFetch } from "../../hooks";

function EventFetch() {
  const eventItems = useFetch(get, "/culturalEventInfo/1/100");

  console.log(eventItems);

  return <div></div>;
}

export default EventFetch;
