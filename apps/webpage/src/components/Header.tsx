import Logo from "../assets/Logo.svg"
import { MapPin, Truck } from "lucide-react"
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


interface Address {
    City: string;
    District: string;
    State: string;
    Pin: number;
}

function Header() {
    const [user, setUser] = useState<any | null>(null);
    const [pincode, setPincode] = useState("");
    const [address, setAddress] = useState<Address | null>(null);
    const dispatch = useDispatch()

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

    // Handle pincode submission
    const handlePin = async () => {
        if (pincode) {
            await fetchAddress(Number(pincode)); // Assuming fetchAddress stores the pincode in Firestore
            setPincode("");
            window.location.reload()// Clear input after successful address set
        }
    };

    return (
        <div className="flex flex-col">
            <div className="topHeader w-full h-[40px] bg-white flex flex-row justify-around fixed top-0 left-0 z-50 shadow-lg">
                <div className="logo">
                    <img src={Logo} alt="Logo" />
                </div>
                <div className="address flex gap-1.5 m-2">
                    <span>Deliver To:</span>
                    <MapPin className="text-[#FFB20E]" />
                    <span>{address ? `${address.City}, ${address.District}, ${address.State}` : "Location Not Found"}</span>
                </div>
                {user ? (
                    <div className="cart flex gap-1.5">
                        <CartBtn />
                    </div>
                ) : null}
                <div className="signupButton flex gap-1.5">
                    <span className="pl-2 my-0.5">
                        {user ? (
                            <Button onClick={handleLogout} className="px-4 py-2 bg-[#FFB20E] text-white rounded-lg hover:bg-[#e6a00d] transition-colors duration-200">Log Out</Button>
                        ) : (
                            <AuthModal />
                        )}
                    </span>
                </div>
            </div>

            <div className="Header flex flex-row justify-around bg-[#FFB20E] w-[100%] h-[400px]">
                <div className="text flex flex-col my-10">
                    <h1 className="text-white text-7xl font-extrabold drop-shadow-sm pb-1.5">Are You Starving?</h1>
                    <p className="text-white">Within a few clicks, find meals that are accessible near you</p>
                    <div className="addressBox h-[124.4px] w-[500px] justify-around rounded-2xl bg-white mt-8 flex flex-col">
                        <span className="delivery flex flex-row gap-1.5 p-5 text-red-600 pb-2">
                            <Truck />
                            <span>Delivery</span>
                        </span>
                        <span className="textarea flex flex-row gap-1.5 px-5 pb-5">
                            <Input
                                value={pincode}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPincode(e.target.value)} // Correct event handling
                                placeholder="Enter Your Pin Code"
                                className="w-[70%]"
                            />
                            <FindAddress onClick={handlePin} className="text-red-600 hover:text-white border-2 border-red-200 hover:bg-red-500 cursor-pointer">Find Address</FindAddress>
                        </span>
                    </div>
                </div>
                <div className="img">
                    <img src={HeaderImg} alt="Header Image" />
                </div>
            </div>
        </div>
    );
}

export default Header;
