import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../../infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";



class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
 usersTokens: UserTokens[] = []


 async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userTokens = new UserTokens();

  Object.assign(userTokens, {
   expires_date,
    refresh_token,
     user_id
  })
  this.usersTokens.push(userTokens)

  return userTokens;
 }
 async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
  const userTokens = this.usersTokens.find(ut => ut.user_id === user_id && ut.refresh_token === refresh_token) 
  return userTokens;
 }
 async deleteById(id: string): Promise<void> {
  const userToken = this.usersTokens.find(ut => ut.id === id)
  //remove pelo index
  this.usersTokens.splice(
   this.usersTokens.indexOf(userToken)
  )
 }
 async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
  const userTokens = this.usersTokens.find(ut => ut.refresh_token === refresh_token) 
  return userTokens;
 }

}

export { UsersTokensRepositoryInMemory }