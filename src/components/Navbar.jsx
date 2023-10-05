import { Link, useLocation } from "react-router-dom";

// icons
import { BsHandbag } from "react-icons/bs";

const Navbar = () => {

	const { pathname } = useLocation();

	return (
		<nav className={`pt-12 mx-32 ${pathname.includes("admin") ? "hidden" : "block"}`}>

			<div className="flex justify-between py-4 border-y border-gray-300">
				
				<h1 className="text-2xl font-medium text-center uppercase tracking-wide">furniture</h1>

				<div className="v-center">
					<ul className="flex gap-8">
						<li>Home</li>
						<li>Shop</li>
						<li>Pages</li>
						<li>Blog</li>
						<li>Portfolio</li>
					</ul>
				</div>

				<Link to="/cart" className="cursor-pointer">
					<div className="flex gap-4 v-center text-gray-700">
						<BsHandbag />
						<span className="font-semibold">Cart $0.00</span>
					</div>
				</Link>
			</div>
		</nav>
	)
}

export default Navbar;