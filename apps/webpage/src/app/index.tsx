import {Route, Routes, BrowserRouter} from "react-router-dom"
import Home from "../pages/Home"
import NotFound from "../pages/NotFound"



export default function index() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="*" element={<NotFound/>}/>
   </Routes>
   </BrowserRouter>
    
  )
}
