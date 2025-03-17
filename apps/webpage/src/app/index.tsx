import {Route, Routes, BrowserRouter} from "react-router-dom"
import Home from "../pages/Home"
import NotFound from "../pages/NotFound"
import OrderPage from "../pages/OrderPage"



export default function index() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/orderpage" element={<OrderPage/>}/>
    <Route path="*" element={<NotFound/>}/>
   </Routes>
   </BrowserRouter>
    
  )
}
