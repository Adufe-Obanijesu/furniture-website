import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// firebase
import {
  getAuth,
  createUserWithEmailAndPassword,
	signInWithPopup,
  GoogleAuthProvider,
} from "../firebase/index";

const provider = new GoogleAuthProvider();

// loader
import { ClipLoader } from "react-spinners";

// components
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

const Signup = () => {

	const navigate = useNavigate();

	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ loading, setLoading ] = useState(false);

	const signupWithEP = e => {
		e.preventDefault();

		setLoading(true);

		if (!email || !password) {
			errorNotification("Please fill in all fields");
			return;
		}

		createUserWithEmailAndPassword(auth, email, password)
	  .then((cred) => {
	    successNotification("Successfully signed up");
	    navigate("/login");
	    setLoading(false);
	  })
	  .catch(err => {
	    errorNotification(err.message);
	    setLoading(false);
	  });

	}

	const signupWithGoogle = () => {

		signInWithPopup(auth, provider)
	  .then((result) => {
	    successNotification("Successfully signed up");
	    navigate("/login");
	  })
	  .catch(err => {
	    errorNotification(err.message);
	  });
	}

	return (
		<main className="py-12 lg:px-32 md:px-12 px-6">

			<div className="">
				<h1 className="text-3xl font-semibold text-center uppercase tracking-wide pb-6">sign up</h1>
			</div>

			<div className="h-center">
				<div className="lg:w-1/2 md:w-2/3">
					<form onSubmit={signupWithEP}>
						<EmailInput name="Email" label="Email" input={email} setInput={setEmail} />
						<PasswordInput name="password" label="Password" input={password} setInput={setPassword} />
						<button type="submit" className="py-2 px-4 uppercase border-2 border-black text-gray-200 bg-black w-full">
							{!loading ? (
                <>
                  sign up
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
						<div className="py-4">
							<h4 className="heading text-center">or</h4>
						</div>
						<button className="py-3 border border-gray-700 w-full uppercase text-white bg-black hover:text-gray-700 hover:bg-transparent gap-6 text-center relative" onClick={signupWithGoogle}>
							<div className="bg-white py-2 px-4 inline absolute h-full v-center left-0 top-0">
								<FcGoogle className="inline text-2xl" />
							</div>
							sign up with google
						</button>
					</form>
					<div className="flex justify-end mt-2">
						<p>
							<span>Already a user?</span>
							{" "}
							<Link to="/login" className="text-blue-500">Log in</Link>
						</p>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Signup;