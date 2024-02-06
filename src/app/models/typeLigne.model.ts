export class TypeLigne {
    id?: number;
    nom!: string;
    reseau_id!: number;
    isActif: boolean = false;
    description!: string;
    created_at!:Date;
    created_by!:string;
    updated_at!:Date;
    updated_by!:string;
}