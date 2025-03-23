import { Button } from "@repo/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { auth, db } from "../lib/firebase-auth";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import axios from "axios";
import * as Cashfree from "@cashfreepayments/cashfree-js";

interface Address {
  City: string;
  District: string;
  State: string;
  Pin: number;
}

export default function OrderPage() {
  const cartItems = useSelector((state: RootState) => state.cart.Cart ?? []);
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const [address, setAddress] = useState<Address | null>(null);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId]= useState(" ")
  const [cashfreeInstance, setCashfreeInstance] = useState<any>(null);

  const user = auth.currentUser;

  useEffect(() => {
    const fetchAddressData = async () => {
      const user = auth.currentUser; // Get current user
      if (!user) {
        console.error("No user is logged in.");
        return;
      }

      try {
        const addressQuery = query(collection(db, "cities"), where("User", "==", user.uid));
        const querySnapshot = await getDocs(addressQuery);

        if (!querySnapshot.empty) {
          const userAddress = querySnapshot.docs[0].data() as Address;
          setAddress(userAddress); // Set address state
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    fetchAddressData(); // Call the async function inside useEffect
  }, []);

  useEffect(() => {
    const initializeCashfree = async () => {
      try {
        const instance = await Cashfree.load({
          mode: "sandbox",
        });
        setCashfreeInstance(instance);
      } catch (error) {
        console.error("Failed to initialize Cashfree:", error);
        setError("Payment system initialization failed");
      }
    };

    initializeCashfree();
  }, []);

  const handlePayment = async () => {
    if (!cashfreeInstance) {
      setError("Payment system not initialized");
      return;
    }
    
    // Ensure all fields are filled
    if (
      !user?.email ||
      !name.trim() ||
      !phone.trim() ||
      !address?.City?.trim() ||
      !address?.State?.trim() ||
      !address?.District?.trim() ||
      !address?.Pin
    ) {
      setError("All fields are mandatory. Please fill in all details.");
      return;
    }
    setError(null);
    
    try {
      const orderData = {
        amount: totalAmount,
        customerName: name,
        customerEmail: user.email,
        customerPhone: phone,
        orderId: Date.now().toString(),
        customerId: user.uid,
      };

      const response = await axios.post('http://localhost:5001/api/cashfree-payment', orderData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: false
      });

      // Extract payment session ID from the correct path in response
      const paymentSessionId = response.data.orderData.payment_session_id;
      
      if (!paymentSessionId) {
        throw new Error('Payment session ID not received');
      }

      // Store order ID
      setOrderId(response.data.orderData.order_id);

      // Configure checkout options
      const checkoutOptions = {
        paymentSessionId: paymentSessionId,
        paymentComponents: ["card", "upi", "netbanking"],
        redirectTarget: "_modal",
      };

      // Remove console.log and directly call checkout
      await cashfreeInstance.checkout(checkoutOptions);

    } catch (error: any) {
      console.error('Full error details:', error);
      setError(error.message || 'Payment initialization failed');
    }
  }
    
  return (
    <div className="flex sm:flex-row flex-col sm:justify-between p-5 m-5 h-[80vh] gap-3">
      <div className="sm:w-3/4 bg-[#FFB20E] p-8 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-black mb-3">Personal Details</h2>
          <div className="flex gap-3">
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-1/2 bg-gray-100 border-2 border-gray-300 rounded-md p-1.5 shadow-md text-sm cursor-not-allowed"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-1/2 bg-white border-2 border-gray-300 rounded-md p-1.5 shadow-md text-sm focus:outline-none focus:border-amber-500 transition duration-300"
            />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone No."
              className="w-1/2 bg-white border-2 border-gray-300 rounded-md p-1.5 shadow-md text-sm focus:outline-none focus:border-amber-500 transition duration-300"
            />
          </div>
        </div>

        {/* Address Section */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">Personal Address</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={address?.City || ""}
              placeholder="City"
              onChange={(e) => setAddress({ ...address, City: e.target.value } as Address)}
              className="bg-white border-2 border-gray-300 rounded-md p-2 shadow-md focus:outline-none focus:border-amber-500 transition duration-300"
            />
            <input
              type="text"
              value={address?.State || ""}
              placeholder="State"
              onChange={(e) => setAddress({ ...address, State: e.target.value } as Address)}
              className="bg-white border-2 border-gray-300 rounded-md p-2 shadow-md focus:outline-none focus:border-amber-500 transition duration-300"
            />
            <input
              type="text"
              value={address?.District || ""}
              placeholder="District"
              onChange={(e) => setAddress({ ...address, District: e.target.value } as Address)}
              className="bg-white border-2 border-gray-300 rounded-md p-2 shadow-md focus:outline-none focus:border-amber-500 transition duration-300"
            />
            <input
              type="text"
              value={address?.Pin || ""}
              placeholder="Pincode"
              onChange={(e) => setAddress({ ...address, Pin: parseInt(e.target.value) || "" } as Address)}
              className="bg-white border-2 border-gray-300 rounded-md p-2 shadow-md focus:outline-none focus:border-amber-500 transition duration-300"
            />
            <input
              type="text"
              placeholder="Residential Address"
              className="col-span-2 bg-white border-2 border-gray-300 rounded-md p-2 shadow-md focus:outline-none focus:border-amber-500 transition duration-300"
            />
            <input
              type="text"
              placeholder="Landmark"
              className="col-span-2 bg-white border-2 border-gray-300 rounded-md p-2 shadow-md focus:outline-none focus:border-amber-500 transition duration-300"
            />
          </div>
        </div>

        {/* Display error message if validation fails */}
        {error && (
          <p className="text-red-600 text-sm mt-2">
            {error}
          </p>
        )}
      </div>

      {/* Right Section - Order Summary */}
      <div className="sm:w-1/4 text-black px-6 mb:3 py-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col items-center">
        <p className="font-semibold text-2xl">&#8377; {totalAmount} /-</p>
        <hr className="w-full border-t-2 border-gray-400 mt-2 pt-4" />
        <div className="w-full h-[60%]">
          <div className="flex justify-evenly px-2 pb-4">
            <p className="w-1/2 text-left font-bold">Items</p>
            <p className="w-1/4 text-center font-bold">Qty</p>
            <p className="w-1/4 text-right font-bold">Price</p>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[200px]">
            {cartItems.map((items) => (
              <div key={items.id} className="flex justify-evenly items-center pb-2">
                <div className="w-1/2 truncate">{items.name}</div>
                <div className="w-1/4 text-center">{items.quantity}</div>
                <div className="w-1/4 text-right">{items.quantity * items.price}</div>
              </div>
            ))}
          </div>
        </div>
        <hr className="w-full border-t-2 border-gray-400 mt-2 pt-4" />
        <Button
          className="w-full h-[40px] bg-amber-500 cursor-pointer"
          onClick={handlePayment}
        >
          Do Payment
        </Button>
        {/* Show error below the button */}
        {error && (
          <p className="text-red-600 text-sm mt-2">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
