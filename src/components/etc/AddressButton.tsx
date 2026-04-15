import { memo, useCallback, useEffect } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { buttonGuAtom, currentGuAtom, geoStatusAtom } from "../../jotai/atom";
import { useFetch, useAddress } from "../../hooks";
import { get } from "../../apis";
import { AddressData } from "../../lib/Address";
import { LocationType } from "../../types/AddressType";

const KAKAO_HEADERS = {
  headers: {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_KEY}`,
  },
};

function GeoDetector({ location }: { location: LocationType }) {
  const setCurrentGu = useSetAtom(currentGuAtom);
  const setButtonGu = useSetAtom(buttonGuAtom);

  const addressFetch = useFetch(
    get,
    `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${location.longitude}&y=${location.latitude}`,
    KAKAO_HEADERS,
  );

  useEffect(() => {
    const doc = addressFetch?.data?.documents?.[0];
    if (doc) {
      const detectedGu = doc.address.region_2depth_name;
      setCurrentGu(detectedGu);
      setButtonGu(detectedGu);
    }
  }, [addressFetch?.data, setCurrentGu, setButtonGu]);

  return null;
}

function AddressButton() {
  const { location, buttonGu, handleButtonGu } = useAddress();
  const [currentGu] = useAtom(currentGuAtom);
  const geoStatus = useAtomValue(geoStatusAtom);

  const onSelect = useCallback(
    (name: string | null) => handleButtonGu(name),
    [handleButtonGu],
  );

  const statusText =
    geoStatus === "unavailable"
      ? "위치를 직접 선택해 주세요"
      : currentGu ?? "감지 중…";

  return (
    <section className="mx-auto mt-10 w-full max-w-6xl px-4 md:px-6">
      {location && geoStatus === "ok" && !currentGu && (
        <GeoDetector location={location} />
      )}

      <div className="mb-4 flex items-baseline gap-2">
        <span className="text-sm font-semibold text-[var(--text-muted)]">
          현재 위치
        </span>
        <span className="text-sm font-extrabold text-[var(--accent)]">
          {statusText}
        </span>
      </div>

      <div className="no-scrollbar -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
        <div className="flex flex-nowrap gap-2 md:flex-wrap">
          <button
            type="button"
            onClick={() => onSelect(null)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
              buttonGu === null
                ? "border-[var(--text)] bg-[var(--text)] text-white hover:bg-black"
                : "border-[var(--border)] bg-white text-[var(--text)] hover:border-gray-400 hover:bg-gray-50"
            }`}
          >
            전체
          </button>
          {AddressData.map((item) => {
            const active = buttonGu === item.name;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.name)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                  active
                    ? "border-[var(--text)] bg-[var(--text)] text-white hover:bg-black"
                    : "border-[var(--border)] bg-white text-[var(--text)] hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(AddressButton);
