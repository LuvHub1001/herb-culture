import { useCallback, useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  buttonGuAtom,
  geoStatusAtom,
  locationAtom,
} from "../../jotai/atom";

const CACHE_KEY = "bg:location";
const CACHE_TTL_MS = 1000 * 60 * 30;
const ACCURACY_THRESHOLD_M = 5000;

type Cached = { lat: number; lng: number; ts: number };

const readCache = (): Cached | null => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Cached;
    if (Date.now() - parsed.ts > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
};

const writeCache = (lat: number, lng: number) => {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ lat, lng, ts: Date.now() }),
    );
  } catch {
    /* noop */
  }
};

const useAddress = () => {
  const [location, setLocation] = useAtom(locationAtom);
  const [buttonGu, setButtonGu] = useAtom(buttonGuAtom);
  const setGeoStatus = useSetAtom(geoStatusAtom);

  const handleButtonGu = useCallback(
    (guName: string | null) => setButtonGu(guName),
    [setButtonGu],
  );

  useEffect(() => {
    if (location) {
      setGeoStatus("ok");
      return;
    }

    const cached = readCache();
    if (cached) {
      setLocation({ latitude: cached.lat, longitude: cached.lng });
      setGeoStatus("ok");
      return;
    }

    const { geolocation } = navigator;
    if (!geolocation) {
      setGeoStatus("unavailable");
      return;
    }

    let settled = false;
    const finish = (status: "ok" | "unavailable") => {
      if (settled) return;
      settled = true;
      clearTimeout(fallbackTimer);
      setGeoStatus(status);
    };

    // iOS Safari 등에서 콜백이 영영 호출되지 않는 경우 대비
    const fallbackTimer = setTimeout(() => finish("unavailable"), 12000);

    const onSuccess: PositionCallback = (pos) => {
      const { latitude, longitude, accuracy } = pos.coords;
      if (accuracy > ACCURACY_THRESHOLD_M) {
        console.warn(
          `[geolocation] accuracy too low (${accuracy}m). falling back to manual.`,
        );
        finish("unavailable");
        return;
      }
      setLocation({ latitude, longitude });
      writeCache(latitude, longitude);
      finish("ok");
    };

    const onError: PositionErrorCallback = (err) => {
      console.warn("geolocation error:", err);
      // 고정밀 실패 시 저정밀으로 1회 재시도
      geolocation.getCurrentPosition(
        onSuccess,
        (err2) => {
          console.warn("geolocation retry error:", err2);
          finish("unavailable");
        },
        { enableHighAccuracy: false, maximumAge: 60000, timeout: 8000 },
      );
    };

    geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 8000,
    });

    return () => {
      clearTimeout(fallbackTimer);
    };
  }, [location, setLocation, setGeoStatus]);

  return { location, buttonGu, handleButtonGu, setButtonGu };
};

export default useAddress;
