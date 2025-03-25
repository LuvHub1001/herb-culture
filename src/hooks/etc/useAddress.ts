import { useEffect } from "react";
import { useAtom } from "jotai";
import { buttonGuAtom, locationAtom } from "../../jotai/atom";

const useAddress = () => {
  const [location, setLocation] = useAtom(locationAtom);
  const [buttonGu, setButtonGu] = useAtom(buttonGuAtom);

  const handleButtonGu = (guName: string) => {
    setButtonGu(guName);
  };

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
    buttonGu,
    handleButtonGu,
    setButtonGu,
  };
};

export default useAddress;
