import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticateDeliveryman(
  request: Request,
  response: Response,
  next: NextFunction
) {

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: 'Token is missing'
    })
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, "cecf513cb4dfd2840864f1634c504335") as IPayload;
    request.id_deliveryman = sub;
    return next();
  } catch (error) {
    return response.status(401).json({
      message: 'Token invalid'
    })
  }
}