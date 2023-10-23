import { useState, memo } from "react";
import { useNavigate } from "react-router-dom";

import { ClipLoader } from "react-spinners";

// firebase
import {
  collection,
  db,
  onSnapshot,
  query,
  getDocs,
  doc,
  where,
  deleteDoc,
  ref,
  deleteObject,
  getStorage,
} from "../../../firebase/index";

// Importing functions for notifications
import {
  successNotification,
  errorNotification,
} from "../../../functions";

const DeleteCategory = ({ modal, setModal, id, category, products }) => {
  const [loading, setLoading] = useState(false);

  const storage = getStorage();
  const navigate = useNavigate();

  const deleteCategory = () => {
    setLoading(true);
    

    let err = {
      status: false,
    }
    let productRef;
    products.forEach(product => {
      deleteDoc(doc(db, "products", product.id))
      .then(() => {
        deleteObject(ref(storage, product.name))
        .then(() => {})
        .catch(err => {
          err = {
            status: true,
          }
        })
      })
      .catch(err => {
        err = {
          status: true,
        }
      })
    })


    if (err.status) {
      errorNotification("Error deleting category products");
      setLoading(false);
      return;
    }

    // Deleting the category
    const docRef = doc(db, "category", id);
    deleteDoc(docRef)
    .then(() => {
      deleteObject(ref(storage, category))
      .then(() => {
        successNotification("Category deleted");
        setLoading(false);
        navigate("/admin");
      })
      .catch(err => {
        err = {
          status: true,
        }
        setLoading(false);
        errorNotification("Error in deleting category");
      })
    })
    .catch(err => {
      errorNotification("Error in deleting category");
      setLoading(false);
    })
  }



  const override = {
    borderColor: "white",
    margin: "0",
    padding: "0",
  };

  return (
    <div
      className={`h-screen w-full fixed left-0 top-0 flex justify-center items-center z-20 ${
        !modal && "hidden"
      }`}
    >
      <div
        className="h-screen w-full absolute z-10 bg-black bg-opacity-50 cursor-pointer"
        onClick={() => setModal(false)}
      ></div>
      <div
        className="bg-white shadow-lg lg:w-2/5 md:w-3/5 p-3"
        style={{ zIndex: 1000 }}
      >
        <div className="border-b border-1 border-gray-200 py-2 mb-2">
          <h3 className="text-xl font-bold tracking-md">
            Are you sure you want to delete this product
          </h3>
        </div>

        <div className="mt-4 flex justify-center">
          <div>
            <button
              type="button"
              className="mt-2 text-md bg-red-400 py-2 rounded-sm px-4 mr-3 text-white hover:shadow hover:bg-red-500 transition ease-in duration-300 rounded"
              disabled={loading}
              onClick={() => deleteCategory()}
            >
              {!loading ? (
                <>Yes</>
              ) : (
                <ClipLoader
                  size={20}
                  loading={loading}
                  cssOverride={override}
                />
              )}
            </button>
            <button
              type="button"
              className="mt-2 text-md bg-green-400 py-2 rounded-sm px-4 text-white hover:shadow hover:bg-green-500 transition ease-in duration-300 rounded"
              onClick={() => setModal(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(DeleteCategory);
