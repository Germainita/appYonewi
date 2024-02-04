import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { url } from "./apiUrl";

@Injectable({
    providedIn: "root"
})

export class LigneService {
    constructor(private http:HttpClient) {}

    // Obtenir la liste des lignes 
    getAllLigne(){
        return this.http.get(`${url}/lignes`);
    }

    // La liste des lignes du réseau 
    getAllLigneReseau(){
        return this.http.get(`${url}/meslignes`);
    }

    // Ajouter un Ligne 
    addLigne(ligne:any){
        return this.http.post(`${url}/lignes`, ligne)
    }

    // Modifier un Ligne  
    updateLigne(idLigne: number, ligne:any){
        return this.http.patch(`${url}/lignes/${idLigne}`, ligne)
    }

    // Supprimer un Ligne 
    deleteLigne(idLigne:number){
        return this.http.delete(`${url}/lignes/${idLigne}`)
    }

    // Restaurer un Ligne 
    restaureLigne(idLigne:number){
        return this.http.patch(`${url}/lignes/restaurer/${idLigne}`, "")
    }

    // Supprimer définitivement un Ligne 
    deleteDefinitif(idLigne:any){
        return this.http.patch(`${url}/lignes/delete/${idLigne}`, "")
    }

    // Liste des Ligne dans la corbeille 
    getLigneDeleted(){
        // return this.http.get(`${url}/lignes/deleted/all`); 
        return this.http.get("http://127.0.0.1:8000/api/lignes/deleted/all"); 
    }

    // Vider la corbeille 
    emptyTrash(){
        return this.http.post(`${url}/lignes/empty-trash`, "")
    }
}