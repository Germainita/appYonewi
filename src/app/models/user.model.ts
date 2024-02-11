export class User {
    id?: number;
    nom!: string;
    prenom!: string;
    adresse!: string;
    telephone!: string;
    role_id!: number;
    reseau_id!: number;
    password!: string;
    email!: string;
    image!: string;
    password_confirmation!: string;
    etat!: string;
    motif!: string;
    created_at!:Date;
    created_by!:string;
    updated_at!:Date;
    updated_by!:string;
}

export class UserModif {
    id?: number;
    nom!: string;
    prenom!: string;
    adresse!: string;
    telephone!: string;
    reseau_id!: number;
    password!: string;
    email!: string;
    image!: string;
}