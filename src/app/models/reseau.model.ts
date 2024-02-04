import { Ligne } from "./ligne";

// import { Ligne } from "./ligne.model";

export class Reseau{
    id: number = 0;
    nom: string = "";
    lignes: Ligne[] = [];
    description: string ="";
    created_at!:Date;
    created_by!:string;
    updated_at!:Date;
    updated_by!:string;
}