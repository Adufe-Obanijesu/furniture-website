// icons
import { BsArrowRight } from "react-icons/bs";

const Blog = ({ date, heading, image }) => {
	return (
		<div id="blog" className="py-4 border-y border-gray-300">
			<div className="grid md:grid-cols-2 gap-4">
				<div className="v-center">
					<div>
						<h6 className="font-medium uppercase text-gray-700 text-sm">{date}</h6>
						<h3 className="heading mt-3 mb-2">{heading}</h3>
						<span className="rounded-full border border-gray-700 text-gray-700 hover:text-white hover:bg-gray-700 pb-1 px-3">
							<BsArrowRight className="inline text-xl" />
						</span>
					</div>
				</div>

				<div className="order-first md:order-last">
					<img src={`/images/blogs/${image}`} className="w-full h-80 object-cover" alt="home decor" />
				</div>
			</div>
		</div>
	)
}

export default Blog;