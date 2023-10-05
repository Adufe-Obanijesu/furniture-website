import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

// firebase
import {
  collection,
  db,
  onSnapshot,
} from "../../firebase/index";
 
// components
import Sidebar from "../../components/admin/Sidebar";
import Category from "../../components/admin/Category";
import Modal from "../../components/admin/Modal";

const Dashboard = () => {

  const [ modal, setModal ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const [ categories, setCategories ] = useState([]);

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

	return (
		<div className="">
      <div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h5 className="smallHeading">products</h5>
            <h2 className="heading mt-2">categories</h2>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 rounded text-white py-2 px-4 font-semibold"
            onClick={() => setModal(true)}
          >
            Add Category
          </button>
        </div>

        {
          loading && <h3 className="text-2xl font-bold text-gray-700 mb-3">Fetching categories...</h3>
        }

        <div className="grid grid-cols-4 gap-6 mt-8">
          {
            !loading && categories.length === 0 ? <h3 className="text-2xl font-bold text-gray-700">No category found</h3> : categories.map(category => <Category key={category.category} image={category.image} catName={category.category} />)
          }
        </div>

      </div>

      {/* Modal */}
      <Modal modal={modal} setModal={setModal} />
    </div>
	)
}

export default Dashboard;