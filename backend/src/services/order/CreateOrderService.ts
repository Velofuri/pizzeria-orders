import prismaClient from '../../prisma'

export interface OrderRequest {
  table: number
  name?: string
}

export class CreateOrderService {
  static async execute({ name, table }: OrderRequest) {
    const order = await prismaClient.order.create({
      data: {
        table: table,
        name: name,
      },
    })
    return order
  }
}
