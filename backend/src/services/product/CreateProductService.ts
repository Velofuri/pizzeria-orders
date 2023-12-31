import prismaClient from '../../prisma'

export interface ProductsRequest {
  name: string
  price: string
  description: string
  banner: string
  category_id: string
}

export class CreateProductService {
  static async execute({ name, price, description, banner, category_id }: ProductsRequest) {
    const product = await prismaClient.product.create({
      data: {
        name: name,
        price: price,
        description: description,
        banner: banner,
        category_id: category_id,
      },
    })
    return product
  }
}
