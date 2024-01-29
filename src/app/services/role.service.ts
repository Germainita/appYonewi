import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { url } from "./apiUrl";
import { Role } from "../models/role.model";

@Injectable({
    providedIn: "root"
})

export class RoleService {

    constructor(private http:HttpClient) {}

    // Obtenir la liste des roles 
    getAllRoles(){
        return this.http.get<any[]>(`${url}/roles`);
        // return this.http.get<Role[]>(`${url}/roles`);
    }

    // Ajouter un role 
    addRole(role:any){
        return this.http.post(`${url}/roles`, role)
    }

    // Modifier un role 
    updateRole(idRole: number, role:any){
        return this.http.put(`${url}/roles/${idRole}`, role)
    }

    // Supprimer un role 
    deleteRole(idRole:number){
        return this.http.delete(`${url}/roles/${idRole}`)
    }

    // Restaurer un role 
    restaureRole(idRole:number){
        return this.http.put(`${url}/roles/restaurer/${idRole}`, "")
    }

    // Liste des roles dans la corbeille 
    getRolesDeleted(){
        return this.http.get(`${url}/roles/deleted`); 
    }

    // Vider la corbeille 
    emptyTrash(){
        return this.http.post(`${url}/roles/empty-trash`, "")
    }

}