import { sign, verify } from "jsonwebtoken"
import { inject, injectable } from "tsyringe"
import auth from "../../../../config/auth"
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository"


interface ITokenResponse {
  token: string,
  refresh_token: string
}
interface IPayload {
 sub: string;
 email: string;
}

@injectable()
class RefreshTokenUseCase {
 constructor(
  @inject("UsersTokensRepository")
  private usersTokenRepository: IUsersTokensRepository,
  @inject("DayjsDateProvider")
  private dateProvider: IDateProvider
 ) {}

 async execute(token: string):Promise<ITokenResponse> {
  const { sub, email } = verify(token, auth.secret_refresh_token) as IPayload;

  const user_id = sub
  
  const userToken = await this.usersTokenRepository.findByUserIdAndRefreshToken(user_id, token)

  if(!userToken) {
   throw new AppError("Refresh Token does not exists!")
  }

  await this.usersTokenRepository.deleteById(userToken.id)

  const refresh_token = sign({ email }, auth.secret_refresh_token, {
   subject: sub,
   expiresIn: auth.expires_in_refresh_token,
 });

 const expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days);

 await this.usersTokenRepository.create({
  expires_date,
  refresh_token,
  user_id
 })
 
 const newToken = sign({}, auth.secret_token, {
  subject: user_id,
  expiresIn: auth.expires_in_token,
});

 
 return {
  refresh_token,
  token: newToken
}

 }
}

export { RefreshTokenUseCase }