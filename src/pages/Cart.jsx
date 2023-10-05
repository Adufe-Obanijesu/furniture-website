// components
import Table from "../components/cart/Table";
import Total from "../components/cart/Total";

const Cart = () => {
	return (
		<main className="px-32">

			<div className="">
				<h1 className="text-5xl font-medium text-center uppercase tracking-wide pb-6 py-12">shopping cart</h1>
			</div>

			<Table />
			
			<Total />

		</main>
	)
}

export default Cart;