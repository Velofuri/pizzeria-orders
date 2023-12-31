import { Request, Response } from 'express'
import { AuthUserService } from '../../services/user/AuthUserService'

export class AuthUserController {
  static async handle(req: Request, res: Response) {
    const { email, password } = req.body

    const auth = await AuthUserService.execute({ email, password })

    return res.json(auth)
  }
}
