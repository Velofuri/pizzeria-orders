import prismaClient from '../../prisma'

export interface OrderRequest {
  order_id: string
}

export class FinishOrderService {
  static async execute({ order_id }: OrderRequest) {
    const order = await prismaClient.order.update({
      where: {
        id: order_id,
      },
      data: {
        status: true,
      },
    })

    return order
  }
}
