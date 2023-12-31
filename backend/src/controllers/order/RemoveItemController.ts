import { Request, Response } from 'express'
import { RemoveItemService } from '../../services/order/RemoveItemService'

export class RemoveItemController {
  static async handle(req: Request, res: Response) {
    const item_id = req.query.item_id as string

    const order = await RemoveItemService.execute({ item_id })

    return res.json(order)
  }
}
