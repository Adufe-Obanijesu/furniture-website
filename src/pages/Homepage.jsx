import { useState, useEffect } from "react";

// firebase
import {
  collection,
  db,
  onSnapshot,
} from "../firebase/index";

// components
import Hero from "../components/homepage/Hero";
import Product from "../components/homepage/Product";
import Blog from "../components/homepage/Blog";
import Newsletter from "../components/homepage/Newsletter";

const Homepage = () => {

	const [ products, setProducts ] = useState([]);
	const [ showProducts, setShowProducts ] = useState([]);
	const [ categories, setCategories ] = useState([]);
	const [ filter, setFilter ] = useState("");

  const colRef = collection(db, "products");
  const catRef = collection(db, "category");

  useEffect(() => {
    const unsub = () => {
    	onSnapshot(colRef, (snapshot) => {
	      let arr = [];
	      snapshot.docs.forEach((doc) => {
	        arr.push({ ...doc.data(), id: doc.id });
	      })

	      setProducts(arr);
	      setShowProducts(arr);

	    })
    }
    return () => unsub();
  }, []);

  useEffect(() => {
  	const unsub =  () => {
  		onSnapshot(catRef, (snapshot) => {
	      let arr = [];
	      snapshot.docs.forEach((doc) => {
	        arr.push({ ...doc.data(), id: doc.id });
	      })

	      setCategories(arr);

	    })
  	}

  	return () => unsub();
  }, []);

  useEffect(() => {
  	if (filter) {
  		const filteredProducts = products.filter(product => product.category === filter);
  		setShowProducts(filteredProducts)
  	} else {
  		setShowProducts(products);
  	}
  }, [filter]);

	return (
		<main className="px-32">

			<Hero />

			<div className="py-12">
				<p className="font-semibold text-center text-lg text-gray-700">
					Decorate your house as you see fit! With our grandiose collections of contemporary <br /> furniture and unique house decor, we will help you make your household as <br /> comfortable as possible.
				</p>
			</div>

			{/* Products Section */}
			<section className="py-12">
				<div className="flex h-center w-full">
					<div className="inline">
						<span className={`mr-8 uppercase transitionItem hover:text-gray-600 text-sm cursor-pointer ${!filter ? "activeCat" : "text-gray-400"}`} onClick={() => setFilter("")}>All</span>

						{
							categories && categories.map(category => <span key={category.category} className={`mr-8 uppercase transitionItem hover:text-gray-600 text-sm cursor-pointer ${filter === category.category ? "activeCat" : "text-gray-400"}`} onClick={() => setFilter(category.category)}>{category.category}</span>)
						}

					</div>
				</div>

				<div className="grid grid-cols-3 gap-8 mt-6">

					{
						showProducts && showProducts.map(product => <Product key={product.name} name={product.name} price={product.price} image={product.image} quantity={product.qty} />)
					}

				</div>

			</section>

			{/* Blog */}
			<section className="py-12">
				<Blog date="march 22, 2022" heading="we believe that your style should be a reflection of you and your style." image="1.jpg" />
				<Blog date="march 22, 2022" heading="we believe that your style should be a reflection of you and your style." image="2.jpg" />
				<Blog date="march 22, 2022" heading="we believe that your style should be a reflection of you and your style." image="3.jpg" />
			</section>

			<Newsletter />

		</main>
	)
}

export default Homepage;