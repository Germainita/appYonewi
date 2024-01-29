import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { url } from "./apiUrl";

@Injectable({
    providedIn: "root"
})

export class NewsletterService{

    constructor(private http:HttpClient) {}

    // Obtenir la liste des inscrits à la newsletter
    getAllUsersNewsletter(){
        return this.http.get<any[]>(`${url}/newsletter/all`);
    }

    // souscricre à la newsletter
    inscriptionNewsletter(user:any){
        return this.http.post(`${url}/newsletter`, user)
    }
}