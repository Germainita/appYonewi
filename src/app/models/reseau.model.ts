import { Ligne } from "./ligne";

// import { Ligne } from "./ligne.model";

export class Reseau{
    id: number = 0;
    nom: string = "";
    lignes: Ligne[] = [];
    description: string ="";
}