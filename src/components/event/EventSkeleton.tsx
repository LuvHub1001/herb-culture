function EventSkeleton() {
  return (
    <div className="flex w-full h-auto bg-gray-400 rounded-2xl animate-pulse max-sm:w-10/12 max-sm:h-[300px] max-sm:mx-auto">
      <div className="w-[310px] m-3 rounded-2xl max-sm:w-full max-sm:mx-auto max-sm:p-1">
        <div>
          <div className="bg-gray-300 rounded-tl-xl rounded-tr-xl">
            <div className="h-[260px] max-sm:h-[200px]"></div>
          </div>
          <div className="h-[100px] mt-[10px] bg-gray-300 max-sm:h-[60px]"></div>
        </div>
      </div>
    </div>
  );
}

export default EventSkeleton;
