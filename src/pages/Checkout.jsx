import Order from "../components/cart/Order";
import TextInput from "../components/inputs/checkout/TextInput";
import EmailInput from "../components/inputs/checkout/EmailInput";

const Checkout = () => {
	return (
		<main className="px-32">
			<div className="py-12">
				<h1 className="text-5xl font-semibold text-center uppercase tracking-wide pb-6 py-12">checkout</h1>
			</div>

			<div className="bg-gray-200 px-4 py-4 font-medium rounded">
				Have a coupon? <span className="underline font-semibold cursor-pointer">Click here to enter your code</span>
			</div>

			<section>
				<h1 className="text-3xl font-medium text-center tracking-wide pb-6 py-12">Billing detials</h1>

				<div className="grid grid-cols-2 gap-4">
						<TextInput name="firstName" label="First name" />
						<TextInput name="lastName" label="Last name" />
						<TextInput name="companyName" label="Company name" optional />
						<TextInput name="country" label="Country" />
						<TextInput name="state" label="State" />
						<TextInput name="address" label="Address" />
						<TextInput name="phoneNumber" label="Phone Number" />
						<EmailInput name="email" label="Email Address" />
				</div>
			</section>

			<section>
				<div className="">
					<h1 className="text-3xl font-semibold text-start uppercase tracking-wide pb-6 pt-12">Your Order</h1>
				</div>

				<div className="pb-12">
					<table className="min-w-full divide-y divide-gray-200 table-fixed border border-gray-200">
		        <thead className="">
		          <tr>
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
		          
		          <Order image="chairs/1.jpg" productName="ella chair with armrests, solid birch and leather cushion" price="400" qty="4" />
		          <Order image="chairs/2.jpg" productName="ella chair with armrests, solid birch and leather cushion" price="400" qty="4" />
		          
		        </tbody>
		      </table>
		      <div className="border-x border-b border-gray-200 py-4 px-6 flex justify-between">
		      	<div className="flex gap-2 justify-between w-full">
		      		<h4 className="text-lg font-bold uppercase">total</h4>
		      		<h4 className="text-lg font-bold uppercase mr-10">$2000</h4>
		      	</div>

      </div>

		    </div>

		    <div className="v-center">
      		<button className="blackButton">pay with paystack</button>
      	</div>
			</section>

		</main>
	)
}

export default Checkout;