import prismaClient from '../../prisma'

export class ListCategoryService {
  static async execute() {
    const category = await prismaClient.category.findMany({
      select: {
        id: true,
        name: true,
      },
    })
    return category
  }
}
