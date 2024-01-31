import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { url } from "./apiUrl";

@Injectable({
    providedIn: "root"
})

export class TypeLigneService {
    constructor(private http:HttpClient) {}

    // Obtenir la liste des typeLigne 
    getAllTypesLigne(){
        return this.http.get(`${url}/types`);
    }

    // La liste des ligne du réseau 
    getTypesLigneReseau(){
        return this.http.get(`${url}/mestypes`);
    }

    // Ajouter un typeLigne 
    addTypeLigne(typeLigne:any){
        return this.http.post(`${url}/types`, typeLigne)
    }

    // Modifier un typeLigne  Pas encore bon
    updateTypeLigne(idTypeLigne: number, typeLigne:any){
        return this.http.put(`${url}/types/${idTypeLigne}`, typeLigne)
    }

    // Supprimer un typeLigne 
    deleteTypeLigne(idTypeLigne:number){
        return this.http.delete(`${url}/types/${idTypeLigne}`)
    }

    // Restaurer un typeLigne 
    restaureTypeLigne(idTypeLigne:number){
        return this.http.patch(`${url}/types/restaurer/${idTypeLigne}`, "")
    }

    // Supprimer définitivement un typeLigne 
    deleteDefinitif(idTypeLigne:any){
        return this.http.patch(`${url}/types/delete/${idTypeLigne}`, "")
    }

    // Liste des typeLigne dans la corbeille 
    gettypeLignexDeleted(){
        return this.http.get(`${url}/types/deleted/all`); 
    }

    // Vider la corbeille 
    emptyTrash(){
        return this.http.post(`${url}/types/empty-trash`, "")
    }
}