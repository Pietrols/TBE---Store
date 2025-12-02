import Products from "../components/Products";

export default function Deals() {
  return (
    <div className="">
      <h1>Deal of the Day</h1>
      <Products limit={10} />
    </div>
  );
}
