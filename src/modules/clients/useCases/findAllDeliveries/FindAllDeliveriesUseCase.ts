import { prismaClient } from "../../../../database/prismaClient";

export class FindAllDeliveriesUseCase {
  async execute(id_client: string) {
    const result = await prismaClient.clients.findMany({
      where: {
        id: id_client
      }, 
      select: {
        id: true,
        username: true,
        deliveries: true
      }
    })

    return result;
  }
}