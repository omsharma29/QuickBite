import axios from "axios";
import { collection, addDoc, query, getDocs, where, doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase-auth";

interface Address {
  postalLocation: string;
  district: string;
  state: string;
  postalCode: number;
}

async function Address(zip_code: number): Promise<Address | undefined> {
  try {
    const fetch = await axios.get(`${import.meta.env.VITE_ADDRESS_URL}&zip_code=${zip_code}&country_code=IN`);
    const address = fetch.data?.result?.[0]
    
    // Log response for debugging
    // console.log(fetch.data);

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

export async function fetchAddress(zip_code: number) {
  try {
    const address = await Address(zip_code);
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
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error("No user is logged in.");
      return;
    }

    // Query Firestore to check if the user already has an address
    const q = query(collection(db, "cities"), where("User", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // If the user does not have an address, add a new one
      await addDoc(collection(db, "cities"), {
        User: userId,
        City: addressData.postalLocation,
        District: addressData.district,
        State: addressData.state,
        Pin: addressData.postalCode
      });
      console.log("Address added to Firestore successfully.");
    } else {
      // If the user already has an address, update the existing one
      const docRef = doc(db, "cities", querySnapshot.docs[0].id);
      await setDoc(docRef, {
        User: userId,
        City: addressData.postalLocation,
        District: addressData.district,
        State: addressData.state,
        Pin: addressData.postalCode
      });
      console.log("Address updated in Firestore successfully.");
    }
  } catch (error) {
    console.error("Error adding/updating address to Firestore:", error);
  }}
