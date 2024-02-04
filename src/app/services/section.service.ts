import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { url } from "./apiUrl";

@Injectable({
    providedIn: "root"
})

export class SectionService {
    constructor(private http:HttpClient) {}

    // Obtenir la liste des Sections 
    getAllSection(){
        return this.http.get(`${url}/sections`);
    }

    // La liste des Sections du réseau 
    getAllSectionReseau(){
        return this.http.get(`${url}/messections`);
    }

    // Ajouter un Section 
    addSection(section:any){
        return this.http.post(`${url}/sections`, section)
    }

    // Modifier un Section  
    updateSection(idSection: number, section:any){
        return this.http.patch(`${url}/sections/${idSection}`, section)
    }

    // Supprimer un Section 
    deleteSection(idSection:number){
        return this.http.delete(`${url}/sections/${idSection}`)
    }

    // Restaurer un Section 
    restaureSection(idSection:number){
        return this.http.patch(`${url}/sections/restaurer/${idSection}`, "")
    }

    // Supprimer définitivement un Section 
    deleteDefinitif(idSection:any){
        return this.http.patch(`${url}/sections/delete/${idSection}`, "")
    }

    // Liste des Section dans la corbeille 
    getSectionDeleted(){
        return this.http.get(`${url}/sections/deleted/all`); 
    }

    // Vider la corbeille 
    emptyTrash(){
        return this.http.post(`${url}/sections/empty-trash`, "")
    }
}