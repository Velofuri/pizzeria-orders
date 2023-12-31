import prismaClient from '../../prisma'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface AuthRequest {
  email: string
  password: string
}

export class AuthUserService {
  static async execute({ email, password }: AuthRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    })

    if (!user) {
      throw new Error('User/Password incorrect')
    }

    const passwordMath = await compare(password, user.password)

    if (!passwordMath) {
      throw new Error('User/Password incorrect')
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in .env')
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d',
      }
    )

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    }
  }
}
