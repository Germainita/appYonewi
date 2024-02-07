import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'highcharts';
import { AuthService } from 'src/app/services/auth.service';
import { sweetAlertMessage } from 'src/app/services/sweetAlert/alert.service';
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

  verifMessageEmail: string = "";
  verifEmail: boolean = false;

  // iscorrectValues:boolean = true; // Si les identifiants sont incorrects

  // Déclaration des méthode 
  // Injection des services ath et route 
  constructor(private authService: AuthService, private route: Router ){}

  ngOnInit(): void { 
    if(!localStorage.getItem("userConnect")){
      localStorage.setItem("userConnect", JSON.stringify(""))
    }

    if(!localStorage.getItem("isUserConnected")){
      localStorage.setItem("isUserConnected", JSON.stringify(false))
    }
  }

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

            localStorage.setItem("isUserConnected", JSON.stringify(true));

            // On stocke les info de la requete dans notre localstorage
            localStorage.setItem("userConnect", JSON.stringify(response));
            this.email = "";
            this.password  = "";

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

  verifiEmailFunction(){
    this.verifEmail = false;
    if(!this.email){
      this.verifMessageEmail = "L'email est obligatoire"
    }else if (this.email.endsWith("@") || (!this.email.includes("."))){
      this.verifMessageEmail = "Le format de l'email est incorrect"
    } else{
      this.verifMessageEmail = "";
      this.verifEmail = true;
    }
    return this.verifEmail;
  }

  // Réinitialiser le mot de passe 
  resetPassword(){
    console.log(this.email);
    let isEmail = this.verifiEmailFunction()
    if (isEmail){
      let emailObjet = {
        email: this.email
      }
      this.authService.askResetPassword(emailObjet).subscribe(
        (data:any)=>{
          console.log(data);
          sweetAlertMessage("success", "", data.message);
        },
        (err:any)=>{
          console.log("Erreur",err);
          if(err.error.errors){
            this.verifMessageEmail = err.error.errors.email;
          }
        }
      )
    }
  }
}
