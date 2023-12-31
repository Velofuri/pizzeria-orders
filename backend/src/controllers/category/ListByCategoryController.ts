import { Request, Response } from 'express'
import { ListByCategoryService } from '../../services/category/ListByCategoryService'

export class ListByCategoryController {
  static async handle(req: Request, res: Response) {
    const category_id = req.query.category_id as string

    const products = await ListByCategoryService.execute({ category_id })

    return res.json(products)
  }
}
