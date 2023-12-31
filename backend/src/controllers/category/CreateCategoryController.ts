import { Request, Response } from 'express'
import { CreateCategoryService } from '../../services/category/CreateCategoryService'

export class CreateCategoryController {
  static async handle(req: Request, res: Response) {
    const { name } = req.body

    const category = await CreateCategoryService.execute({ name })

    return res.json(category)
  }
}
