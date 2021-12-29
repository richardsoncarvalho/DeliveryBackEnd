import { Request, Response } from "express";
import { CreateClientsUseCase } from './CreateClientsUseCase';

export class CreateClientController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const createClientsUseCase = new CreateClientsUseCase();
    try {
      const result = await createClientsUseCase.execute({ username, password });
      return response.status(201).json(result)
    } catch (e) {
      return response.status(404).json(e)
    }

  }
}