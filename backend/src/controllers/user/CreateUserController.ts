import { Request, Response } from 'express'
import { CreateUserService } from '../../services/user/CreateUserService'

export class CreateUserController {
  static async handle(req: Request, res: Response) {
    const { name, email, password } = req.body

    const user = await CreateUserService.execute({ name, email, password })

    return res.json(user)
  }
}
