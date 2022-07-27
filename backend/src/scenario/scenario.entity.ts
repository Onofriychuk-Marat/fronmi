import { BehaviorEntity } from 'src/behavior/behavior.enttity';
import { ChannelEntity } from 'src/channel/channel.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  ItemScenarioResponseDto,
  ScenarioResponseDto,
} from './dto/scenario-response.dto';

@Entity('scenario')
export class ScenarioEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isActive: boolean;

  @OneToOne(() => BehaviorEntity)
  @JoinColumn()
  startBehavior: BehaviorEntity;

  @OneToMany(() => BehaviorEntity, (b: BehaviorEntity) => b.scenario, {
    eager: true,
  })
  behaviors: BehaviorEntity[];

  @Column({ nullable: true })
  channelId: number;

  @ManyToOne(() => ChannelEntity, (c: ChannelEntity) => c.scenarios, {
    // eager: true
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  channel: ChannelEntity;

  getItemResponse(): ItemScenarioResponseDto {
    return {
      id: this.id,
      name: this.name,
      isActive: this.isActive,
    };
  }

  getResponse(): ScenarioResponseDto {
    return {
      id: this.id,
      name: this.name,
      isActive: this.isActive,
      startBehavior: this.startBehavior?.getResponse(),
      behaviors: (this.behaviors || []).map((b) => b.getResponse()),
    };
  }
}
