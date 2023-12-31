import { Request, Response } from 'express'
import { CreateOrderService, OrderRequest } from '../../services/order/CreateOrderService'

export class CreateOrderController {
  static async handle(req: Request, res: Response) {
    const { table, name } = req.body as OrderRequest

    const order = await CreateOrderService.execute({ name, table })

    return res.json(order)
  }
}
