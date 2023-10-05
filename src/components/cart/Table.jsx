import { useContext } from "react";

// context
import { CartContext } from "../../contexts/cartContext";

// components
import Order from "./Order";

const Table = () => {

  const { cart, dispatch } = useContext(CartContext);

	return (
		<div className="py-12">
			<table className="min-w-full divide-y divide-gray-200 table-fixed border border-gray-200">
        <thead className="">
          <tr>
          	<th scope="col" className="py-4 px-2">
            
            </th>
            <th scope="col" className="p-4">
            
            </th>
            <th scope="col" className="py-3 px-6 font-medium tracking-wider text-left text-gray-700 uppercase">
              product
            </th>
            <th scope="col" className="py-3 px-6 font-medium tracking-wider text-left text-gray-700 uppercase">
              price
            </th>
            <th scope="col" className="py-3 px-6 font-medium tracking-wider text-left text-gray-700 uppercase">
              quantity
            </th>
            <th scope="col" className="py-3 px-6 font-medium tracking-wider text-left text-gray-700 uppercase">
              subtotal
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          
          {
            cart.length > 0 && cart.map(order => <Order key={order.name} image={order.image} productName={order.name} price={order.price} qty={order.qty} />)
          }
          
        </tbody>
      </table>
      <div className="border-x border-b border-gray-200 py-4 px-6 flex justify-between">
      	<div className="flex gap-2">
      		<input type="text" className="text-gray-700 px-4 py-2 border border-gray-700" placeholder="Coupon code" />
      		<button className="borderButton">apply coupon</button>
      	</div>

      	<div className="v-center">
      		<button className="blackButton">update cart</button>
      	</div>

      </div>
    </div>
	)
}

export default Table;