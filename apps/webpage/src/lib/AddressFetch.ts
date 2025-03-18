import axios from "axios";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase-auth";

interface Address {
  postalLocation: string;
  district: string;
  state: string;
  postalCode: number;
}

async function Address(pincode: number): Promise<Address | undefined> {
  try {
    // Ensure proper URL concatenation with the correct base URL
    const fetch = await axios.get(`${import.meta.env.VITE_API_URL}/pincode?postalcode=${pincode}`);
    const address = fetch.data?.response?.result?.item0;
    
    // Log response for debugging
    console.log(fetch.data);

    if (address) {
      return {
        postalLocation: address.postalLocation,
        district: address.district,
        state: address.state,
        postalCode: address.postalCode
      };
    } else {
      console.error("No address found in response.");
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    return undefined;
  }
}

export async function fetchAddress(pincode: number) {
  try {
    const address = await Address(pincode);
    if (address) {
      await AddToFireStore(address);
    } else {
      console.log("Address data is undefined, not saving to Firestore.");
    }
  } catch (error) {
    console.error("Error in fetchAddress:", error);
  }
}

async function AddToFireStore(addressData: Address) {
  try {
    await addDoc(collection(db, "cities"), {
      City: addressData.postalLocation,
      District: addressData.district,
      State: addressData.state,
      Pin: addressData.postalCode
    });
    console.log("Address added to Firestore successfully.");
  } catch (error) {
    console.error("Error adding address to Firestore:", error);
  }
}
