import prismaClient from '../../prisma'

export interface OrderRequest {
  order_id: string
}

export class SendOrderService {
  static async execute({ order_id }: OrderRequest) {
    const order = await prismaClient.order.update({
      where: {
        id: order_id,
      },
      data: {
        draft: false,
      },
    })
    return order
  }
}
