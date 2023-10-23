import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useReducer } from "react";

// reducers
import { initialState, cartReducer } from "./reducers/cartReducer";

// Importing pages
import Homepage from "./pages/Homepage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Signup2 from "./pages/Signup2";
import Admin from "./pages/admin/Admin";
import Dashboard from "./pages/admin/Dashboard";
import Category from "./pages/admin/Category";
import Leads from "./pages/admin/Leads";
import Orders from "./pages/admin/Orders";

// Toast notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// context
import { CartContext } from "./contexts/cartContext";
import Index from "./pages/Index";

function App() {

  const [cart, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{
      cart,
      dispatch,
    }}>
      <div className="">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />}>
              <Route path="" element={<Homepage />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="signup2" element={<Signup2 />} />
            </Route>
            <Route path="/admin" element={<Admin />}>
              <Route path="" element={<Dashboard />} />
              <Route path="category" element={<Category />} />
              <Route path="leads" element={<Leads />} />
              <Route path="orders" element={<Orders />} />
            </Route>
          </Routes>

          <ToastContainer
            position="top-center"
            autoClose="2000"
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          ></ToastContainer>

        </BrowserRouter>
      </div>
    </CartContext.Provider>
  );
}

export default App;