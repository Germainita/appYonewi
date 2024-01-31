import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { url } from "./apiUrl";

@Injectable({
    providedIn: "root"
})

export class AbonnementService {
    constructor(private http:HttpClient) {}

    // Obtenir la liste des abonnments 
    getAllAbonnement(){
        return this.http.get(`${url}/abonnements`);
    }

    // La liste des abonnements du réseau 
    getAllAbonnementReseau(){
        return this.http.get(`${url}/mesabonnements`);
    }

    // Ajouter un abonnement 
    addAbonnement(abonnement:any){
        return this.http.post(`${url}/abonnements`, abonnement)
    }

    // Modifier un abonnement  
    updateAbonnement(idAbonnement: number, abonnement:any){
        return this.http.patch(`${url}/abonnements/${idAbonnement}`, abonnement)
    }

    // Supprimer un abonnement 
    deleteAbonnement(idAbonnement:number){
        return this.http.delete(`${url}/abonnements/${idAbonnement}`)
    }

    // Restaurer un abonnement 
    restaureAbonnement(idAbonnement:number){
        return this.http.patch(`${url}/abonnements/restaurer/${idAbonnement}`, "")
    }

    // Supprimer définitivement un abonnement 
    deleteDefinitif(idAbonnement:any){
        return this.http.patch(`${url}/abonnements/delete/${idAbonnement}`, "")
    }

    // Liste des abonnement dans la corbeille 
    getAbonnementDeleted(){
        return this.http.get(`${url}/abonnements/deleted/all`); 
    }

    // Vider la corbeille 
    emptyTrash(){
        return this.http.post(`${url}/abonnements/empty-trash`, "")
    }
}