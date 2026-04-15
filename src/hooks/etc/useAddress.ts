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

    geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        if (accuracy > ACCURACY_THRESHOLD_M) {
          console.warn(
            `[geolocation] accuracy too low (${accuracy}m). falling back to manual.`,
          );
          setGeoStatus("unavailable");
          return;
        }
        setLocation({ latitude, longitude });
        setGeoStatus("ok");
        writeCache(latitude, longitude);
      },
      (err) => {
        console.warn("geolocation error:", err);
        setGeoStatus("unavailable");
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 },
    );
  }, [location, setLocation, setGeoStatus]);

  return { location, buttonGu, handleButtonGu, setButtonGu };
};

export default useAddress;
