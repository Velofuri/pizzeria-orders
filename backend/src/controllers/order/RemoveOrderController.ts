import { Request, Response } from 'express'
import { RemoveOrderService } from '../../services/order/RemoveOrderService'

export class RemoveOrderController {
  static async handle(req: Request, res: Response) {
    const order_id = req.query.order_id as string

    const order = await RemoveOrderService.execute({ order_id })

    return res.json(order)
  }
}
