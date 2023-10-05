import { useState, useEffect, useContext } from "react";

// context
import { CartContext } from "../../contexts/cartContext";

// icons
import { FaPlus, FaMinus } from "react-icons/fa6";

const Product = ({ name, price, image, quantity }) => {

	const { cart, dispatch } = useContext(CartContext);

	const [ loading, setLoading ]	= useState(false);
	const [ qty, setQty ] = useState(0);

	const [ isAdded, setIsAdded ] = useState(false);
	const [ error, setError ] = useState(false);
	const [ errorMessage, setErrorMessage ] = useState("");

	useEffect(() => {
		if (!localStorage.getItem("furnitureCart")) {
			return;
		}

		const findItem = JSON.parse(localStorage.getItem("furnitureCart")).filter(item => item.name === name);
		if (findItem.length > 0) {
			setIsAdded(true);
			console.log
			setQty(findItem[0].qty);
		} else {
			setIsAdded(false);
		}

	}, []);

	const cartAction = () => {

		setError(false);
		setErrorMessage("");

		if (!localStorage.getItem("furnitureCart")) {
			localStorage.setItem("furnitureCart", "[]");
		}

		let cart = JSON.parse(localStorage.getItem("furnitureCart"));

		if (isAdded) {
			let newCart = cart.filter(item => item.name !== name);
			localStorage.setItem("furnitureCart", JSON.stringify(newCart));
			dispatch({ type: "REMOVE", payload: name})
			setIsAdded(false);
			return;
		}

		if (qty === 0) {
			setError(true);
			setErrorMessage("Choose a quantity");
			setTimeout(() => {
				setError(false);
				setErrorMessage("");
			}, 5000);

			return;
		}

		cart = [...cart, {
			name,
			price,
			image,
			qty,
		}]
		localStorage.setItem("furnitureCart", JSON.stringify(cart));
		dispatch({ type: "ADD", payload: {
			name, price, image, qty,
		}});
		setIsAdded(true);
	}

	return (
		<div className="py-6">
			<img src={image} className="h-80 w-full object-cover" alt="product" />
			<div className="mt-4 flex gap-8">
				<div className="grow">
					<p className="text-gray-700 font-medium">
						{name}
					</p>
					<div className="v-center h-full">
	          <div className="border border-gray-700 text-gray-700 p-2 flex gap-4 v-center">
	            <FaMinus className="inline text-xs cursor-pointer hover:text-black transitionItem" onClick={() => setQty(prev => {
	            	if (isAdded) {
	            		return prev;
	            	}

	            	if (prev > 0) {
		            	let newValue = prev - 1;
		            	return newValue;
	            	} else {
	            		return 0;
	            	}
	            })} />
	            <span className="font-medium">{qty}</span>
	            <FaPlus className="inline text-xs cursor-pointer hover:text-black transitionItem" onClick={() => setQty(prev => {
	            	if (isAdded) {
	            		return prev;
	            	}

	            	if (prev < quantity) {
		            	let newValue = prev + 1;
		            	return newValue;
	            	} else {
	            		return prev;
	            	}
	            })} />
	          </div>
	        </div>
					
				</div>
				<div className="flex-col v-center">
					<span className="text-lg font-bold text-gray-700">${price}</span>
					<br />
					<button className="font-bold text-gray-800 hover:text-black uppercase" onClick={cartAction}>
						{
							!isAdded ? "add to cart" : "remove from cart"
						}
					</button>
				</div>
			</div>

			{
				isAdded && <h4 className="font-bold text-gray-700 text-center text-sm mt-4 py-2 bg-green-100">Added to cart</h4>
			}
			{
				error && <h4 className="font-bold text-gray-700 text-center text-sm mt-4 py-2 bg-red-100">{errorMessage}</h4>
			}

		</div>
	)
}

export default Product;