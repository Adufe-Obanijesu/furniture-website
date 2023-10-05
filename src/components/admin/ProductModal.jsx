import { useState } from "react";

// firebase
import {
  collection,
  db,
  onSnapshot,
  query,
  where,
  orderBy,
  getAuth,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  addDoc,
} from "../../firebase/index";

const auth = getAuth();

// loader
import { ClipLoader } from "react-spinners";

// notifications
import {
  successNotification,
  errorNotification,
} from "../../functions";

const ProductModal = ({ modal, setModal, queryValue }) => {

  const [ name, setName ] = useState("");
  const [ price, setPrice ] = useState("");
  const [ qty, setQty ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ image, setImage ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  const colRef = collection(db, "products");

  const clear = () => {
    setName("");
    setPrice("");
    setQty("");
    setDescription("");
    setImage(null);
  }

  const addProduct = e => {
    e.preventDefault();

    setLoading(true);

    if (!name || !price || !qty || !description || !image) {
      errorNotification("Please fill in all the fields");
      setLoading(false);
      return;
    }

    const storage = getStorage();
    const productImage = ref(storage, name);

    uploadBytes(productImage, image)
      .then(() => {
        getDownloadURL(productImage)
          .then((url) => {
            
            addDoc(colRef, {
              name,
              price,
              qty,
              description,
              category: queryValue,
              image: url,
            })
            .then(() => {
              successNotification("Product added");
              setLoading(false);
              setModal(false);
              clear();
            })
            .catch((err) => {
              errorNotification("Error adding product");
              console.log(err);
              setLoading(false);
              setModal(false);
            });

          })
          .catch(err => {
            errorNotification("Error adding product");
            console.log(err);
            setLoading(false);
            setModal(false);
          });
      })

  }

	return (
		<div
      className={`h-screen w-full fixed left-0 top-0 flex justify-center items-center ${
        modal === true ? "block" : "hidden"
      }`}
      style={{ zIndex: "1000" }}
    >
      <div
        className="h-screen w-full absolute z-50 bg-black bg-opacity-50 cursor-pointer"
        onClick={() => setModal(false)}
      ></div>
      <div className="bg-white rounded shadow-lg w-2/5 p-3 z-50">
        <div className="border-b border-1 border-gray-200 py-2 mb-2">
          <h3 className="text-xl font-bold tracking-md">Add a Product</h3>
        </div>

        <div className="mt-4">
          <form onSubmit={addProduct}>
            <div className="shadow rounded bg-white py-1 mb-3">
              <label
                htmlFor="name"
                className="font-bold px-3 text-gray-600 text-sm"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                className="px-3 text-gray-400 w-full focus:outline-none"
                name="productName"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="shadow rounded bg-white py-1 mb-3">
              <label
                htmlFor="price"
                className="font-bold px-3 text-gray-600 text-sm"
              >
                Price
              </label>
              <input
                type="text"
                id="price"
                className="px-3 text-gray-400 w-full focus:outline-none"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="shadow rounded bg-white py-1 mb-3">
              <label
                htmlFor="qty"
                className="font-bold px-3 text-gray-600 text-sm"
              >
                Quantity
              </label>
              <input
                type="number"
                id="qty"
                className="px-3 text-gray-400 w-full focus:outline-none"
                name="qty"
                min="1"
                onChange={(e) => setQty(e.target.value)}
                required
              />
            </div>

            <div className="shadow rounded bg-white py-1 mb-3">
              <label
                htmlFor="description"
                className="font-bold px-3 text-gray-600 text-sm"
              >
                Description
              </label>
              <textarea
                rows="4"
                id="description"
                className="px-3 text-gray-400 w-full focus:outline-none"
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label
                htmlFor="productImage"
                className="text-white bg-orange-500 bottom-2 right-2 p-2 rounded cursor-pointer"
              >
                Add Image
              </label>
              <input
                type="file"
                id="productImage"
                size="20"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
                required
              /> 
              {image
                ? <span className="ml-2">{image.name}</span>
                : <span className="ml-2">Select an image</span>}
            </div>

            <button
              className="text-md bg-orange-400 py-2 rounded-sm px-6 text-white hover:shadow hover:bg-orange-500 transition ease-in duration-300"
              disabled={loading}
              type="submit"
            >
              {!loading ? (
                <>
                  Add Product
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
          </form>
        </div>
      </div>
    </div>
	)
}

export default ProductModal;