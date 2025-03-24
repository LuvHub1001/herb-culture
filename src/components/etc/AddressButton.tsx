import { useEffect, useState } from "react";
import { useFetch, useAddress } from "../../hooks";
import { get } from "../../apis";
import { AddressData } from "../../lib/Address.ts";

function AddressButton() {
  const [currentGu, setCurrentGu] = useState<string>("강남구");
  const { location } = useAddress();

  const AddressFetch = useFetch(
    get,
    `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${location?.longitude}&y=${location?.latitude}`,
    {
      headers: {
        Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_KEY}`,
      },
    },
  );

  useEffect(() => {
    if (AddressFetch?.data?.documents && AddressFetch.data.documents[0]) {
      setCurrentGu(AddressFetch.data.documents[0].address.region_2depth_name);
    }
  }, [AddressFetch?.data]);

  return (
    <>
      <div className="flex justify-center mt-5">
        <div>
          현재 접속 위치는 <span className="text-blue-500">{currentGu}</span>{" "}
          입니다.
        </div>
      </div>
      <div className="flex mt-5 justify-center">
        <div className="grid grid-cols-10 gap-3">
          {AddressData.map((item) => {
            return (
              <div key={item.id}>
                <button className="cursor-pointer bg-gray-400 rounded-2xl w-20 text-white">
                  {item.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AddressButton;
