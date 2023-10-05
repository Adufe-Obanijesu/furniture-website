import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

// context
import { CartContext } from "../contexts/cartContext";

// icons
import { BsHandbag } from "react-icons/bs";

const Navbar = () => {

	const { cart, dispatch } = useContext(CartContext);

	const { pathname } = useLocation();

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
		<nav className={`pt-12 mx-32 ${pathname.includes("admin") ? "hidden" : "block"}`}>

			<div className="flex justify-between py-4 border-y border-gray-300">
				
				<h1 className="text-2xl font-medium text-center uppercase tracking-wide">furniture</h1>

				<div className="v-center">
					<ul className="flex gap-8">
						<li><Link to="/">Home</Link></li>
						<li>Shop</li>
						<li>Pages</li>
						<li>Blog</li>
						<li><Link to="/admin">Admin</Link></li>
					</ul>
				</div>

				<Link to="/cart" className="cursor-pointer">
					<div className="flex gap-4 v-center text-gray-700">
						<BsHandbag />
						<span className="font-semibold">Cart ${total}</span>
					</div>
				</Link>
			</div>
		</nav>
	)
}

export default Navbar;