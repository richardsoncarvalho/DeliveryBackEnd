import { prismaClient } from "../../database/prismaClient";
import { hash } from 'bcrypt';

interface ICreateDelivery {
  username: string;
  password: string;
}

export default class CreateDeliverymanUseCase {
  async execute({ username, password }: ICreateDelivery) {
    const deliverymanExist = await prismaClient.deliveryman.findUnique({
      where: {
        username
      }
    })

    if (deliverymanExist) {
      throw new Error('Username alredy exist!')
    }

    const hashPassword = await hash(password, 10);

    const deliveryman = await prismaClient.deliveryman.create({
      data: {
        username,
        password: hashPassword
      }
    })

    return deliveryman;
  }
}