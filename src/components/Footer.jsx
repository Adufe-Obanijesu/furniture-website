const Footer = () => {

	return (
		<footer className="lg:mt-32 mt-12 lg:px-32 md:px-12 px-6 py-12 border-t-2">
			<div className="grid md:grid-cols-4 grid-cols-2 gap-4 md:gap-0 text-gray-700">
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

			<div className="flex flex-wrap md:gap-4 gap-2 justify-between items-end text-sm mt-12">
				<div>
					<h1 className="md:inline text-4xl font-medium text-center uppercase tracking-wide pb-6">furniture</h1>
					<p className="font-medium capitalize md:ml-2 inline">
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