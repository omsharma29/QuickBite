import { Cashfree } from "cashfree-pg"; 


Cashfree.XClientId = process.env.CASHFREE_APP_ID; // Replace with your Test App ID from Cashfree
Cashfree.XClientSecret= process.env.CASHFREE_APP_SECRET_KEY; // Replace with your Test Secret Key
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX; // Use sandbox URL for testing

interface CreateOrderParams {
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderId: number;
  customerId : string
}

export const createCashfreeOrder = async ({ amount, customerName, customerEmail, customerPhone, orderId, customerId }: CreateOrderParams) => {
  try {
    const orderData = {
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: customerId, // Added customer_id as required
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
      },
      order_meta: {
        return_url: `https://test.cashfree.com/pgappsdemos/return.php?order_id=${orderId}`, // Replace with your success page URL
      },
    };

    const response = await Cashfree.PGCreateOrder("2023-08-01", orderData);
    console.log(response.data)
    return response.data;
    
  } catch (error: any) {
    console.error("Cashfree Order Error:", error?.response?.data || error);
    throw new Error("Failed to create order");
  }
};
