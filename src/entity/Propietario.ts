import { type } from "os";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Inmueble } from "./Inmueble";

@Entity()
export class Propietario{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    nombre:string;
    @Column()
    apellidos:string;
    @OneToMany(() => Inmueble, (inmueble) => inmueble.id)
    public inmueble: Inmueble[]
}