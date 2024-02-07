import { Ligne } from "./ligne.model";

// import { Ligne } from "./ligne.model";

export class Reseau{
    id: number = 0;
    nom: string = "";
    lignes: Ligne[] = [];
    description: string ="";
    telephone!: string;
    email!: string;
    created_at!:Date;
    created_by!:string;
    updated_at!:Date;
    updated_by!:string;
}