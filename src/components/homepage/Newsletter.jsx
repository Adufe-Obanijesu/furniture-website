import { useState } from "react";

// firebase
import {
  getAuth,
  addDoc,
  collection,
  db,
} from "../../firebase/index";

// icons
import { BsArrowRight } from "react-icons/bs";

const Newsletter = () => {

	const [ email, setEmail ] = useState("");
	const [ isRegistered, setIsRegistered ] = useState(false);
	const [ isRegistering, setIsRegistering ] = useState(false);
	const [ error, setError ] = useState(false);
	const [ errorMessage, setErrorMessage ] = useState("");

	const subscribe = e => {
		e.preventDefault();
		
		setIsRegistering(true);

		setIsRegistered(false);
		setError(false);
		setErrorMessage("");

		if (!email) {
			setIsRegistering(false);
			setError(true);
			setErrorMessage("Fill in your email please");
			setTimeout(() => {
				setError(false);
				setErrorMessage("");
			}, 5000);
			return;
		}

		const colRef = collection(db, "newsletter");

		addDoc(colRef, {
      email,
    })
    .then(() => {
      setIsRegistered(true);
      setIsRegistering(false);
      setTimeout(() => {
				setIsRegistered(false);
			}, 5000);
    })
    .catch((err) => {
    	setError(true);
    	setIsRegistering(false);
      console.log(err);
			setErrorMessage("Error registering your email. Please try again");
			setTimeout(() => {
				setError(false);
				setErrorMessage("");
			}, 5000);
    });

	}

	return (
		<section className="py-12 h-center">
			<div className="lg:w-3/5 md:w-4/5 w-full">
				<h4 className="text-2xl font-bold text-gray-700 text-center">
					Subscribe to our newsletter and receive the latest product news, stories, invitations to exclusive design events and much, much more.
				</h4>
				<form onSubmit={subscribe}>
					<div className="mt-12 border drop-shadow bg-white border-gray-700 px-3 py-2 flex justify-between">
						<input type="email" placeholder="Enter Email Address" className="grow text-gray-700 focus:outline-none" onChange={(e) => setEmail(e.target.value)} required />
						<button type="submit" className="borderButton" disabled={isRegistering}>
							<span>subscribe</span>
							<BsArrowRight className="inline text-xl" />
						</button>
					</div>
				</form>
				
					{
						isRegistered && <h4 className="font-bold text-gray-700 text-center text-sm mt-4 py-2 bg-green-100">Email successfully registered</h4>
					}
					{
						error && <h4 className="font-bold text-gray-700 text-center text-sm mt-4 py-2 bg-red-100">{errorMessage}</h4>
					}

				<h4 className="font-bold text-gray-700 text-center text-sm uppercase mt-4">
					by subscribing, you accept our <span className="underline">privacy policy</span>
				</h4>
			</div>
		</section>
	)
}

export default Newsletter;