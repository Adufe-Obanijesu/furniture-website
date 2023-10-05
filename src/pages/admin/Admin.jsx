import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// firebase
import { getAuth, onAuthStateChanged } from "../../firebase/index";
 
// components
import Sidebar from "../../components/admin/Sidebar";

const auth = getAuth();

const Admin = () => {

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

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
  }, [auth]);

	return (
		<main className="grid grid-cols-6">
      <Sidebar />
      <div className="col-span-5 px-6 py-12">
        <Outlet />
      </div>
    </main>
	)
}

export default Admin;