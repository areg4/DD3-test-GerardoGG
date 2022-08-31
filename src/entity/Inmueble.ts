import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import { Propietario } from "./Propietario";

@Entity()
export class Inmueble{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    habitaciones:number;
    
    @Column("double")
    banios:number;
    
    @Column("double")
    estacionamientos:number;
    
    @Column("double")
    metrosCuadrados:number;
    
    @Column("double")
    precio:number;
    
    @Column()
    imagenes:number;
    
    @Column()
    status:number; //1:renta, 2:compra, 3:ambos

    @Column()
    propietarioId:number
    
    @ManyToOne(() => Propietario, (inmueble) => inmueble.id)
    @JoinColumn()
    propietario:Propietario;
}