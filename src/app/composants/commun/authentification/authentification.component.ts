import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'highcharts';
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

  // iscorrectValues:boolean = true; // Si les identifiants sont incorrects

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
        title: '',
        text: 'Veillez remplir les champs',
        showConfirmButton: true,
      })
    } else if (this.email.endsWith("@") || (!this.email.includes("."))) // Vérifie si l'email se termine juste par @
    {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '',
        text: 'Veillez saissir un email valide',
        showConfirmButton: true,
      })
    }
    else{
      let user = {
        email: this.email,
        password: this.password
      };

      // On fait appel à la méthode login du service 
      // this.authService.login(user, (response:any) =>{
      //   console.log(response);

      //   if (response.statut){
      //     // On stocke les info de la requete dans notre localstorage
      //     localStorage.setItem("userConnect", JSON.stringify(response));
  
      //     Swal.fire({
      //       position: 'center',
      //       icon: 'success',
      //       title: response.message,
      //       showConfirmButton: true,
      //     }).then((result) =>{
      //       if(result.isConfirmed){
      //         this.route.navigate(['/dashbord']);
      //         this.authService.isAuthenticated = true;
      //         console.log (this.authService.isAuthenticated);
      //       }
      //     });
      //   } else{
      //     Swal.fire({
      //       position: 'center',
      //       icon: 'error',
      //       title: response.error.email,
      //       showConfirmButton: true,
      //     });
      //   }

      // }) 

      let response:any
      this.authService.login(user).subscribe(
        (rep) =>{
          response = rep;
          console.log(response);
          if (response.status){
            // console.log ("C'est bon");
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: "",
              text: response.message,
              showConfirmButton: true,
            });
            
            this.route.navigate(['/dashbord']); // Redirection vers le dashbord concerné 
            this.authService.isAuthenticated = true; // Définit la variable isAuthicated à true pour la guard

            // On stocke les info de la requete dans notre localstorage
            localStorage.setItem("userConnect", JSON.stringify(response));

            // this.iscorrectValues = true; //Les données fournies sont correctes

          }else {
            console.log( "L'adresse email est incorrecte");
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '',
              text: 'Veillez saissir un email valide',
              showConfirmButton: true,
            })
          }
        },
        (error) =>{
          // this.iscorrectValues = false;
          console.log(error);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '',
            text: 'Les informations sont incorrectes',
            showConfirmButton: true,
          })
        })
    }
  }
}
