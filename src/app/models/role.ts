// export class Role {
//     id: number = 0;
//     nom: string = "";
//     createdAt: string = "";
// }

export class Role {
    id?: number;
    nom!: string;
    etat!: string;
    created_at!:Date;
    createdBy!:string;
    updated_at!:Date;
    updatedBy!:string;
}

// tabRoleFilter: RoleTest[] = [];
//   role = new RoleTest;
//   filterValue: string = "";