import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'highcharts';
import { AuthService } from 'src/app/services/auth.service';
import { sweetAlertMessage } from 'src/app/services/sweetAlert/alert.service';
import { validateEmail} from 'src/app/validation/validation';
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

  verifMessagePassword: string = "";
  verifPassword: boolean = false;

  // iscorrectValues:boolean = true; // Si les identifiants sont incorrects

  // Déclaration des méthode 
  // Injection des services ath et route 
  constructor(private authService: AuthService, private route: Router ){}


  ngOnInit(): void { 
    if(!localStorage.getItem("userConnect")){
      localStorage.setItem("userConnect", JSON.stringify(""))
    }

    // La connexion de l'admin system 
    if(!localStorage.getItem("isAdminSystemConnected")){
      localStorage.setItem("isAdminSystemConnected", JSON.stringify(false))
    }
    
    // La connexion de l'admin Reseau 
    if(!localStorage.getItem("isAdminReseauConnected")){
      localStorage.setItem("isAdminReseauConnected", JSON.stringify(false))
    }
  }

  // On vide tous les champs 
  viderChamps(){
    this.email = "";
    this.password = "";
    this.verifMessageEmail ="";
    this.verifMessagePassword = "";
  }

  // Methodes pour voir le formulaire de connexion 
  showConnexion(){
    this.isConnexion = true;
    this.isRein1 = false;
    this.isRein2 = false;
    this.viderChamps();
  }

 // Methodes pour voir le formulaire de réinitialisation 
  showFirstRein(){
    this.isRein1 = true;
    this.isConnexion = false;
    this.isRein2 = false;
    this.viderChamps();
  }

  // Vérification de l'email 
  verifEmailFunction(){
    this.verifEmail = validateEmail(this.email);
    if(!this.email){
      this.verifMessageEmail = "L'email est obligatoire"
    }else if(!this.verifEmail){
      this.verifMessageEmail = "Le format de l'email est incorrect";
    } else{
        this.verifMessageEmail = "";
        this.verifEmail = true;
      }
  }

  // Vérification du mot de passe 
  verifPasswordFunction(){
    this.verifPassword = false;
    if(!this.password){
      this.verifMessagePassword = "Le mot de passe est obligatoire"
    }
     else if(this.password.length < 5){
      this.verifMessagePassword = "La longueur du mot de passe doit etre supérieure à 5"
    }
     else{
      this.verifMessagePassword = "";
      this.verifPassword = true;
    }
    return this.verifPassword;
  }

  // Methode de connexion 
  login(){
    this.verifEmailFunction();
    this.verifPasswordFunction();
    if (this.verifEmail && this.verifPassword){
      let user = {
        email: this.email,
        password: this.password
      };

      let response:any
      this.authService.login(user).subscribe(
        (rep) =>{
          response = rep;
          // console.log(response);
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
    
            if(response.type == "admin"){ //Si l'administrateur system est en ligne on désactive l'admin réseau
              localStorage.setItem("isAdminSystemConnected", JSON.stringify(true));
              localStorage.setItem("isAdminReseauConnected", JSON.stringify(false));
            } else if(response.type == "utilisateur"){ //Si l'administrateur reseau est en ligne on désactive l'admin sytem
              localStorage.setItem("isAdminReseauConnected", JSON.stringify(true));
              localStorage.setItem("isAdminSystemConnected", JSON.stringify(false));
            }

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
          this.verifMessageEmail = this.verifMessagePassword = "Email ou mot de passe incorrect";
          console.log(error);
          // Swal.fire({
          //   position: 'center',
          //   icon: 'error',
          //   title: '',
          //   text: 'Les informations sont incorrectes',
          //   showConfirmButton: true,
          // })
        })
    }
  }

  

  // Réinitialiser le mot de passe 
  resetPassword(){
    this.verifEmailFunction();
    // console.log(this.email);
    if (this.verifEmail){
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
