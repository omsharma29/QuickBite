

export default function OrderSuccess() {

  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p>Your order ID: </p>
      <button
      
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Go Home
      </button>
    </div>
  );
}
