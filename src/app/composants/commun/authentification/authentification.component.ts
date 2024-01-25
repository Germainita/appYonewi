import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
  // Déclaration des variables 
  isConnexion:boolean = true;
  isRein1: boolean = false;
  isRein2: boolean = false;

  // Variable pour les inputs 
  email: string = "";
  password: string = "";

  // Déclaration des méthode 
  // Injection des services ath et route 
  constructor(private authService: AuthService, private route: Router ){}

  ngOnInit(): void { }

  // Methodes pour voir le formulaire de connexion 
  showConnexion(){
    this.isConnexion = true;
    this.isRein1 = false;
    this.isRein2 = false;
  }

 // Methodes pour voir le formulaire de réinitialisation 
  showFirstRein(){
    this.isRein1 = true;
    this.isConnexion = false;
    this.isRein2 = false;
  }
 // Methodes pour voir le formulaire de réinitialisation suite 
  showSecondRein(){
    this.isRein2 = true;
    this.isRein1 = false;
    this.isConnexion = false;
  }

  // Methode de connexion 
  login(){
    if(this.email=="" || this.password==""){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Veillez remplir les champs',
        showConfirmButton: true,
      })
    } else{
      let user = {
        email: this.email,
        password: this.password
      };

      // On fait appel à la méthode login du service 
      this.authService.login(user, (response:any) =>{
        console.log(response);

        // On stocke les info de la requete dans notre localstorage
        localStorage.setItem("userConnect", JSON.stringify(response));


        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: true,
        }).then((result) =>{
          if(result.isConfirmed){
            this.route.navigate(['/dashbord']);
            this.authService.isAuthenticated = true;
            console.log (this.authService.isAuthenticated);
          }
        });
      }) 
    }
  }
}
