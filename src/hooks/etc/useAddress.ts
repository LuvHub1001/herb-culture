import { useState, useEffect } from "react";

type LocationType = {
  latitude: number;
  longitude: number;
};

const useAddress = () => {
  const [location, setLocation] = useState<LocationType | null>(null);

  useEffect(() => {
    const { geolocation } = navigator;
    if (!geolocation) return;

    geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ latitude, longitude });
      },
      (err) => console.log(err),
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      },
    );
  }, []);

  return {
    location,
  };
};

export default useAddress;
