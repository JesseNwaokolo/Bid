"use client";

export default function PageNumbers({
  productsLength,
  itemPerPage,
  pageNum,
  setPageNum,
}: {
  productsLength: number;
  itemPerPage: number;
  pageNum: number;
  setPageNum: (item:number) => void;
}) {
  const totalPages = [];

  for (let x = 1; x <= Math.ceil(productsLength / itemPerPage); x++) {
    totalPages.push(x);
  }

  return (
    <div className="my-3 gap-x-3 flex justify-center border-y-2 py-2">
      {totalPages.map((item) => {
        return (
          <button
            className={
              item === pageNum
                ? "size-8 grid place-content-center bg-primary text-white font-bold shadow-md border-2 rounded-md"
                : "size-8 grid place-content-center shadow-md border-2 rounded-md"
            }
            key={item}
            onClick={() => setPageNum(item)}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
