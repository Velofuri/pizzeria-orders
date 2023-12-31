import { Request, Response } from 'express'
import { OrderRequest, SendOrderService } from '../../services/order/SendOrderService'

export class SendOrderController {
  static async handle(req: Request, res: Response) {
    const { order_id } = req.body as OrderRequest

    const order = await SendOrderService.execute({ order_id })

    return res.json(order)
  }
}
