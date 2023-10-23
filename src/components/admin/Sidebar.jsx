import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// firebase
import {
  signOut,
  getAuth,
  collection,
  db,
  onSnapshot,
} from "../../firebase/index";

const auth = getAuth();

// notifications
import {
  successNotification,
  errorNotification,
} from "../../functions";

// icons
import { RiAdminFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { PiCaretDownBold } from "react-icons/pi";
import { HiUserGroup } from "react-icons/hi";
import { IoIosPaper } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";

const Sidebar = ({ show, setShow }) => {

  const [ categories, setCategories ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  const colRef = collection(db, "category");

  useEffect(() => {
    const unsub = onSnapshot(colRef, (snapshot) => {
      let arr = [];
      snapshot.docs.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      })

      setCategories(arr);
      setLoading(false);

      return () => unsub();
    })
  }, []);

  const signout = () => {
    signOut(auth)
      .then(() => {
        successNotification("Logged out");
      })
      .catch((err) => {
        errorNotification(err.message);
      });
  };

  return (
    <div id="sidebar" className={`lg:col-span-1 col-span-2 z-20 ${show ? "block" : "hidden"} md:sticky absolute md:w-full w-1/2 top-0 left-0 md:block`}>
      <div className="">
        <div
          className="bg-gradient-to-b from-orange-600 to-orange-800 text-gray-200 py-6 filter drop-shadow-lg w-inherit h-screen"
          style={{ width: "inherit" }}>
        
            <div className="px-6">
              <h3 className="pb-4 flex items-center">
                
                <span className="ml-2 font-bold"><Link to="/">Furniture</Link></span>
              </h3>
              <hr className="border-gray-200" />
            </div>
            <ul className="px-8">

              <Link to="/admin">
                  
                <li className="my-8 text-white" onClick={() => setShow(false)}>
                  <MdSpaceDashboard className="inline text-xl mr-1" /> Dashboard
                </li>
              
            </Link>
                  
              <li className="my-8">
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary
                    className="flex cursor-pointer justify-between items-center rounded-lg"
                  >
                    <div>
                      <RiAdminFill className="inline text-xl mr-1 text-white" />
                      <span className="text-base text-white">Products</span>
                    </div>

                    <PiCaretDownBold className="text-white" />

                  </summary>

                  <ul className="mt-2 space-y-1 px-4">
                    {
                      loading && <li className="font-bold text-white mb-3">Fetching categories...</li>
                    }

                    {
                      !loading && categories.length === 0 ? <h3 className="font-bold text-white">No category found</h3> : categories.map(category => <li key={category.category}>
                        <Link
                          to={`/admin/category?name=${category.category}&id=${category.id}`}
                          className="block rounded-lg px-4 py-2 text-sm font-medium" onClick={() => setShow(false)}
                        >
                          {category.category}
                        </Link>
                      </li>)
                    }

                  </ul>
                </details>
              </li>
                  

                <Link to="/admin/orders">
                  
                    <li className="my-8 text-white" onClick={() => setShow(false)}>
                      <IoIosPaper className="inline text-xl mr-1" /> Orders
                    </li>
                  
                </Link>

                <Link to="/admin/leads" onClick={() => setShow(false)}>
                  
                    <li className="my-8 text-white">
                      <HiUserGroup className="inline text-xl mr-1" /> Leads
                    </li>
                  
                </Link>

                

              <li className="my-8 cursor-pointer" onClick={signout}>
                <FiLogOut className="inline text-xl mr-1" /> 
                Log Out
              </li>
            </ul>
        </div>
      </div>
    </div>

  )
}

export default Sidebar;