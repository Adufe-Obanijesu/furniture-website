import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

// context
import { CartContext } from "../contexts/cartContext";

// icons
import { BsHandbag } from "react-icons/bs";

const Navbar = ({ show, setShow }) => {

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
		<nav className={`pt-12 lg:px-32 md:px-12 px-6 fixed md:relative z-20 w-2/3 md:w-auto h-screen md:h-auto ${show ? "block" : "hidden"} bg-white md:bg-transparent shadow md:shadow-none md:block`}>

			<div className="md:flex justify-between py-4 md:border-y border-gray-300">
				
				<h1 className="text-2xl font-medium text-center uppercase tracking-wide border-b border-gray-300 pb-2 md:pb-0"><Link to="/" onClick={() => setShow(false)}>furniture</Link></h1>

				<div className="v-center mt-8 md:mt-0">
					<ul className="flex flex-col items-center md:justify-start w-full md:flex-row gap-8">
						<li><Link to="/" onClick={() => setShow(false)}>Home</Link></li>
						<li onClick={() => setShow(false)}>Shop</li>
						<li onClick={() => setShow(false)}>Pages</li>
						<li onClick={() => setShow(false)}>Blog</li>
						<li onClick={() => setShow(false)}><Link to="/admin">Admin</Link></li>
					</ul>
				</div>

				<Link to="/cart" onClick={() => setShow(false)} className="cursor-pointer">
					<div className="flex gap-4 v-center h-center md:justify-start mt-4 md:mt-0 border rounded-md md:border-0 py-2 md:py-0 text-gray-700">
						<BsHandbag />
						<span className="font-semibold">Cart ${total}</span>
					</div>
				</Link>
			</div>
		</nav>
	)
}

export default Navbar;