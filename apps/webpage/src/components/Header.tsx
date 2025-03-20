import Logo from "../assets/Logo.svg"
import { MapPin, Truck, AlignJustify } from "lucide-react"
import HeaderImg from "../assets/HeaderImg.svg"
import { Input } from "@repo/ui/input"
import { Button, Button as FindAddress } from "@repo/ui/button"
import AuthModal from "./AuthModal"
import { auth, db } from "../lib/firebase-auth";
import { useEffect, useState } from "react"
import CartBtn from "./CartBtn"
import { fetchAddress } from "../lib/AddressFetch"
import { collection, query, where, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux"
import { clearCart } from "../store/slices/cartSlice"
import Cookies from 'js-cookie';
import SideBar from "./SideBar"


interface Address {
    City: string;
    District: string;
    State: string;
    Pin: number;
}

function Header() {
    const [user, setUser] = useState<any | null>(null);
    const [zip_code, setzip_code] = useState("");
    const [address, setAddress] = useState<Address | null>(null);
    const dispatch = useDispatch()
    const [sidebar, setSidebar] = useState(false)

    //side bar 

    const handleClick = ()=>{
        setSidebar((prevState) => !prevState)
    }

    // Checking session
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            // console.log("Auth State Changed:", currentUser);
            setUser(currentUser);
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

    // Fetch the user's address from Firestore
    useEffect(() => {
        const fetchData = async () => {
            const currentUser = auth.currentUser;
            if (!currentUser) {
                console.error("No user is logged in.");
                return;
            }
            try {
                // Query the Firestore to find the user's address
                const addressQuery = query(collection(db, "cities"), where("User", "==", currentUser.uid));
                const querySnapshot = await getDocs(addressQuery);

                if (!querySnapshot.empty) {
                    const userAddress = querySnapshot.docs[0].data() as Address;
                    setAddress(userAddress); // Set address state
                } else {
                    console.log("No address found for the user.");
                }
            } catch (error) {
                console.error("Error fetching address:", error);
            }
        };

        fetchData();
    }, [user]); // Re-run on user login

    // Handle logout
    const handleLogout = async () => {
        try {
            dispatch(clearCart())
            Cookies.remove("cartItems");
            await auth.signOut();
            setAddress(null)
        } catch (error: any) {
            console.log(error);
        }
    };

    // Handle zip_code submission
    const handlePin = async () => {
        if (zip_code) {
            await fetchAddress(Number(zip_code)); // Assuming fetchAddress stores the zip_code in Firestore
            setzip_code("");
            window.location.reload()
            
        }
    };







    return (
        <div className="sm:flex sm:flex-col w-full overflow-hidden">
    <div className="topHeader w-full h-[40px] bg-white flex flex-row justify-around fixed top-0 left-0 z-50 shadow-lg">
        <div className="logo hidden lg:inline">
            <img src={Logo} alt="Logo" />
        </div>
        <div className="address flex gap-1.5 sm:m-2">
            <span className="hidden lg:inline">Deliver To:</span>
            <MapPin className="text-[#FFB20E]" />
            <span>{address ? `${address.City}, ${address.District}, ${address.State}` : "Location Not Found"}</span>
        </div>
        {user ? (
            <div className="cart flex gap-1.5">
                <CartBtn />
            </div>
        ) : (
            <div className="sm:hidden"><AuthModal /></div>
        )}
        <div className="signupButton sm:flex gap-1.5 hidden lg:inline ">
            <span className="pl-2 my-0.5">
                {user ? (
                    <Button onClick={handleLogout} className="px-4 py-2 bg-[#FFB20E] text-white rounded-lg hover:bg-[#e6a00d] transition-colors duration-200">Log Out</Button>
                ) : (
                    <AuthModal />
                )}
            </span>
        </div>
    </div>

    <div className="Header relative flex flex-col sm:flex-row items-center justify-between bg-[#FFB20E] w-full h-auto sm:h-[400px] p-5 sm:p-10">
    {/* Left Section - Text & Input */}
    <div className="text flex flex-col items-center sm:items-start text-center sm:text-left sm:max-w-full">
        <h1 className="text-white text-2xl sm:text-7xl font-extrabold drop-shadow-sm sm:py-2 pt-5">
            Are You Starving?
        </h1>
        
        {/* AlignJustify icon in top-left corner */}
        {sidebar && <SideBar sidebar={sidebar} setSidebar={setSidebar} />}
        <div className="sm:hidden absolute left-4 top-4 flex justify-start items-start px-4 pt-7">
            <AlignJustify onClick={handleClick} className="text-white cursor-pointer" />
        </div>

        <p className="text-white text-sm sm:text-lg">
            Within a few clicks, find meals that are accessible near you.
        </p>

        {/* Address Box */}
        <div className="addressBox w-full max-w-full sm:max-w-[500px] h-auto sm:h-[124.4px] rounded-2xl bg-white mt-4 sm:mt-8 flex flex-col justify-around p-3 sm:p-5">
            {/* Delivery Section */}
            <span className="delivery flex items-center gap-2 sm:gap-3 text-red-600 pb-2">
                <Truck className="w-4 h-4 sm:w-6 sm:h-6" />
                <span className="text-xs sm:text-base">Delivery</span>
            </span>

            {/* Input & Button Section */}
            <span className="textarea flex items-center gap-2 sm:gap-4">
                <Input
                    value={zip_code}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setzip_code(e.target.value)}
                    placeholder="Enter Your Pin Code"
                    className="w-[60%] sm:w-[70%] h-[30px] sm:h-[40px] text-xs sm:text-sm px-2 sm:px-3 border rounded-md"
                />
                <FindAddress
                    onClick={handlePin}
                    className="w-[40%] sm:w-[30%] h-[30px] sm:h-[40px] text-xs sm:text-sm text-red-600 hover:text-white border-2 border-red-200 hover:bg-red-500 cursor-pointer rounded-md flex items-center justify-center"
                >
                    Find Address
                </FindAddress>
            </span>
        </div>
    </div>

    {/* Right Section - Image */}
    <div className="img w-full sm:w-[50%] flex justify-center mt-5 sm:mt-0">
        <img src={HeaderImg} alt="Header Image" className="max-w-full h-auto object-contain" />
    </div>
</div>

</div>

    );
}

export default Header;
