// icons
import { BsArrowRight } from "react-icons/bs";

const Blog = ({ date, heading, image }) => {
	return (
		<div className="py-4 border-y border-gray-300">
			<div className="flex justify-between v-center">
				<div className="w-1/2">
					<h6 className="font-medium uppercase text-gray-700 text-sm">{date}</h6>
					<h3 className="heading mt-3 mb-2">{heading}</h3>
					<span className="rounded-full border border-gray-700 text-gray-700 hover:text-white hover:bg-gray-700 pb-1 px-3">
						<BsArrowRight className="inline text-xl" />
					</span>
				</div>

				<div>
					<img src={`/images/blogs/${image}`} className="w-60 h-full object-cover" alt="home decor" />
				</div>
			</div>
		</div>
	)
}

export default Blog;