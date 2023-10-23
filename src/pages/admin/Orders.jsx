import { useState, useEffect } from "react";

// firebase
import {
  collection,
  db,
  onSnapshot,
} from "../../firebase/index";

// components
import Order from "../../components/admin/Order";

const Orders = () => {

	const [ loading, setLoading ] = useState(true);
  const [ orders, setOrders ] = useState([]);

  
  useEffect(() => {
    const colRef = collection(db, "orders");

    const unsub = onSnapshot(colRef, (snapshot) => {
      setLoading(true);
      let arr = [];
      snapshot.docs.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      })

      setOrders(arr);
      setLoading(false);

      return () => unsub();
    })
  }, []);

	return (
		<main>
			<div className="mb-4">
        <h2 className="text-gray-900 font-semibold text-2xl capitalize">Orders</h2>
      </div>

      <br />

      <section>
        <div className="overflow-x-scroll w-full">

          {
            loading && <h3 className="text-2xl font-bold text-gray-700 mb-3">Fetching orders...</h3>
          }

          {
          !loading && orders.length === 0 ? <h3 className="text-2xl font-bold text-gray-700">No order found</h3> : (
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                        Name
                    </th>
                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                        Email
                    </th>
                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                        Phone Number
                    </th>
                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                        Products
                    </th>
                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                        Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    orders.map(order => <Order key={order.firstname+order.lastName} name={`${order.firstName} ${order.lastName}`} email={order.email} phoneNumber={order.phoneNumber} cart={order.cart} amount={order.amount} />)
                  }
                </tbody>
              </table>
            )
        }

        </div>
      </section>
    </main>
	)
}

export default Orders;