import { ScenarioEntity } from 'src/scenario/scenario.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import {
  ChannelEmptyResponseDto,
  ChannelResponseDto,
} from './dto/channel-response.dto';

@Entity('channel')
export class ChannelEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  name: 'telegram' | 'watsapp' | 'vk';

  @Column()
  keyApi: string;

  @Column()
  isConnected: boolean;

  @Column()
  icon: string;

  @OneToMany(() => ScenarioEntity, (s: ScenarioEntity) => s.channel , {
    eager: true
  })
  scenarios: ScenarioEntity[];

  @ManyToOne(() => UserEntity, (u: UserEntity) => u.channels, {
    // eager: true
  })
  user: UserEntity;

  getEmptyResponse(): ChannelEmptyResponseDto {
    return {
      id: this.id,
      name: this.name,
      isConnected: this.isConnected,
      icon: this.icon,
    };
  }

  getResponse(): ChannelResponseDto {
    return {
      ...this,
      scenarios: this.scenarios.map((s) => s.getResponse()),
    };
  }
}
