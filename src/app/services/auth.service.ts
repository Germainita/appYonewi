import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from './apiUrl';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  // Variable superglobale pour l'authentification 
  isAuthenticated = false;

  login(user:any){
    return this.http.post(`${url}/login`, user)
    // return this.http.post(`${url}/login`, user).subscribe((reponse:any) => onSuccess(reponse))
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['accueil']);

    // On vide le localStorage 
    localStorage.setItem("userConnect", JSON.stringify(""));

    localStorage.setItem("isUserConnected", JSON.stringify(false));
  }
}
