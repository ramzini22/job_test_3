import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";
import { CustomBaseEntity } from "../../../common/conf/custom-base.entity";
import { AuthUserEntityType } from "../types/auth-user-entity.type";

@Entity("auth_user")
export class AuthUserEntity extends CustomBaseEntity {
  @Column({ name: "login", type: "text" })
  private readonly login: string;

  @Column({ name: "fingerprint", type: "text" })
  private readonly fingerprint: string;

  @Column({ name: "ip_address", type: "int" })
  private readonly ipAddress: number;

  @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
  private updatedAt: Date;

  @CreateDateColumn({ type: "timestamp", name: "created_at" })
  private createdAt: Date;
  constructor({ id, login, fingerprint, ipAddress }: AuthUserEntityType = {}) {
    super(id);
    this.login = login;
    this.fingerprint = fingerprint;
    this.ipAddress = ipAddress;
  }

  public getLogin(): string {
    return this.login;
  }

  public getFingerprint(): string {
    return this.fingerprint;
  }

  public getIpAddress(): number {
    return this.ipAddress;
  }
}
