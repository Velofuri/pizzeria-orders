import { Request, Response } from 'express'
import { AddItemService, ItemRequest } from '../../services/order/AddItemService'

export class AddItemController {
  static async handle(req: Request, res: Response) {
    const { order_id, product_id, amount } = req.body as ItemRequest

    const order = await AddItemService.execute({ order_id, product_id, amount })

    return res.json(order)
  }
}
