import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { url } from "./apiUrl";

@Injectable({
    providedIn: "root"
})

export class UserService {

    constructor(private http:HttpClient) {}

    // Obtenir la liste des utilisateur (Admin reseaux)
    getAllUsers(){
        return this.http.get<any[]>(`${url}/users`);
    }

    // Ajouter un administrateur utilisateur (Admin reseaux)
    addAdminReseau(user:any){
        return this.http.post(`${url}/users`, user)
    }

    // Modifier un utilisateur (Admin reseaux)
    updateAdminReseau(idUser: number, user:any){
        return this.http.post(`${url}/users/${idUser}`, user)
    }

    // Modifier un admin system 
    updateAdminSystem(user:any){
        return this.http.post(`${url}/updateadmin`, user)
    }

    // Supprimer un utilisateur (Admin reseaux)
    deleteAdminReseau(idUser:number, motif:any){
        return this.http.patch(`${url}/users/${idUser}`, motif)
    }

    // Bloquér ou débloquer un adAdminReseau 
    blockAdminReseau(idUser:number, motif:any){
        return this.http.patch(`${url}/users/etat/${idUser}`, motif)
    }

    // Restaurer un utilisateur (Admin reseaux)
    unblockAdminReseau(idUser:number){
        return this.http.patch(`${url}/users/etat/${idUser}`, "")
    }

    // Liste des utilisateurs bloqués 
    getAllUsersBlocked(){
        return this.http.get(`${url}/users/blocked`);
    }

    // Le profil de l'utilisateur connecté 
    getUserProfil(){
        return this.http.get<any[]>(`${url}/profile`);
    }

}