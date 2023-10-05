import { useState } from "react";

// loader
import { ClipLoader } from "react-spinners";

// icons
import { FaPlus, FaMinus } from "react-icons/fa6";

const Modal = ({ modal, setModal, name, price, image, quantity }) => {
	
	const [ loading, setLoading ]	= useState(false);
	const [ qty, setQty ] = useState(0);

	return (
		<div
      className={`h-screen w-full fixed left-0 top-0 flex justify-center items-center ${
        modal === true ? "block" : "hidden"
      }`}
      style={{ zIndex: "1000" }}
    >
      <div
        className="h-screen w-full absolute z-50 bg-black bg-opacity-20 cursor-pointer"
        onClick={() => setModal(false)}
      ></div>
      <div className="bg-white rounded shadow-lg w-1/5 p-3 z-50">
        <div className="border-b border-1 border-gray-200 py-2 mb-2">
          <h3 className="text-xl font-bold tracking-md">{name}</h3>
        </div>

        <img src={image} className="h-60 object-contain" alt={name} />

        <div className="v-center gap-4 mt-4">
	        <div className="v-center h-full">
	          <div className="border border-gray-700 text-gray-700 p-2 flex gap-4 v-center">
	            <FaMinus className="inline text-xs cursor-pointer hover:text-black transitionItem" onClick={() => setQty(prev => {
	            	if (prev > 0) {
		            	let newValue = prev - 1;
		            	return newValue;
	            	} else {
	            		return 0;
	            	}
	            })} />
	            <span className="font-medium">{qty}</span>
	            <FaPlus className="inline text-xs cursor-pointer hover:text-black transitionItem" onClick={() => setQty(prev => {
	            	if (prev < quantity) {
		            	let newValue = prev + 1;
		            	return newValue;
	            	} else {
	            		return prev;
	            	}
	            })} />
	          </div>
	        </div>

	        <div>
	        	<h5 className="font-medium text-gray-700">${price}</h5>
	        </div>
	      </div>

        <div className="mt-4">
          <form onSubmit={() => {}}>
          
          <button type="submit" className="py-2 px-4 rounded text-white bg-orange-500" disabled={loading}>
                {!loading ? (
                  <>
                    Add to cart
                  </>
                ) : (
                  <div className="hv-center">
                    <ClipLoader
                      size={20}
                      loading={loading}
                      color="#ffffff"
                    />
                  </div>
                )}
              </button>
            </form>
        </div>
      </div>
    </div>
	)
}

export default Modal;