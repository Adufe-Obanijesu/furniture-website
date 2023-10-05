import { useState } from "react";
import Compressor from 'compressorjs';

// firebase
import {
  getAuth,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  addDoc,
  collection,
  db,
} from "../../firebase/index";

const auth = getAuth();

// notifications
import {
  successNotification,
  errorNotification,
} from "../../functions";

// loader
import { ClipLoader } from "react-spinners";

const Modal = ({ modal, setModal }) => {

  const [ category, setCategory ] = useState("");
  const [ image, setImage ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  const compress = (file) => {
    if (file) {
      new Compressor(file, {
      quality: 0.6,
      success(result) {
        setImage(result);
      },
      error(err) {
        errorNotification("Error compressing images");
        console.log(err);
      },
    });
    } else {
      errorNotification("No image found");
    }
  }

  const uploadImage = e => {
    if (e.target.files[0].size > 500000) {
      compress(e.target.files[0]);
    } else {
      setImage(e.target.files[0]);
    }
  }

  const addCategory = e => {
    e.preventDefault();

    setLoading(true);

    if (!category || !image) {
      errorNotification("Please fill in all the fields");
      setLoading(false);
      return;
    }

    const storage = getStorage();
    const categoryImage = ref(storage, category);

    const colRef = collection(db, "category");

    uploadBytes(categoryImage, image)
      .then(() => {
        getDownloadURL(categoryImage)
          .then((url) => {
            
            addDoc(colRef, {
              category,
              image: url,
            })
            .then(() => {
              successNotification("Category created successfully");
              setLoading(false);
              setModal(false);
              // clearing inputs
              setCategory("");
              setImage(null);
            })
            .catch((err) => {
              errorNotification("Error creating category");
              console.log(err);
              setLoading(false);
              setModal(false);
            });

          })
          .catch(err => {
            errorNotification("Error creating category");
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
          <h3 className="text-xl font-bold tracking-md">Add a Category</h3>
        </div>

        <div className="mt-4">
          <form onSubmit={addCategory}>
          <div className="shadow rounded bg-white py-1 mb-3">
            
            <label
              htmlFor="category"
              className="font-bold px-3 text-gray-600 text-sm"
            >
              Category Name
            </label>
            <input
              type="text"
              id="category"
              className="px-3 text-gray-400 w-full focus:outline-none"
              name="catName"
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 mt-2">
            <label
              htmlFor="categoryImage"
              className="text-white bg-orange-500 bottom-2 right-2 p-2 rounded cursor-pointer"
            >
              Add Image
            </label>
            <input
              type="file"
              id="categoryImage"
              size="20"
              className="hidden"
              onChange={uploadImage}
              required
            /> 
            {image
              ? <span className="ml-2">{image.name}</span>
              : <span className="ml-2">Select an image</span>}
          </div>

          <button type="submit" className="py-2 px-4 rounded text-white bg-orange-500" disabled={loading}>
                {!loading ? (
                  <>
                    Add Category
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

export default Modal;