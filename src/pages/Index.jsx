import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// icons
import { PiCaretRightBold } from "react-icons/pi";

const Index = () => {

    const [ show, setShow ] = useState(false);

    return (
        <div className="relative">
            <Navbar show={show} setShow={setShow} />
            <Outlet />
            <Footer />

            <div className="fixed top-0 left-0 h-screen v-center md:hidden">
                <div className="p-2 rounded-r-full bg-orange-600 shadow-lg text-white cursor-pointer">
                <PiCaretRightBold className="text-xl" onClick={() => setShow(true)} />
                </div>
            </div>

            <div className={`fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 z-10 md:hidden ${!show && "hidden"}`} onClick={() => setShow(false)}></div>
        </div>
    )
}

export default Index;