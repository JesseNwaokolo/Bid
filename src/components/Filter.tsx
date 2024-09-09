"use client";

interface products {
  id: number;
  title: string;
  price: string;
  category: string;
  image: string;
}

import { CiSearch } from "react-icons/ci";
import { useState } from "react";

import sortFunc from "@/utils/sortFunc";

export default function Filter({
  setProducts,
  setLoading,
}: {
  setProducts: ([]) => void;
  setLoading: (isLoading: boolean) => void;
}) {
  const [drop, setDrop] = useState(false);
  const [sort, setSort] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const sortByCategory = async (category: string) => {
    try {
      setDrop(false);
      setLoading(true);
      const res = await fetch(
        `https://fakestoreapi.com/products/${
          category == "all" ? "" : `/category/${category}`
        }`
      );
      setLoading(false);
      if (!res.ok) {
        throw new Error("could not find category");
      }

      const json = await res.json();
      setProducts(json);
    } catch (error) {}
  };

  const searchTitle = () => {
    const json = localStorage.getItem("mock");
    try {
      if (json) {
        const products = JSON.parse(json);
        const newProducts = products.filter((item: products) => {
          return item.title.toLowerCase() == searchValue.toLowerCase().trim()
            ? item
            : "";
        });

        console.log(newProducts.length);

        if (newProducts.length > 0) {
          setProducts(newProducts);
        } else {
          alert("could not find an item with that specific title");
        }
      }
      setSearchValue("");
    } catch (error) {}
  };

  const sortByPrice = () => {
    const json = localStorage.getItem("mock");
    if (json) {
      const products = JSON.parse(json);
      setSort(!sort);
      const sortedArray = products.sort(sortFunc);
      if (sort) {
        setProducts(sortedArray);
      } else {
        setProducts(sortedArray.reverse());
      }
    }
  };

  return (
    <div className="relative ">
      <div className="my-2">
        <div className="flex gap-x-4 justify-between items-center px-4">
          <div className="space-x-4">
            <input
              type="text"
              value={searchValue}
              className="border-2 rounded-lg my-2 placeholder:p-1 placeholder:tracking-wide"
              placeholder="Search by title"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
              className="size-fit p-2 text-plain rounded-full bg-primary"
              onClick={searchTitle}
            >
              <CiSearch />
            </button>
          </div>
          <div>
            <button className="border-2" onClick={sortByPrice}>
              {sort ? "sort by desc" : "sort by asc"}
            </button>
          </div>
        </div>

        <button
          className="block mx-auto p-2 border-2 rounded-md hover:bg-plain tracking-wider"
          onClick={() => setDrop(!drop)}
        >
          Filter By Category
        </button>
      </div>

      <div
        className={
          drop
            ? "w-max p-2 inset-x-[50%] translate-x-[-50%] flex flex-col space-y-2 divide-y-2 border-2 rounded-lg bg-secondary absolute transition-all duration-200"
            : "w-max p-2 inset-x-[50%] translate-x-[-50%] flex flex-col space-y-2 divide-y-2 border-2 rounded-lg bg-secondary absolute transition-all duration-200 scale-0"
        }
      >
        <button
          className="hover:text-plain"
          onClick={() => sortByCategory("electronics")}
        >
          Electronics
        </button>
        <button
          className="hover:text-plain"
          onClick={() => sortByCategory("jewelery")}
        >
          Jewelery
        </button>
        <button
          className="hover:text-plain"
          onClick={() => sortByCategory("men's clothing")}
        >
          Men`s Clothing
        </button>
        <button
          className="hover:text-plain"
          onClick={() => sortByCategory("women's clothing")}
        >
          Women`s Clothing
        </button>
        <button
          className="hover:text-plain"
          onClick={() => sortByCategory("all")}
        >
          All
        </button>
      </div>
    </div>
  );
}
