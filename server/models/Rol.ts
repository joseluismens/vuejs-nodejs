import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Conversion } from "./Conversion";
import * as bcrypt from "bcryptjs";
import { Usuario } from "./Usuario";

@Entity("rol")
export class Rol extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!:number;

    @Column({
        type: "varchar",
        nullable: false,
      })
      nombre!: string;


      @ManyToMany(() => Usuario, usuario => usuario.roles)
      usuarios!: Usuario[];
     
    
}



