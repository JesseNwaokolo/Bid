"use client";

import Card from "@/components/Card";
import Filter from "@/components/Filter";
import Loading from "@/components/Loading";
import PageNumbers from "@/components/PageNumbers";

import { useEffect, useState } from "react";

interface products {
  id: number;
  title: string;
  price: string;
  category: string;
  image: string;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<products[]>([]);
  
  //for pagination
  const [pageNum, setPageNum] = useState(1);

  const itemPerPage = 10;
  const lastIndex = itemPerPage * pageNum;
  const firstIndex = lastIndex - itemPerPage;
  //pagination end
  const currentProductPage = products.slice(firstIndex,lastIndex)
  //
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://fakestoreapi.com/products");
        setLoading(false);
        if (!res.ok) {
          throw new Error("Error fetching data");
        }
        const json = await res.json();
        setProducts(json);
        localStorage.setItem("mock", JSON.stringify(json));
        console.log(json);
      } catch (error) {}
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto h-full">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Filter setProducts={setProducts} setLoading={setLoading} />
          <PageNumbers
            productsLength={products.length}
            pageNum={pageNum}
            setPageNum={setPageNum}
            itemPerPage={itemPerPage}
          />
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center p-4">
            {currentProductPage.map((item) => (
              <Card
                key={item.id}
                title={item.title}
                image={item.image}
                category={item.category}
                price={item.price}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
