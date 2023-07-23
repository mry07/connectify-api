import { Request } from "express";

interface Image {
  filename: string;
  blurhash: string;
}

export interface StoreImage {
  (req: Request, path: string): Promise<Image[]>;
}
