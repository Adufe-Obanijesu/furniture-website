import { useLocation } from "react-router-dom";

const Footer = () => {

	const { pathname } = useLocation();

	return (
		<footer className={`mt-32 mx-32 py-12 border-t-2 broder-gray-700 ${pathname.includes("admin") ? "hidden" : "block"}`}>
			<div className="grid grid-cols-4 text-gray-700">
				<div>
					<h4 className="text-lg uppercase font-semibold">company</h4>
					<ul className="mt-6 flex flex-col gap-3">
						<li>what we do</li>
						<li>available services</li>
						<li>latest posts</li>
						<li>careers</li>
						<li>FAQs</li>
					</ul>
				</div>

				<div>
					<h4 className="text-lg uppercase font-semibold">customer service</h4>
					<ul className="mt-6 flex flex-col gap-3">
						<li>help & contact us</li>
						<li>returns & refunds</li>
						<li>delivery information</li>
						<li>terms & conditions</li>
					</ul>
				</div>

				<div>
					<h4 className="text-lg uppercase font-semibold">social media</h4>
					<ul className="mt-6 flex flex-col gap-3">
						<li>twitter</li>
						<li>instagram</li>
						<li>facebook</li>
						<li>pinterest</li>
					</ul>
				</div>

				<div>
					<h4 className="text-lg uppercase font-semibold">profile</h4>
					<ul className="mt-6 flex flex-col gap-3">
						<li>my account</li>
						<li>checkout</li>
						<li>order tracking</li>
						<li>help & support</li>
					</ul>
				</div>

			</div>

			<div className="flex justify-between items-end text-sm mt-12">
				<div>
					<h1 className="inline text-4xl font-medium text-center uppercase tracking-wide pb-6">furniture</h1>
					<p className="font-medium capitalize ml-2 inline">
						&copy; furniture Co. all rights reserved.
					</p>
				</div>
				<div>
					<p className="font-medium capitalize">
						We use cookies to give you the best experience on our website. <span className="underline">Cookie settings</span>
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer;