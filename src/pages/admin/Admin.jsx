import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// firebase
import { getAuth, onAuthStateChanged } from "../../firebase/index";
 
// components
import Sidebar from "../../components/admin/Sidebar";

// icons
import { PiCaretRightBold } from "react-icons/pi";

const auth = getAuth();

const Admin = () => {

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (!user) {
        navigate("/login");
      }
    });
    return () => {
      unsub();
    };
  }, [navigate]);

	return (
		<main className="grid lg:grid-cols-6 md:grid-cols-7 relative">
      <Sidebar show={show} setShow={setShow} />
      <div className="col-span-5 px-6 py-12">
        <Outlet />
      </div>

      <div className="fixed top-0 left-0 h-screen v-center md:hidden">
        <div className="p-2 rounded-r-full bg-orange-600 shadow-lg text-white cursor-pointer">
          <PiCaretRightBold className="text-xl" onClick={() => setShow(true)} />
        </div>
      </div>

      <div className={`fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 z-10 ${!show && "hidden"} md:hidden`} onClick={() => setShow(false)}></div>
    </main>
	)
}

export default Admin;