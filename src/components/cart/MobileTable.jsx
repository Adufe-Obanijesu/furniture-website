import { useContext } from "react";

// context
import { CartContext } from "../../contexts/cartContext";

// icons
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

const MobileView = ({ image, productName, price, qty }) => {

    const { dispatch } = useContext(CartContext);

    const deleteOrder = () => {
        let cart = JSON.parse(localStorage.getItem("furnitureCart"));

        let newCart = cart.filter(item => item.name !== productName);
        localStorage.setItem("furnitureCart", JSON.stringify(newCart));

        dispatch({ type: "REMOVE", payload: productName})
    }
    
    return (
        <div className="flex gap-4 mb-4">
            <div>
                <div className="h-full hv-center">
                    <FaTimes className="inline text-red-400 cursor-pointer" onClick={deleteOrder} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
                <div className="">
                    <img src={image} alt="product" className="object-cover w-full h-28" />
                </div>

                <div className="">
                    <h3 className="font-bold text-lg text-gray-700 capitalize">{productName}</h3>
                    <p className="mt-2 text-sm font-semibold text-xl text-gray-700">${price * qty}</p>
                    <div className="mt-2 border border-gray-700 text-gray-700 p-2 flex gap-4 v-center w-fit">
                        <FaMinus className="inline text-xs cursor-pointer hover:text-black transitionItem" />
                        <span className="font-medium">{qty}</span>
                        <FaPlus className="inline text-xs cursor-pointer hover:text-black transitionItem" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MobileView;