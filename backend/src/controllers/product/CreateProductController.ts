import { Request, Response } from 'express'
import {
  CreateProductService,
  ProductsRequest,
} from '../../services/product/CreateProductService'

export class CreateProductController {
  static async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body as ProductsRequest

    if (!req.file) {
      throw new Error('error upload file')
    }

    const { filename: banner } = req.file

    const product = await CreateProductService.execute({
      name,
      price,
      description,
      banner,
      category_id,
    })
    return res.json(product)
  }
}
