import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { url } from "./apiUrl";

@Injectable({
    providedIn: "root"
})

export class ContactService{

    constructor(private http:HttpClient) {}

    // Obtenir la liste des inscrits à la Contact
    getAllContacts(){
        return this.http.get<any[]>(`${url}/contacts`);
    }

    // Ajouter contact
    addContact(user:any){
        return this.http.post(`${url}/contacts`, user)
    }
}