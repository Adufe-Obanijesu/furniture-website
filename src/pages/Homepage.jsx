import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

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

// contexts
import { CartContext } from "../contexts/cartContext";

// icons
import { BsHandbag } from "react-icons/bs";

const Homepage = () => {

	const { cart } = useContext(CartContext);

	const [ total, setTotal ] = useState(0);
	const [ loading, setLoading ] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);
  
  const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
  };

  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  useEffect(() => {
    if (cart.length === 0) {
      setTotal(0);
      return;
    }

    let totalPrice = cart.reduce((total, item) => {
        total += item.price * item.qty;
        return total;
      }, 0);
    setTotal(totalPrice)
  }, [cart]);

	const [ products, setProducts ] = useState([]);
	const [ showProducts, setShowProducts ] = useState([]);
	const [ categories, setCategories ] = useState([]);
	const [ filter, setFilter ] = useState("");

	
  useEffect(() => {
	const colRef = collection(db, "products");

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
	const catRef = collection(db, "category");

	setLoading(true);
	const unsub =  () => {
		onSnapshot(catRef, (snapshot) => {
			let arr = [];
			snapshot.docs.forEach((doc) => {
			arr.push({ ...doc.data(), id: doc.id });
			})

			setCategories(arr);
			setLoading(false);
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
  }, [filter, products]);

	return (
		<main className="lg:px-32 md:px-12 px-6 overflow-hidden">

			<Hero />

			<div className="py-12">
				<p className="font-semibold text-center text-lg text-gray-700">
					Decorate your house as you see fit! With our grandiose collections of contemporary <br /> furniture and unique house decor, we will help you make your household as <br /> comfortable as possible.
				</p>
			</div>

			{/* Products Section */}
			<section id="shop" className="py-12">
				<div className="flex h-center w-full">
					<div className="inline">
						<span className={`mr-8 uppercase transitionItem hover:text-gray-600 text-sm cursor-pointer ${!filter ? "activeCat" : "text-gray-400"}`} onClick={() => setFilter("")}>All</span>

						{
							categories.length === 0 && !loading ? <h3 className="font-semibold text-center text-lg text-gray-700"></h3> : categories && categories.map(category => <span key={category.category} className={`mr-8 uppercase transitionItem hover:text-gray-600 text-sm cursor-pointer ${filter === category.category ? "activeCat" : "text-gray-400"}`} onClick={() => setFilter(category.category)}>{category.category}</span>)
						}

					</div>
				</div>

				<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-6">

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

			<Link to="/cart">
        <div className={`${scrollPosition >= 90 ? "fixed" : "hidden"} right-0 top-[47%] py-3 px-2 bg-black flex gap-2 v-center text-white transitionItem`}>
          <BsHandbag />
          <span className="font-medium">Cart ${total}</span>
        </div>
      </Link>

		</main>
	)
}

export default Homepage;