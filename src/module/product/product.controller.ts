import { Request, Response } from "express";
import { ProductService } from "./product.service";
import { AuthRequest } from "../../middlware/auth.middleware";

export class ProductController {
  private readonly service = new ProductService();

  // POST /products
  create = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId!;
      const data = req.body;

      const product = await this.service.create(userId, data);
      res.status(201).json({ message: "Product created", product });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  // GET /products
  getAll = async (_req: Request, res: Response) => {
    const products = await this.service.getAll();
    res.json(products);
  };

  // GET /products/:id
  getById = async (req: Request, res: Response) => {
    const product = await this.service.getById(req.params.id);
    res.json(product);
  };

  // GET /products/my
  getMyProducts = async (req: AuthRequest, res: Response) => {
    const userId = req.userId!;
    const products = await this.service.getMyProducts(userId);
    res.json(products);
  };

  // PATCH /products/:id
  update = async (req: Request, res: Response) => {
    const product = await this.service.update(req.params.id, req.body);
    res.json({ message: "Product updated", product });
  };

  // PATCH /products/:id/disable
  disable = async (req: Request, res: Response) => {
    const result = await this.service.disable(req.params.id);
    res.json({ message: "Product disabled", result });
  };

  // DELETE /products/:id
  delete = async (req: Request, res: Response) => {
    const result = await this.service.delete(req.params.id);
    res.json({ message: "Product deleted", result });
  };
}
