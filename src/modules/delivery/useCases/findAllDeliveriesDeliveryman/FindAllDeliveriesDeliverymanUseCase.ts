import { prismaClient } from "../../../../database/prismaClient";

export class FindAllDeliveriesDeliverymanUseCase {
    async execute(id_deliveryman: string) {
      const result = await prismaClient.deliveryman.findMany({
        where: {
          id: id_deliveryman
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