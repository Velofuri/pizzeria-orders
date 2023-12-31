import { Request, Response } from 'express'
import { ListCategoryService } from '../../services/category/ListCategoryService'

export class ListCategoryController {
  static async handle(req: Request, res: Response) {
    const category = await ListCategoryService.execute()
    return res.json(category)
  }
}
