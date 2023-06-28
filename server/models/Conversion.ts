import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";

@Entity("conversions")
export class Conversion extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "double",
    nullable: false,
  })
  original_amount!: number;

  @Column({
    type: "date",
    nullable: false,
  })
  date_conversion!: Date;

  @Column({
    type: "double",
    nullable: false,
  })
  uf!: number;

  @Column({
    type:"float",
    nullable: false,
  })
  conversion_amount!: number;

  @Column({ type: "int", nullable: false })
  usuario_id!: number;

  @CreateDateColumn({ name: "created_at" })
  created_at!: Date;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: "usuario_id" })
  usuario!: Usuario;


}