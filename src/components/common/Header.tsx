function Header() {
  let currentMonth = new Date().getMonth() + 1;

  const spring = [3, 4, 5];
  const summer = [6, 7, 8];
  const autumn = [9, 10, 11];
  const winter = [12, 1, 2];

  return (
    <>
      {spring.includes(currentMonth) ? (
        <div className="flex h-105 w-screen bg-spring bg-cover text-white">
          <InnerHeader />
        </div>
      ) : summer.includes(currentMonth) ? (
        <div className="flex h-105 w-screen bg-summer text-blue-700">
          <InnerHeader />
        </div>
      ) : autumn.includes(currentMonth) ? (
        <div className="flex h-105 w-screen bg-authum text-yellow-900 ">
          <InnerHeader />
        </div>
      ) : winter.includes(currentMonth) ? (
        <div className="flex h-105 w-screen bg-winter text-white">
          <InnerHeader />
        </div>
      ) : null}
    </>
  );
}

function InnerHeader() {
  return (
    <>
      <div className="flex w-30 h-20  justify-center items-center">
        <p className="mt-15 font-bold text-2xl cursor-pointer ">B & G</p>
      </div>
      <div className="flex w-screen  justify-center items-center">
        <div>
          <div className="text-5xl font-bold">CULTURE INFO</div>
          <div className="mt-2 ml-0.5 text-2xl">문화행사 정보</div>
        </div>
      </div>
    </>
  );
}

export default Header;
