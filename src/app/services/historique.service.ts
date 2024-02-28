import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from './apiUrl';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { sweetAlertMessage } from './sweetAlert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {

    constructor(private http: HttpClient, private router: Router) {}

    //   lister les historiques 
    getAllHistorique(){
        return this.http.get(`${url}/historiques`);
    }

    // Lister les historiques par classes 
    getHistoriqueByClasse(classe:any){
        return this.http.get(`${url}/historiques/${classe}`);
    }

    // Lister les historiques par utilisateur 
    getHistoriqueById(idAdminReseau:any){
        return this.http.get(`${url}/historiques/${idAdminReseau}`);
    }
  
}
