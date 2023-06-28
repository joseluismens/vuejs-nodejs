import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Conversion } from "./Conversion";
import * as bcrypt from "bcryptjs";
import { Rol } from "./Rol";

@Entity("usuario")
export class Usuario extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!:number;
    @Column({
        type: "varchar",
        nullable: false,
      })
      fullname!: string;
    
      @Column({
        type: "varchar",
        nullable: false,
      })
      email!: string;
    
      @Column({type:"varchar",
        nullable:false,
        unique:true})
      password!: string;
    
    
      @OneToMany(() => Conversion, conversion => conversion.usuario)
      conversions!: Conversion[];

      @CreateDateColumn({ name: "created_at" })
      created_at!: Date;

     
      @ManyToMany(() => Rol, rol => rol.usuarios)
      @JoinTable()
      roles!: Rol[];


      // @OneToMany(() => UsuarioRol, usuarioRol => usuarioRol.usuario, {
      //   cascade: true,
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      // })
      // @JoinColumn({ referencedColumnName: 'usuario_id' })
      // usuarioRoles!: UsuarioRol[];

      

      hashPassword(): void {
        const hash = bcrypt.hashSync(this.password, 8);
        
        this.password = hash;
      }
    
}



