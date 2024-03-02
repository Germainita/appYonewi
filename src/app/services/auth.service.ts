import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from './apiUrl';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { sweetAlertMessage } from './sweetAlert/alert.service';

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

  // Logout du backend 
  logoutAPI(){
    return this.http.get(`${url}/logout`)
  }

  logout() {
    this.logoutAPI().subscribe(
      (response:any) =>{
        // console.log(response)        
        this.isAuthenticated = false;
        this.router.navigate(['accueil']);
    
        // On vide le localStorage 
        localStorage.setItem("userConnect", JSON.stringify(""));
        localStorage.setItem("isAdminSystemConnected", JSON.stringify(false));
        localStorage.setItem("isAdminReseauConnected", JSON.stringify(false));
        localStorage.setItem('refreshCount', JSON.stringify(0));
      }
    )

  }

  // Réinitialiser mot de passe 
  askResetPassword(email:any){
    return this.http.post(`${url}/forget-password`, email);
  }

  // Rafraichir le token 
  // Methode pour rafraichir automatiquement le token après chaque 15mns
  deconnexionAutomatique() {
    setTimeout(() => {
      this.refreshToken(this.onSuccess, this.onError);
    }, 600000); // 10 secondes 
  }

  // Service pour rafraichir le token 
  refreshToken(onSuccess: Function, onError: Function) {
    // console.log("Function de rafraichessement");
    
    // Vérifier si le nombre de rafraîchissements a atteint la limite de 4
    const refreshCount = parseInt(localStorage.getItem('refreshCount') || '0');
    const userConnect = JSON.parse(localStorage.getItem('userConnect') || '');
    console.log(userConnect);
    
    if (refreshCount >= 15 && userConnect) {
      // Afficher SweetAlert pour proposer de rafraîchir le token ou se déconnecter
      this.showLogoutAlert();
      // console.log("Function de rafraichessement superieure à 1", refreshCount);
    } else if(!userConnect) {
      localStorage.setItem('refreshCount', (0).toString());
    } else{
      // Mettre à jour le nombre de rafraîchissements dans le localStorage
      localStorage.setItem('refreshCount', (refreshCount + 1).toString());
      // console.log("Function de rafraichessement inf à 1", refreshCount)
      // Réinitialiser le timer de déconnexion automatique
      this.deconnexionAutomatique();
    }

    // Effectuer le rafraîchissement du token
    return this.http.get<any>(`${url}/refresh`).subscribe(
      (response: any) => onSuccess(response),
      (error: any) => onError(error)
    );
  }

  onSuccess = (response: any) => {
    // Mettre à jour le token
    let userConnect = JSON.parse (localStorage.getItem("userConnect") || "");
    if(userConnect){
      // console.log(userConnect.token);
      userConnect.token = response.token;
      
      localStorage.setItem('userConnect', JSON.stringify(userConnect));
      // console.log('voici la reponse du changement du token', response.token);
      
    }
  };

  onError = (error: any) => {
    // console.log('Voici les erreurs du changement du token', error);
  };

  showLogoutAlert() {
    let refresh = 0;
    localStorage.setItem('refreshCount', JSON.stringify(refresh));
    this.logout();
    sweetAlertMessage("success", "Session expirée", "Veuillez vous reconnectez")

    // this.MessageSucces()
    // Swal.fire({
    //   title: 'Votre Session a expirer',
    //   text: 'Deconnecter vous ou rafraichissez votre token',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Oui! je raffraichie',
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire({
    //       title: 'non!',
    //       text: 'non!, je me deconnecte',
    //       icon: 'success',
    //     });
    //   }
    // });
  }

  // Si on supprime le tocken qu'est-ce qu'on fait 
  deconnexionSansToken(){
    let isUserConnectToken = false
    if (localStorage.getItem("userConnect")) {
      let userConnect = JSON.parse(localStorage.getItem("userConnect") || "");
      if(userConnect.token){
        isUserConnectToken = true;
      }
      // // console.log("Le token",userConnect.tocken);
    } else {
      isUserConnectToken = false
    }
    if(!isUserConnectToken){
      sweetAlertMessage("error", "Pas de token", "Vueillez vous reconnectez");
      this.logout();
      // localStorage.setItem('refreshCount', (0).toString());
    }
  }
}
