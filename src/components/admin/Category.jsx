import { Link } from "react-router-dom";

const Category = ({ catName, image, id }) => {
	return (
		<Link to={`/admin/category?name=${catName}&id=${id}`}>
      <img src={image} layout="fill" className="object-cover h-60 w-full cursor-pointer" />
      <h6 className="text-gray-600 font-semibold uppercase mt-4 tracking-wide">{catName}</h6>
    </Link>
	)
}

export default Category;