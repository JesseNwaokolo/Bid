interface products {
  id?: number;
  title: string;
  price: string;
  category: string;
  image: string;
}

import Image from "next/image";

export default function Card(props: products) {
  return (
    <div className="shadow-2xl rounded-xl p-2 h-full w-full">
      <div className="grid place-content-center h-[200px] mb-2 overflow-clip">
        <Image src={props.image} alt={props.title} width={150} height={150} />
      </div>
      <div className=" p-2 ">
        <p className="font-semibold ">{props.title}</p>
        <p className="text-[0.8rem] my-2 font-mono">Price: <span>{props.price}</span></p>
        <p className="text-secondary font-bold">Category: {props.category}</p>
      </div>
    </div>
  );
}
