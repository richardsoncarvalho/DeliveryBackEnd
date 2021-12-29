import { prismaClient } from "../../../database/prismaClient";
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute ({ username, password }: IAuthenticateClient) {
    const client = await prismaClient.clients.findFirst({
      where: {
        username
      }
    })

    if (!client) {
      throw new Error('Username or password invalid')
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error('Username or password invalid')
    }

    const token = await sign({username}, 'cecf513cb4dfd2840864f1634c504335', {
      subject: client.id,
      expiresIn: "1d"
    })

    return {
      user: client.username,
      token
    };
  }
}