import { useContext } from "react";

// context
import { CartContext } from "../../contexts/cartContext";

// icons
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

const Order = ({ image, productName, price, qty }) => {

  const { dispatch } = useContext(CartContext);

  const deleteOrder = () => {
    let cart = JSON.parse(localStorage.getItem("furnitureCart"));

    let newCart = cart.filter(item => item.name !== productName);
    localStorage.setItem("furnitureCart", JSON.stringify(newCart));

    dispatch({ type: "REMOVE", payload: productName})
  }

	return (
		<tr className="hover:bg-gray-100">
      <td className="px-2 py-4">
        <div className="h-full w-full hv-center">
          <FaTimes className="inline text-red-400 cursor-pointer" onClick={deleteOrder} />
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="">
          <img src={image} alt="product" className="object-cover w-24 h-24" />
        </div>
      </td>
      <td className="py-4 px-6 font-medium text-gray-700 capitalize">{productName}</td>
      <td className="py-4 px-6 text-sm font-medium text-gray-700 whitespace-nowrap">${price}</td>
      <td className="py-4 px-6 text-sm text-gray-700">
        <div className="flex v-center h-full">
          <div className="border border-gray-700 text-gray-700 p-2 flex gap-4 v-center">
            <FaMinus className="inline text-xs cursor-pointer hover:text-black transitionItem" />
            <span className="font-medium">{qty}</span>
            <FaPlus className="inline text-xs cursor-pointer hover:text-black transitionItem" />
          </div>
        </div>
      </td>
      <td className="py-4 px-6 text-sm text-gray-700 font-bold">${price * qty}</td>
    </tr>
	)
}

export default Order;