import { AuthResponseDto } from 'src/auth/dto/auth-response.dto';
import { ChannelEntity } from 'src/channel/channel.entity';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserResponseDto } from './dto/user-response.dto';
import { hash } from 'bcrypt';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @OneToMany(() => ChannelEntity, (c: ChannelEntity) => c.user, {
    eager: true
  })
  channels: ChannelEntity[];

  getAuthResponse(token: string): AuthResponseDto {
    return {
      id: this.id,
      token,
      login: this.login,
    };
  }

  getResponse(): UserResponseDto {
    return {
      id: this.id,
      login: this.login,
      channels: this.channels.map((c) => c.getResponse()),
    };
  }
}
