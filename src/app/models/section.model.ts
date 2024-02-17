export class Section {
    // id: number = 0;
    num: string= "";
    depart: String= "";
    arrivee: String= "";
    messageInfo ?: string;
    prix: number= 0;
    isExact:boolean= true
}

export class SectionModel {
    id!: number;
    depart!: string;
    arrivee!: string;
    tarif_id!: string;
    ligne_id!: string;
    etat!: string;
    created_at!:Date;
    created_by!:string;
    updated_at!:Date;
    updated_by!:string;
    num: string= "";
    // debut: String= "";
    // fin: String= "";
    prix: number= 0;
    isExact:boolean= true
    messageInfo: string = "";
}