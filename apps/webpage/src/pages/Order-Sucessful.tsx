import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { clearCart } from "../store/slices/cartSlice";
import GreenTick from "../assets/GreenTick2.gif"



export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleClick = ()=>{
    navigate("/")
    dispatch(clearCart())
  }

  const orderId = searchParams.get("order_id") || "N/A";
  console.log(orderId)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img src={GreenTick} alt="" />
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="text-lg mt-2">Your order ID: <span className="font-semibold">{orderId}</span></p>

      <button
        onClick={handleClick}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition duration-200"
      >
        Go Home
      </button>
    </div>
  );
}
