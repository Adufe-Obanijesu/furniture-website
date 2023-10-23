import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

// firebase
import {
  collection,
  db,
  onSnapshot,
  query,
  where,
  doc,
} from "../../firebase/index";

// modals
import ProductModal from "../../components/admin/ProductModal";
import DeleteCategory from "../../components/admin/modals/DeleteCategory"

// icons
import { BsSearch } from "react-icons/bs";

// components
import Product from "../../components/admin/Product";

const Category = () => {

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  
  // Extract query from the url
  const queryValue = searchParams.get("name");
  const id = searchParams.get("id");

  const [ modal, setModal ] = useState(false);
  const [ deleteModal, setDeleteModal ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const [ products, setProducts ] = useState([]);

  const colRef = collection(db, "products");
  const q = query(colRef, where("category", "==", queryValue));

  useEffect(() => {

    if (!queryValue) {
      navigate("/admin");
    }

    const unsub = onSnapshot(q, (snapshot) => {
      setLoading(true);
      let arr = [];
      snapshot.docs.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      })

      setProducts(arr);
      setLoading(false);

      return () => unsub();
    })
  }, [queryValue]);  

	return (
		<main>
		<div className="flex justify-between items-center mb-4">
      <h2 className="text-gray-900 font-semibold text-2xl capitalize">{queryValue}</h2>
      
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-600 rounded text-white py-2 px-4 font-semibold"
          onClick={() => setModal(true)}
        >
          Add Product
        </button>

        <button
          className="bg-red-500 hover:bg-red-600 rounded text-white py-2 px-4 font-semibold ml-2"
          onClick={() => setDeleteModal(true)}
        >
          Delete Category
        </button>
      </div>
    </div>

      <br />

      <section>
        <div className="overflow-x-scroll w-full">

        {
          loading && <h3 className="text-2xl font-bold text-gray-700 mb-3">Fetching products...</h3>
        }

        {
          !loading && products.length === 0 ? <h3 className="text-2xl font-bold text-gray-700">No product found</h3> : (
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                        
                    </th>
                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                        Product
                    </th>
                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                        Description
                    </th>
                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                        Price
                    </th>
                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                        Quantity
                    </th>
                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                        Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    products.map(product => <Product key={product.id} id={product.id} image={product.image} productName={product.name} description={product.description} price={product.price} qty={product.qty} />)
                  }
                </tbody>
              </table>
            )
        }

        </div>
      </section>

      {/* Modal */}
      {
        modal && <ProductModal modal={modal} setModal={setModal} queryValue={queryValue} />
      }
      
      {
        deleteModal && <DeleteCategory modal={deleteModal} setModal={setDeleteModal} id={id} category={queryValue} products={products} />
      }
      

    </main>
	)
}

export default Category;