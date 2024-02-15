import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'highcharts';
import { AuthService } from 'src/app/services/auth.service';
import { sweetAlertMessage } from 'src/app/services/sweetAlert/alert.service';
import { verifiEmailFunction } from 'src/app/validation/validation';
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

    // Connexion global à enlever 
    if(!localStorage.getItem("isUserConnected")){
      localStorage.setItem("isUserConnected", JSON.stringify(false))
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

  // Vérification de l'email 
  verifEmailFunctionTest(){
    verifiEmailFunction(this.email, this.verifEmail, this.verifMessageEmail);
  }

  verifiEmailFunction(){
    this.verifEmail = this.validateEmail(this.email);
    if(!this.email){
      this.verifMessageEmail = "L'email est obligatoire"
    }else if(!this.verifEmail){
      this.verifMessageEmail = "Le format de l'email est incorrect";
    } else{
        this.verifMessageEmail = "";
        this.verifEmail = true;
      }
  }

  validateEmail(email: string): boolean {
    const emailRegex=/^[A-Za-z]+[A-Za-z0-9\._%+-]+@[A-Za-z0-9\.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  }

  verifPasswordFunction(){
    this.verifPassword = false;
    if(!this.password){
      this.verifMessagePassword = "Le mot de passe est obligatoire"
    } else{
      this.verifMessagePassword = "";
      this.verifPassword = true;
    }
    return this.verifPassword;
  }

  // Réinitialiser le mot de passe 
  resetPassword(){
    console.log(this.email);
    verifiEmailFunction(this.email, this.verifEmail, this.verifMessageEmail);
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
