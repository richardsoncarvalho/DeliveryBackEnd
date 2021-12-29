import { Response, Request } from 'express';
import CreateDeliverymanUseCase from './CreateDeliverymanUseCase';

export class CreateDeliverymanController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;
    const createDeliverymanUseCase = new CreateDeliverymanUseCase()
    try {
      const result = await createDeliverymanUseCase.execute({ username, password });
      return response.status(201).json(result)
    } catch (e) {
      return response.status(400).json(e)
    }
  }
}
