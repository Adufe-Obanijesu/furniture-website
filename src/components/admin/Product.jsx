import { useState } from "react";

// modals
import DeleteProduct from "./modals/DeleteProduct";

// firebase
import {
  doc,
  db,
} from "../../firebase/index";

// icons
import { FaEdit } from "react-icons/fa";
import { ImBin } from "react-icons/im";

const Product = ({ id, image, productName, description, price, qty }) => {

  const [ modal, setModal ] = useState(false);

  const docRef = doc(db, "products", id);

	return (
		<tr className="hover:bg-gray-100">
      <td className="px-6 py-4">
        <div className="relative w-24 h-24">
          <img src={image} alt="product" className="object-cover" />
        </div>
      </td>
      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap capitalize">{productName}</td>
      <td className="py-4 px-6 text-sm text-gray-900">{description}</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">${price}</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">{qty}</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
        <FaEdit className="inline text-4xl cursor-pointer text-blue-500 hover:text-blue-700 py-2 transition duration-300 ease-in" />
        <ImBin className="inline text-4xl cursor-pointer text-red-500 hover:text-red-700 py-2 transition duration-300 ease-in" onClick={() => setModal(true)} />
        

        <DeleteProduct
          modal={modal}
          setModal={() => setModal()}
          docRef={docRef}
          name={productName}
        />

      </td>
	  </tr>
	)
}

export default Product;