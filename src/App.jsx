import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importing pages
import Homepage from "./pages/Homepage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/admin/Admin";
import Dashboard from "./pages/admin/Dashboard";
import Category from "./pages/admin/Category";
import Leads from "./pages/admin/Leads";

// components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Toast notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <div className="">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />}>
            <Route path="" element={<Dashboard />} />
            <Route path="category" element={<Category />} />
            <Route path="leads" element={<Leads />} />
          </Route>
        </Routes>
        <Footer />

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
  );
}

export default App;