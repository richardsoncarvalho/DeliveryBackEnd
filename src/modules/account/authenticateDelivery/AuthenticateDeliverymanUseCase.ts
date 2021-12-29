import { prismaClient } from "../../../database/prismaClient";
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export default class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    const deliveryman = await prismaClient.deliveryman.findFirst({
      where: {
        username
      }
    })

    if (!deliveryman) {
      throw new Error('Username or password invalid')
    }

    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error('Username or password invalid')
    }

    const token = await sign({username}, 'cecf513cb4dfd2840864f1634c504335', {
      subject: deliveryman.id,
      expiresIn: '1d'
    });

    return {
      user: deliveryman.username,
      token
    };
  }
}