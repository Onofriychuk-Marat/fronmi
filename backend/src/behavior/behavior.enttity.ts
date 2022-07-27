import { ScenarioEntity } from 'src/scenario/scenario.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ButtonBehaviorEntity } from './behavior-button.entity';
import {
  BehaviorResponseDto,
} from './dto/behavior-respnse.dto';



@Entity({ name: 'behavior' })
export class BehaviorEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @Column()
  isInlineButton: boolean;

  @Column()
  isStart: boolean;

  @Column()
  message: string;

  @OneToMany(() => ButtonBehaviorEntity, (b: ButtonBehaviorEntity) => b.behavior, {
    eager: true
  })
  buttons: ButtonBehaviorEntity[];

  @ManyToOne(() => ScenarioEntity, (s: ScenarioEntity) => s.behaviors, {
    onDelete: 'CASCADE',
  })
  scenario: ScenarioEntity;

  getResponse(): BehaviorResponseDto {
    return {
      ...this,
      buttons: (this.buttons || []).map((b) => b.getResponse()),
    };
  }
}
