import { X } from "lucide-react"
import Logo from "../assets/Logo.svg"
import { Button } from "@repo/ui/button";
import { clearCart } from "../store/slices/cartSlice";
import { auth } from "../lib/firebase-auth";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


interface SideBarProps {
    sidebar: boolean;
    setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function SideBar({ sidebar, setSidebar }: SideBarProps) {
    const dispatch = useDispatch()
    const hide = () => {
        setSidebar(false);
    };
    const [user, setUser] = useState<any | null>(null);
        useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged((currentUser) => {
                // console.log("Auth State Changed:", currentUser);
                setUser(currentUser);
            });
    
            return () => unsubscribe(); // Cleanup listener on unmount
        }, []);


    const handleLogout = async () => {
        try {
            dispatch(clearCart())
            Cookies.remove("cartItems");
            await auth.signOut();
            window.location.reload()
            
        } catch (error: any) {
            console.log(error);
        }
    };
    return (
        <div className={`sm:hidden fixed left-0 top-0 h-full w-[40vw] bg-white pt-10 ${sidebar ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="p-5">
                <div className="flex flex-col items-center gap-5">
                <X onClick={hide} />
                <img src={Logo} alt="Logo" />
                </div>
                <div>
                <div className="signupButton sm:flex gap-1.5 lg:inline ">
            <span className="pl-2 my-0.5">
                {user && (
                    <Button onClick={handleLogout} className="px-4 py-2 bg-[#FFB20E] text-white rounded-lg hover:bg-[#e6a00d] transition-colors duration-200">Log Out</Button>
                )}
            </span>
        </div>
                </div>
                
            </div>
        </div>
    );
}

