import { hash } from "bcrypt";
import { prismaClient } from "../../../../database/prismaClient";

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientsUseCase {
  async execute({ username, password }: ICreateClient) {
    const clientExists = await prismaClient.clients.findUnique({
      where: {
        username
      }
    })

    if (clientExists) {
      throw new Error('Username alredy exist!')
    }

    const hashPassword = await hash(password, 10);

    const client = await prismaClient.clients.create({
      data: {
        username,
        password: hashPassword
      }
    })

    return client
  }
}