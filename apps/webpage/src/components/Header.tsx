import Logo from "../assets/Logo.svg"
import {MapPin, Search, Truck} from "lucide-react"
import HeaderImg from "../assets/HeaderImg.svg"
import { Input } from "@repo/ui/input"
import { Button as FindAddress } from "@repo/ui/button"
import { useState } from "react"
import { AuthModal } from "./AuthModal"  


function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex flex-col">
            <div className="topHeader w-[100%] h-[40px] bg-white flex flex-row justify-around">
                <div className="logo">
                    <img src={Logo} alt="Logo" /> 
                </div>
                <div className="address flex gap-1.5 m-2">
                <span>Deliver To:</span> 
                <MapPin className="text-[#FFB20E]"/>
                <span>Location Not Fetched</span>
                </div>
                <div className="signupButton flex gap-1.5 ">
                    <span>
                        <Search className="text-[#FFB20E] my-2"/> 
                    </span>
                    <span className="my-2">Search Food</span>
                    <span className="pl-2 my-0.5">
                    
            
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-4 py-2 bg-[#FFB20E] text-white rounded-lg hover:bg-[#e6a00d] transition-colors duration-200"
                            >
                                Sign In
                            </button>
                        
                    
                    </span>
                </div>
            </div>

            <AuthModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                initialView="login"
            />

            <div className="Header flex flex-row justify-around bg-[#FFB20E] w-[100%] h-[400px]">
                <div className="text flex flex-col my-10">
                    <h1 className=" text-white text-7xl font-extrabold drop-shadow-sm pb-1.5 ">Are You Starving?</h1>
                    <p className="text-white">Within a few clicks, find meals that are accessible near you</p>
                    <div className="addressBox h-[124.4px] w-[500px] justify-around  rounded-2xl bg-white mt-8  flex flex-col ">
                        <span className="delivery flex flex-row gap-1.5 p-5 text-red-600 pb-2">
                            <Truck/>
                            <span>Delivery</span>
                        </span>
                        <span className="textarea flex flex-row gap-1.5 px-5 pb-5">
                            <Input 
                            
                            placeholder="Enter Your Pin Code" className="w-[70%]"/>
                            <FindAddress className="text-red-600 hover:text-white border-2 border-red-200 hover:bg-red-500 cursor-pointer">Find Address</FindAddress>
                        </span>
                    </div>
                </div>
                <div className="img">
                    <img src={HeaderImg} alt="Header Image" />
                </div>
            </div>
        </div>
    )
}

export default Header