import express from "express";
import cors from "cors";
import routes from "./routes/allroutes";

export const createServer = (): express.Application => {
  const app = express();
  
  app.use(cors({
    origin: [
      "https://quick-bite-webpage.vercel.app", 
      "http://localhost:3001",
      "https://quickbite-xyhf.onrender.com"
    ],
    credentials: true
  }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Add health check route
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api', routes);

  // Error handling
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  });

  return app;
};
