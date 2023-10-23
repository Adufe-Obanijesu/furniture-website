import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// firebase
import {
  getAuth,
  signInWithEmailAndPassword,
	signInWithPopup,
  GoogleAuthProvider,
} from "../firebase/index";

const provider = new GoogleAuthProvider();

// loader
import { ClipLoader } from "react-spinners";

import EmailInput from "../components/inputs/checkout/EmailInput";
import PasswordInput from "../components/inputs/checkout/PasswordInput";

// icons
import { FcGoogle } from "react-icons/fc";

// Notifications
import {
	successNotification,
	errorNotification,
} from "../functions";

const auth = getAuth();

const Login = () => {

	const navigate = useNavigate();

	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ loading, setLoading ] = useState(false);

	const loginWithEP = e => {
		e.preventDefault();

		setLoading(true);

		if (!email || !password) {
			errorNotification("Please fill in all fields");
			return;
		}

		signInWithEmailAndPassword(auth, email, password)
	  .then((cred) => {
	    successNotification("Successfully signed up");
	    navigate("/admin");
	    setLoading(false);
	  })
	  .catch(err => {
	    errorNotification(err.message);
	    setLoading(false);
	  });

	}

	const loginWithGoogle = () => {

		signInWithPopup(auth, provider)
	  .then((result) => {
	    successNotification("Successfully signed up");
	    navigate("/admin");
	  })
	  .catch(err => {
	    errorNotification(err.message);
	  });
	}

	return (
		<main className="py-12 lg:px-32 md:px-12 px-6">

			<div className="">
				<h1 className="text-3xl font-semibold text-center uppercase tracking-wide pb-6">Log in</h1>
			</div>

			<div className="h-center">
				<div className="lg:w-1/2 md:w-2/3">
						<form onSubmit={loginWithEP}>
							<EmailInput name="Email" label="Email" input={email} setInput={setEmail} />
							<PasswordInput name="password" label="Password" input={password} setInput={setPassword} />
							<button type="submit" className="py-2 px-4 uppercase border-2 border-black text-gray-200 bg-black w-full">
								{!loading ? (
	                <>
	                  Log in
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
						<div className="py-4">
							<h4 className="heading text-center">or</h4>
						</div>
						<button className="py-3 border border-gray-700 w-full uppercase text-white bg-black hover:text-gray-700 hover:bg-transparent gap-6 text-center relative" onClick={loginWithGoogle}>
							<div className="bg-white py-2 px-4 inline absolute h-full v-center left-0 top-0">
								<FcGoogle className="inline text-2xl" />
							</div>
							log in with google
						</button>
						<div className="flex justify-end mt-2">
							<p>
								<span>Not a user?</span>
								{" "}
								<Link to="/signup" className="text-blue-500">Sign up</Link>
							</p>
						</div>
				</div>
			</div>
		</main>
	)
}

export default Login;