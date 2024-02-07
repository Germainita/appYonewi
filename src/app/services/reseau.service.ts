import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { url } from "./apiUrl";

@Injectable({
    providedIn: "root"
})

export class ReseauService {

    constructor(private http:HttpClient) {}

    // Obtenir la liste des reseau 
    getAllReseaux(){
        return this.http.get<any[]>(`${url}/reseaus`);
    }

    // Ajouter un Reseau 
    addReseau(reseau:any){
        return this.http.post(`${url}/reseaus`, reseau)
    }

    // Modifier un Reseau 
    updateReseau(idReseau: number, reseau:any){
        return this.http.put(`${url}/reseaus/${idReseau}`, reseau)
    }

    // Modifier les détails d'un réseau par l'admin réseau 
    updateDetailsReseau(reseau:any){
        return this.http.patch(`${url}/reseau/details/`, reseau)
    }

    // Supprimer un Reseau 
    deleteReseau(idReseau:number){
        return this.http.delete(`${url}/reseaus/${idReseau}`)
    }

    // Restaurer un Reseau 
    restaureReseau(idReseau:number){
        return this.http.patch(`${url}/reseaus/restaurer/${idReseau}`, "")
    }

    // Supprimer définitivement un reseau 
    deleteDefinitif(idReseau:any){
        return this.http.patch(`${url}/reseaus/delete/${idReseau}`, "")
    }

    // Liste des Reseaux dans la corbeille 
    getReseauxDeleted(){
        return this.http.get(`${url}/reseaus/deleted/all`); 
    }

    // Vider la corbeille 
    emptyTrash(){
        return this.http.post(`${url}/reseaus/empty-trash`, "")
    }

}