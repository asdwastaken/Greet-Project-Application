import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Catalog from "./Catalog/Catalog";
import About from "./About/About";


export default function RoutesComp() {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/catalog" element={<Catalog />}></Route>
            <Route path="/about" element={<About />}></Route>
        </Routes>
    )
}