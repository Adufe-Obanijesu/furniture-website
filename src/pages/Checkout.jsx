import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// firebase
import {
  addDoc,
  collection,
  db,
} from "../firebase/index";

// paystack
import { usePaystackPayment } from 'react-paystack';

// context
import { CartContext } from "../contexts/cartContext";

// components
import Order from "../components/cart/Order";
import TextInput from "../components/inputs/checkout/TextInput";
import EmailInput from "../components/inputs/checkout/EmailInput";

// notifications
import {
	successNotification,
	errorNotification,
} from "../functions";
import MobileView from "../components/cart/MobileTable";

const Checkout = () => {

	const navigate = useNavigate();

	const { cart, dispatch } = useContext(CartContext);

	const [ total, setTotal ] = useState(0);

	const [windowWidth, setWindowWidth] = useState(getWindowSize());

	function getWindowSize() {
		const { innerWidth } = window;
		return innerWidth;
	}

	useEffect(() => {
		function handleWindowResize() {
			setWindowWidth(getWindowSize());
		}

		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	// forms
	const [ firstName, setFirstName ] = useState("");
	const [ lastName, setLastName ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ phoneNumber, setPhoneNumber ] = useState("");
	const [ companyName, setCompanyName ] = useState("");
	const [ country, setCountry ] = useState("");
	const [ state, setState ] = useState("");
	const [ address, setAddress ] = useState("");

	useEffect(() => {
    if (cart.length === 0) {
		navigate("/");
		setTotal(0);
		return;
    }

    let totalPrice = cart.reduce((total, item) => {
			total += item.price * item.qty;
			return total;
		}, 0);
    setTotal(totalPrice);

  }, [cart, navigate]);

  const clear = () => {
	setFirstName("");
	setLastName("");
	setEmail("");
	setPhoneNumber("");
	setCountry("");
	setState("");
	setAddress("");
  };

  const config = {
      reference: (new Date()).getTime().toString(),
      email,
      amount: total*100,
      publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  };

	// paystack
	const initializePayment = usePaystackPayment(config);
  
  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    const colRef = collection(db, "orders");
    addDoc(colRef, {
      firstName,
      lastName,
      email,
      phoneNumber,
      companyName,
      country,
      state,
      address,
      amount: total,
      cart,
      reference,
    })
    .then(() => {
      successNotification("Order placed");
      clear();
      dispatch({ type: "CLEAR" });
      navigate("/");
    })
    .catch((err) => {
      errorNotification("Error recording order");
      console.log(err);
    });
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

  const pay = () => {

	if (!firstName || !lastName || !email || !phoneNumber || !country || !state || !address) {
		errorNotification("Please fill in all the necessary fields");
		return;
	}

	initializePayment(onSuccess, onClose);
  }

	return (
		<main className="lg:px-32 md:px-12 px-6">
			<div className="py-12">
				<h1 className="text-5xl font-semibold text-center uppercase tracking-wide pb-6 py-12">checkout</h1>
			</div>

			<div className="bg-gray-200 px-4 py-4 font-medium rounded">
				Have a coupon? <span className="underline font-semibold cursor-pointer">Click here to enter your code</span>
			</div>

			<section>
				<h1 className="text-3xl font-medium text-center tracking-wide pb-6 py-12">Billing detials</h1>

				<div className="grid md:grid-cols-2 gap-4">
						<TextInput name="firstName" label="First name" input={firstName} setInput={setFirstName} />
						<TextInput name="lastName" label="Last name" input={lastName} setInput={setLastName} />
						<TextInput name="phoneNumber" label="Phone Number" input={phoneNumber} setInput={setPhoneNumber} />
						<EmailInput name="email" label="Email Address" input={email} setInput={setEmail} />
						<TextInput name="companyName" label="Company name" input={companyName} setInput={setCompanyName} optional />
						<TextInput name="country" label="Country" input={country} setInput={setCountry} />
						<TextInput name="state" label="State" input={state} setInput={setState} />
						<TextInput name="address" label="Address" input={address} setInput={setAddress} />
				</div>
			</section>

			<section>
				<div className="">
					<h1 className="text-3xl font-semibold text-start uppercase tracking-wide pb-6 pt-12">Your Order</h1>
				</div>

				<div className="pb-12">
					{
						windowWidth > 690 && (

							<table className="min-w-full divide-y divide-gray-200 table-fixed border border-gray-200">
						<	thead className="">
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
							{
								cart.length > 0 && cart.map(order => <Order key={order.name} image={order.image} productName={order.name} price={order.price} qty={order.qty} />)
							}
							
						</tbody>
						</table>
						)
					}
					{
						windowWidth <= 690 && cart.length > 0 && cart.map(order => <MobileView key={order.name} image={order.image} productName={order.name} price={order.price} qty={order.qty} />)
					}
				<div className="border-x border-b border-gray-200 py-4 px-6 flex justify-between">
				<div className="flex gap-2 justify-between w-full">
					<h4 className="text-lg font-bold uppercase">total</h4>
					<h4 className="text-lg font-bold uppercase mr-10">${total}</h4>
				</div>

      </div>

			</div>

			<div className="v-center">
			<button className="blackButton" onClick={pay}>pay now</button>
		
		</div>
			</section>

		</main>
	)
}

export default Checkout;