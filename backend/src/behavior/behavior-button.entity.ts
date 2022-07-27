import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { BehaviorEntity } from "./behavior.enttity";
import { ButtonBehaviorResponseDto } from "./dto/behavior-respnse.dto";

@Entity('buttonBehavior')
export class ButtonBehaviorEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nextNumber: number;

  @Column()
  text: string;

  @Column({ default: '' })
  link?: string;

  @ManyToOne(() => BehaviorEntity, (b: BehaviorEntity) => b.buttons, {
    onDelete: 'CASCADE',
  })
  behavior: BehaviorEntity;

  getResponse(): ButtonBehaviorResponseDto {
    return { ...this };
  }
}
