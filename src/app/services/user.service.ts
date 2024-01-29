import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { url } from "./apiUrl";

@Injectable({
    providedIn: "root"
})

export class UserService {

    constructor(private http:HttpClient) {}

    // Obtenir la liste des utilisateur (Amin reseaux)
    getAllUsers(){
        return this.http.get<any[]>(`${url}/users`);
    }

    // Ajouter un administrateur utilisateur (Amin reseaux)
    addAdminReseau(user:any){
        return this.http.post(`${url}/users`, user)
    }

    // Modifier un utilisateur (Amin reseaux)
    updateAdminReseau(idUser: number, user:any){
        return this.http.put(`${url}/users/${idUser}`, user)
    }

    // Supprimer un utilisateur (Amin reseaux)
    deleteAdminReseau(idUser:number){
        return this.http.delete(`${url}/users/${idUser}`)
    }

    // Bloquér ou débloquer un adAdminReseau 
    bloqueAdminReseau(idReseau:number){
        return this.http.put(`${url}/users/etat/${idReseau}`, "")
    }

    // Restaurer un utilisateur (Amin reseaux)
    debloqueAdminReseau(idReseau:number){
        return this.http.put(`${url}/users/etat/${idReseau}`, "")
    }


}