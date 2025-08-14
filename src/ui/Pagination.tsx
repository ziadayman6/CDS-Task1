type Pagination = {
  totalPages: number;
  start: number;
  totalItems: number;
  setPage: (num: number) => void;
  currentPage: number;
};

function Pagination({
  totalPages,
  start,
  totalItems,
  setPage,
  currentPage,
}: Pagination) {
  return (
    <div className="flex justify-between items-center mt-5">
      <div className="text-black">
        Show results from <span>{start + 1}</span> -
        <span> {start + totalItems}</span>
      </div>
      <div className="flex gap-3 items-center justify-end flex-wrap w-[60%]">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => {
              setPage(index + 1);
            }}
            className={`cursor-pointer border-yellow-500 border-[1px] px-3 py-1 font-bold ${
              currentPage === index + 1
                ? "bg-yellow-500 text-white"
                : "text-yellow-500"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Pagination;
