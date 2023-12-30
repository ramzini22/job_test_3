import { CustomBaseRepository } from "../../common/conf/base-repository";
import { AuthUserEntity } from "./entities/auth-user.entity";
import { EntityRepository } from "typeorm";
@EntityRepository(AuthUserEntity)
export class AuthUserRepository extends CustomBaseRepository<AuthUserEntity> {
  alias = "user";
}
