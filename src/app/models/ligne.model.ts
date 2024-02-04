import { Section } from "./section.model";

export class Ligne {
    id!: number;
    nom!: string;
    lieuDepart!: string;
    lieuArrivee!: string;
    type_id!: string;
    etat!: string;
    created_at!:Date;
    created_by!:string;
    updated_at!:Date;
    updated_by!:string;

    sections: any[] = [];
    itineraires: any [] = [];       
}                           