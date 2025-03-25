import { useNavigate } from "react-router-dom";

function Header() {
  let currentMonth = new Date().getMonth() + 1;

  const spring = [3, 4, 5];
  const summer = [6, 7, 8];
  const autumn = [9, 10, 11];
  const winter = [12, 1, 2];

  return (
    <>
      {spring.includes(currentMonth) ? (
        <div className="flex flex-col h-105 w-screen bg-spring bg-cover text-white items-center justify-center">
          <InnerHeader />
        </div>
      ) : summer.includes(currentMonth) ? (
        <div className="flex flex-col h-105 w-screen bg-summer text-blue-700 items-center justify-center">
          <InnerHeader />
        </div>
      ) : autumn.includes(currentMonth) ? (
        <div className="flex flex-col h-105 w-screen bg-authum text-yellow-900 items-center justify-center">
          <InnerHeader />
        </div>
      ) : winter.includes(currentMonth) ? (
        <div className="flex flex-col h-105 w-screen bg-winter text-white items-center justify-center">
          <InnerHeader />
        </div>
      ) : null}
    </>
  );
}

function InnerHeader() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center">
      <div className="absolute top-5 left-5">
        <div
          className="font-bold text-2xl cursor-pointer"
          onClick={handleClick}
        >
          B & G
        </div>
      </div>

      <div>
        <div className="text-5xl font-bold">CULTURE INFO</div>
        <div className="mt-2 ml-1 text-2xl md: text-center">문화행사 정보</div>
      </div>
    </div>
  );
}

export default Header;
