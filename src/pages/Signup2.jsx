import { useState } from "react";

// firebase
import { EmailAndPassword } from "../firebase/authentication/EmailAndPassword";

// loader
import { ClipLoader } from "react-spinners";

// components
import EmailInput from "../components/inputs/checkout/EmailInput";
import PasswordInput from "../components/inputs/checkout/PasswordInput";

// icons
import { FcGoogle } from "react-icons/fc";


const Signup2 = () => {

	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ image, setImage ] = useState(null);
	const [ loading, setLoading ] = useState(false);

	const signupWithEP = async e => {
		e.preventDefault();

		setLoading(true);

		// if (!email || !password) {
			
		// 	return;
		// }

        const createUser = await EmailAndPassword(email, password, username, image);
        console.log(createUser);

        setLoading(false);

	}

	const signupWithGoogle = () => {

		
	}

	return (
		<main className="py-12 px-32">

			<div className="">
				<h1 className="text-3xl font-semibold text-center uppercase tracking-wide pb-6">sign up</h1>
			</div>

			<div className="h-center">
				<div className="w-1/2">
					<form onSubmit={signupWithEP}>
						<EmailInput name="Email" label="Email" input={email} setInput={setEmail} />
						<PasswordInput name="password" label="Password" input={password} setInput={setPassword} />
                        <input type="text" onChange={e => setUsername(e.target.value)} placeholder="Username" value={username} /><br/>
                        <input type="file" onChange={e => setImage(e.target.files[0])} />
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
				</div>
			</div>
		</main>
	)
}

export default Signup2;