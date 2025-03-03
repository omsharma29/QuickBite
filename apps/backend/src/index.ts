import { createServer } from "./server";
const PORT = 5001;

const server = createServer();

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
