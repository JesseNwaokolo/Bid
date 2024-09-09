export default function sortFunc(a: { price: number }, b: { price: number }): number {
    return a.price - b.price;
  }