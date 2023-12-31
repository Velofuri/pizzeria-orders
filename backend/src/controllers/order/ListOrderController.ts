import { Request, Response } from 'express'
import { ListOrderService } from '../../services/order/ListOrderService'

export class ListOrderController {
  static async handle(req: Request, res: Response) {
    const orders = await ListOrderService.execute()
    return res.json(orders)
  }
}
