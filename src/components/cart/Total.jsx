import { useState, useEffect } from "react";

const Total = () => {

	const [ total, setTotal ] = useState(0);

	useEffect(() => {
    if (!localStorage.getItem("furnitureCart")) return;

    let totalPrice = JSON.parse(localStorage.getItem("furnitureCart")).reduce((total, item) => {
    		total += item.price * item.qty;
    		return total;
    	}, 0);
    setTotal(totalPrice)
  }, []);

	return (
		<div className="py-12">
		
		<div className="">
			<h1 className="text-5xl font-medium uppercase tracking-wide pb-6 py-12">cart totals</h1>
		</div>

			<table className="divide-y divide-gray-200 table-fixed w-1/2 border border-gray-200">
        <thead className="">
          <tr>
            <th scope="col" className="text-lg font-medium py-3 px-6 tracking-wider text-left text-gray-700 uppercase">
              subtotal
            </th>
            <th scope="col" className="text-lg font-medium py-3 px-6 tracking-wider text-left text-gray-700 uppercase">
              <div className="flex justify-end">$717.78</div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          
          <tr className="hover:bg-gray-100">
			      <td className="py-4 px-6 text-lg font-medium text-gray-700 uppercase">shipping</td>
			      <td className="py-4 px-6 text-sm font-medium text-gray-700 whitespace-nowrap"><div className="flex justify-end">
				      <div>
				      	{/*<div className="v-center gap-2">
				      		<input type="radio" name="shippingType" /> <span>Flat rate</span>
				      	</div>*/}

				      	<div className="v-center mt-1 gap-2">
				      		<input type="radio" name="shippingType" readOnly checked={true} /> <span>Free shipping</span>
				      	</div>

				      	{/*<div className="v-center mt-1 gap-2">
				      		<input type="radio" name="shippingType" /><div>Local pickup <br />Shipping to <strong>CA</strong>. <br /><span className="hover:underline font-medium cursor-pointer">Change address</span></div>
				      	</div>*/}
			      	</div>
			      </div></td>
				  </tr>

				  <tr className="hover:bg-gray-100">
			      <td className="py-4 px-6 text-lg font-medium text-gray-700 uppercase">total</td>
			      <td className="py-4 px-6 text-sm font-medium text-gray-700 whitespace-nowrap"><div className="flex justify-end font-bold">${total}</div></td>
				  </tr>
          
        </tbody>
      </table>

      <button className="blackButton mt-6">proceed to checkout</button>
    </div>
	)
}

export default Total;