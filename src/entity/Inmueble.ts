import { type } from "os";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import { Propietario } from "./Propietario";

@Entity()
export class Inmueble{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    habitaciones:number;
    @Column({ type: "float" })
    banios:number;
    @Column()
    estacionamientos:number;
    @Column({ type: "float" })
    metrosCuadrados:number;
    @Column({ type: "float" })
    precio:number;
    @Column()
    imagenes:number;
    @Column()
    status:number; //1:renta, 2:compra, 3:ambos

    @Column()
    propietarioId:number
    
    @ManyToOne(()=>Propietario,(propietario:Propietario)=>propietario.inmueble)
    @JoinColumn({ name: 'propietarioId' })
    propietario:Propietario;
}