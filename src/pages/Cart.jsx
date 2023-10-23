import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

// context
import { CartContext } from "../contexts/cartContext";

// components
import Table from "../components/cart/Table";
import Total from "../components/cart/Total";
import MobileView from "../components/cart/MobileTable";

const Cart = () => {

	const [windowWidth, setWindowWidth] = useState(getWindowSize());

	function getWindowSize() {
		const { innerWidth } = window;
		return innerWidth;
	}

	useEffect(() => {
		function handleWindowResize() {
			setWindowWidth(getWindowSize());
		}

		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	const { cart } = useContext(CartContext);

	const [ total, setTotal ] = useState(0);

	useEffect(() => {
		if (cart.length === 0) {
		setTotal(0);
		return;
		}

		let totalPrice = cart.reduce((total, item) => {
			total += item.price * item.qty;
			return total;
		}, 0);
		setTotal(totalPrice)
	}, [cart]);

	return (
		<main className="lg:px-32 md:px-12 px-6 w-full">

			<div className="">
				<h1 className="md:text-5xl text-3xl font-medium text-center uppercase tracking-wide pb-6 py-12">shopping cart</h1>
			</div>

			{
				windowWidth > 690 ? <Table cart={cart} total={total} /> : (
					<div className="py-6">
						{
							cart.length > 0 && cart.map(order => <MobileView key={order.name} image={order.image} productName={order.name} price={order.price} qty={order.qty} />)
						}
						{
							total === 0 && (
							<div className="">
							
								<div className="">
									<h3 className="font-medium">No item found in your cart. Click on the purchase button to shop.</h3>
								</div>

									<div className="mt-2">
										<Link to="/"><button className="blackButton">Purchase</button></Link>
									</div>
								</div>
							)
							}
					</div>
				)
				
			}

			<Total />

		</main>
	)
}

export default Cart;