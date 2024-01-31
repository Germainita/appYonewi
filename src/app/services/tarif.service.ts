import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { url } from "./apiUrl";

@Injectable({
    providedIn: "root"
})

export class TarifService {
    constructor(private http:HttpClient) {}

    // Obtenir la liste des tarifs 
    getAllTarif(){
        return this.http.get(`${url}/tarifs`);
    }

    // La liste des Tarifs du réseau 
    getAllTarifReseau(){
        return this.http.get(`${url}/mestarifs`);
    }

    // Ajouter un Tarif 
    addTarif(tarif:any){
        return this.http.post(`${url}/tarifs`, tarif)
    }

    // Modifier un Tarif  
    updateTarif(idTarif: number, tarif:any){
        return this.http.patch(`${url}/tarifs/${idTarif}`, tarif)
    }

    // Supprimer un Tarif 
    deleteTarif(idTarif:number){
        return this.http.delete(`${url}/tarifs/${idTarif}`)
    }

    // Restaurer un Tarif 
    restaureTarif(idTarif:number){
        return this.http.patch(`${url}/tarifs/restaurer/${idTarif}`, "")
    }

    // Supprimer définitivement un Tarif 
    deleteDefinitif(idTarif:any){
        return this.http.patch(`${url}/tarifs/delete/${idTarif}`, "")
    }

    // Liste des Tarif dans la corbeille 
    getTarifDeleted(){
        return this.http.get(`${url}/tarifs/deleted/all`); 
    }

    // Vider la corbeille 
    emptyTrash(){
        return this.http.post(`${url}/tarifs/empty-trash`, "")
    }
}