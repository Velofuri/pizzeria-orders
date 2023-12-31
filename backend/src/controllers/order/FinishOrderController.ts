import { Request, Response } from 'express'
import { FinishOrderService, OrderRequest } from '../../services/order/FinishOrderService'

export class FinishOrderController {
  static async handle(req: Request, res: Response) {
    const { order_id } = req.body as OrderRequest

    const order = await FinishOrderService.execute({ order_id })

    return res.json(order)
  }
}
