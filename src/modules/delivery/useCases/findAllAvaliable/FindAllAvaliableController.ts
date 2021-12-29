
import { FindAllAvaliableUseCase } from './FindAllAvaliableUseCase';
import { Request, Response } from 'express';

export class FindAllAvaliableController {
  async handle(request: Request, response: Response) {
    const findAllAvaliableUseCase = new FindAllAvaliableUseCase();

    const result = await findAllAvaliableUseCase.execute();

    return response.json(result);
  }
}