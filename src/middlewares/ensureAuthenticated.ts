import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
 sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing");
  }
  console.log("auth:"+authHeader)
  // como por padrao do Bearer o authenticator vem Bearer 318237128937192874
  // para pegar só o authenticator antes da vircula é a posição 0 e depois é a posição 1
  const [, token] = authHeader.split(" ");
  try {
    // se der certo o verification ele mantem no try se não vai para o catch
    const { sub: user_id } = verify(token, "39536097be8c345051a36da0e8816119") as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id)

    if(!user) {
     throw new Error("User does not exists!")
    }

    next();
  } catch {
   console.log("token:" + token)
    throw new Error("Invalid token!");
  }
}