import { prismaClient } from "../../../../database/prismaClient";

export class FindAllAvaliableUseCase {
  async execute() {
    const findAllWithoutEndDate = await prismaClient.deliveries.findMany({
      where: {
        end_at: null,
        id_deliveryman: null
      }
    })

    return findAllWithoutEndDate;
  }
}