// src/types/express.d.ts
import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string; // Define userId as optional (or required if always present)
  }
}