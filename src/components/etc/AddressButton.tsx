import { useEffect } from "react";
import { useAtom } from "jotai";
import { currentGuAtom } from "../../jotai/atom.ts";
import { useFetch, useAddress } from "../../hooks";
import { get } from "../../apis";
import { AddressData } from "../../lib/Address.ts";

function AddressButton() {
  const { location, buttonGu, handleButtonGu, setButtonGu } = useAddress();
  const [currentGu, setCurrentGu] = useAtom(currentGuAtom);

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
      const detectedGu =
        AddressFetch.data.documents[0].address.region_2depth_name;
      setCurrentGu(detectedGu);
      setButtonGu(detectedGu);
    }
  }, [AddressFetch?.data]);

  useEffect(() => {
    if (currentGu) {
      setButtonGu(currentGu);
    }
  }, [currentGu]);

  return (
    <>
      <div className="flex justify-center mt-5">
        <div>
          현재 접속 위치는 <span className="text-blue-500">{currentGu}</span>
          입니다.
        </div>
      </div>
      <div className="flex mt-5 justify-center">
        <div className="grid grid-cols-10 gap-3">
          {AddressData.map((item) => {
            return (
              <div key={item.id}>
                <button
                  className={`cursor-pointer rounded-2xl w-20 text-white ${
                    buttonGu === item.name ? "bg-blue-500" : "bg-gray-400"
                  }`}
                  onClick={() => handleButtonGu(item.name)}
                >
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
