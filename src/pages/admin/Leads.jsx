import { useState, useEffect } from "react";

// firebase
import {
  collection,
  db,
  onSnapshot,
} from "../../firebase/index";

const Leads = () => {

	const [ loading, setLoading ] = useState(true);
  const [ leads, setLeads ] = useState([]);

  const colRef = collection(db, "newsletter");

  useEffect(() => {
    const unsub = onSnapshot(colRef, (snapshot) => {
      let arr = [];
      snapshot.docs.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      })

      setLeads(arr);
      setLoading(false);

      return () => unsub();
    })
  }, []);

	return (
		<div>
      <div className="mb-4">
        <h5 className="smallHeading">prospective customers</h5>
        <h2 className="heading mt-2">leads</h2>
      </div>

      {
        loading && <h3 className="text-2xl font-bold text-gray-700 mb-3">Fetching leads...</h3>
      }

      <div className="grid grid-cols-2 gap-6 mt-8">
        {
          !loading && leads.length === 0 ? <h3 className="text-2xl font-bold text-gray-700">No lead found</h3> : leads.map(lead => {
          	return (
          		<div key={lead.email} className="bg-gray-100 p-4"
          		>
          			{lead.email}
          		</div>
          	)
          })
        }
      </div>

		</div>
	)
}

export default Leads;