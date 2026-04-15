import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

type Season = "spring" | "summer" | "autumn" | "winter";

const getSeason = (month: number): Season => {
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
};

const SEASON_CLASS: Record<Season, string> = {
  spring: "hero-spring",
  summer: "hero-summer",
  autumn: "hero-autumn",
  winter: "hero-winter",
};

const SEASON = getSeason(new Date().getMonth() + 1);

function Header() {
  const navigate = useNavigate();

  const goHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <header
      className={`relative w-full ${SEASON_CLASS[SEASON]} text-white`}
      aria-label="site header"
    >
      <div className="absolute inset-0 bg-black/10" aria-hidden />
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <button
          type="button"
          onClick={goHome}
          className="text-lg font-extrabold tracking-wide text-white/90 transition-colors hover:text-white uppercase tracking-[0.2em] text-white/85"
        >
          Herb Culture
        </button>
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center px-6 pb-10 pt-8 text-center md:pb-14 md:pt-10">
        <button
          type="button"
          onClick={goHome}
          className="cursor-pointer text-3xl font-black leading-tight tracking-tight drop-shadow-md transition-opacity hover:opacity-90 md:text-5xl"
        >
          CULTURE INFO
        </button>
        <p className="mt-2 text-xs font-medium text-white/90 md:text-sm">
          서울 곳곳의 전시, 공연, 축제를 한눈에
        </p>
      </div>
    </header>
  );
}

export default memo(Header);
