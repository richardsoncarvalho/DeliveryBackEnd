import { prismaClient } from "../../../../database/prismaClient";

interface ICreateDelivery {
  item_name: string;
  id_client: string;
}

export class CreateDeliveryUseCase {
  async execute({ item_name, id_client }: ICreateDelivery) {
    const result = await prismaClient.deliveries.create({
      data: {
        item_name,
        id_client
      }
    })

    return result;
  }
}