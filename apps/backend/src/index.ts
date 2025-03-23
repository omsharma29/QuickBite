import { createServer } from "./server";
import { Cashfree } from "cashfree-pg";
import dotenv from 'dotenv';

dotenv.config();

const PORT = 5001;



// Initialize Cashfree
Cashfree.XClientId = process.env.CASHFREE_APP_ID; // Replace with your Test App ID from Cashfree
Cashfree.XClientSecret= process.env.CASHFREE_APP_SECRET_KEY; // Replace with your Test Secret Key
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

console.log('Cashfree initialized with APP_ID:', process.env.CASHFREE_APP_ID);

const server = createServer();

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
