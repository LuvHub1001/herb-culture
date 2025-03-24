function EventSkeleton() {
  return (
    <div className="flex w-75 h-99 bg-gray-400 rounded-2xl animate-pulse">
      <div className="w-[310px] m-3 rounded-2xl">
        <div>
          <div className=" bg-gray-300 rounded-tl-xl rounded-tr-xl">
            <div className="h-[260px]"></div>
          </div>
          <div className="h-[100px] mt-[10px]  bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}

export default EventSkeleton;
