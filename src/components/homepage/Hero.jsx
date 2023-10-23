const Hero = () => {
	return (
		<header className="py-12">

			<div className="grid lg:grid-cols-2 gap-4">
				
				<div className="relative">
					<img src="/images/hero/hero1.jpg" className="lg:h-full h-80 w-full object-cover" alt="chair" />
					<div className="absolute top-0 left-0 p-8">
						<h5 className="text-xl font-semibold uppercase">chairs & stools</h5>
						<p className="text-gray-700 mt-1">
							By Lois Mogan
						</p>
					</div>
				</div>

				<div className="flex flex-col gap-4">
					<div className="relative">
						<img src="/images/hero/hero2.jpg" className="h-60 w-full object-cover" alt="lamps" />
						<div className="absolute top-0 left-0 p-8">
							<h5 className="text-xl font-semibold uppercase">lamps & pendants</h5>
							<p className="text-gray-700 mt-1">
								By Disco & James
							</p>
						</div>
					</div>

					<div className="relative">
						<img src="/images/hero/hero3.jpg" className="h-60 w-full object-cover" alt="clock" />
						<div className="absolute top-0 left-0 p-8">
							<h5 className="text-xl font-semibold uppercase">haus decor</h5>
							<p className="text-gray-700 mt-1">
								By Augustina Chan
							</p>
						</div>
					</div>
				</div>

			</div>

		</header>
	)
}

export default Hero;