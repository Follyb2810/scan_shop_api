import { Request, Response } from "express";
import { productService, ProductService } from "./product.service";
import { AuthRequest } from "../../middlware/auth.middleware";

export const ProductController = {
  // POST /products
  create: async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId!;
      const data = req.body;

      const product = await productService.create(userId, data);
      res.status(201).json({ message: "Product created", product });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // GET /products
  getAll: async (_req: Request, res: Response) => {
    const products = await productService.getAll();
    res.json(products);
  },

  // GET /products/:id
  getById: async (req: Request, res: Response) => {
    const product = await productService.getById(req.params.id);
    res.json(product);
  },

  // GET /products/my
  getMyProducts: async (req: AuthRequest, res: Response) => {
    const userId = req.userId!;
    const products = await productService.getMyProducts(userId);
    res.json(products);
  },

  // PATCH /products/:id
  update: async (req: Request, res: Response) => {
    const product = await productService.update(req.params.id, req.body);
    res.json({ message: "Product updated", product });
  },

  // PATCH /products/:id/disable
  disable: async (req: Request, res: Response) => {
    const result = await productService.disable(req.params.id);
    res.json({ message: "Product disabled", result });
  },

  // DELETE /products/:id
  delete: async (req: Request, res: Response) => {
    const result = await productService.delete(req.params.id);
    res.json({ message: "Product deleted", result });
  },
};
