import { Component, OnInit } from '@angular/core';
import { Reseau } from 'src/app/models/reseau.model';
import { Role } from 'src/app/models/role.model';
import { User, UserModif } from 'src/app/models/user.model';
import { urlImage } from 'src/app/services/apiUrl';
import { ReseauService } from 'src/app/services/reseau.service';
import { RoleService } from 'src/app/services/role.service';
import { sweetAlertMessage, sweetMessageConfirm } from 'src/app/services/sweetAlert/alert.service';
import { UserService } from 'src/app/services/user.service';
import { validateEmail, validateField, validateLengthField, validatePassword, validatePhone } from 'src/app/validation/validation';

import { Loading, Notify } from 'notiflix';


@Component({
  selector: 'app-gestion-profil',
  templateUrl: './gestion-profil.component.html',
  styleUrls: ['./gestion-profil.component.css']
})
export class GestionProfilComponent implements OnInit{
  // Déclaration des variables 
  isInfo:boolean = true;
  isModifProfil:boolean = false;
  isModifMdp:boolean = false


  // Le tableau des role 
  tabRole : Role[] = [];
  
  // le tableau des reseau 
  tabReseaux: Reseau[] = [];
  reseauName:string = "";

  userConnect:any;
  infosUser: any;

  password:string = "";
  passwordNew:string = "";
  passwordConf: string = "";

  // Attributs pour la modification 
  emailModif: string = "";
  adresseModif: string = "";
  telephonModif: any
  image: any = "";


  imageUserConnected: any;

  // Vérification
  // Changer infos profils 
  emailMessage : string = "";
  isEmailValid: boolean = false;

  phoneMessage: string =  "";
  isPhoneValid: boolean = false;

  adresseMessage : string = "";
  isAdresseValid: boolean = false;

  // Pour changer mot de passe 
  isOldPassword: boolean = false;
  passworldOldMessage: string = "";

  passwordMessage: string ="";
  isPasswordValid: boolean = false;

  isPasswodConform: boolean = false;
  passwordConformMessage: string = "";

  // Afficher ou cacher le mot de passe old
  hidePassword: boolean = true;
  // Afficher ou cacher le mot de passe new
  hidePasswordNew: boolean = true;
  // Afficher ou cacher le mot de passe conf
  hidePasswordConf: boolean = true;

  // Déclarations des méthodes 
  constructor( private roleService: RoleService, private reseauService:ReseauService, private userService:UserService){}
  ngOnInit() {
    this.infosUser = JSON.parse(localStorage.getItem("userConnect")) || "";
    this.userProfilInfos();

    // // console.log(this.infosUser);
    
    // Liste des roles 
    this.roleService.getAllRoles().subscribe(
      (data: any) =>{
        // console.log(data);
        // this.tabRole = data.roles.filter((role:any) => role.etat == "actif");
        // // console.log(this.tabRole);
      }
    );
    
  }

  // Les infos de l'utilisateur 
  userProfilInfos(){
    Loading.dots();
    // Le profil de l'utilisateur connecté 
    this.userService.getUserProfil().subscribe(
      (resp:any) =>{
        // console.log(resp);
        this.userConnect = resp.user;

        // L'image de l'utilisateur connecter 
        if (this.userConnect.image){
          this.imageUserConnected = `${urlImage}${this.userConnect.image}`;
        }
        // // console.log(this.imageUserConnected);
        

        // Liste des réseaux 
        this.reseauService.getAllReseaux().subscribe(
          (data:any) =>{
            this.tabReseaux  = data.reseaux;
            let reseauFound = this.tabReseaux.find((elemt:any) => (elemt.id == this.userConnect.reseau_id) )
            if (reseauFound){
              this.reseauName = reseauFound.nom;
              
            }
          },
          (error) =>{
            // console.log (error)
          }
        )
        Loading.remove();
      }
    )
  }

  showInfosProfil(){
    this.isInfo= true;
    this.isModifProfil= false;
    this.isModifMdp= false;
  }

  showModifProfil(){
    this.isInfo= false;
    this.isModifProfil= true;
    this.isModifMdp= false;
    this.chargerInfos();
  }

  showModifMdp(){
    this.isInfo= false;
    this.isModifProfil= false;
    this.isModifMdp= true
  }

  // Mettre à jour son profil
  chargerInfos(){
    this.emailModif = this.userConnect.email;
    this.telephonModif = this.userConnect.telephone;
    this.adresseModif = this.userConnect.adresse;
  }

  // Vérification des infos 

  verifEmailModif(emailModif:any){
    this.emailMessage = "";
    if(emailModif){
      this.isEmailValid = validateEmail(emailModif);
      if(!this.isEmailValid){
        this.emailMessage = "Le format de l'email est incorrect";
        this.isEmailValid = false;
      } else{
        this.emailMessage = "";
        this.isEmailValid = true;
      }

    }
  }

  // telephoneModif: string = "";
  verifPhoneModif(phone:any){
    this.phoneMessage = "";
    if(this.telephonModif){
      let phoneFormatValidate = validatePhone(phone);
      if(!phone){
        this.phoneMessage = "Le numéro de telephone est obligatoire";
      }else if(!phoneFormatValidate){
        this.phoneMessage = "Le format est incorrect";
      } else {
        this.phoneMessage = "";
        this.isPhoneValid = true;
      }

    }
  }

  // Vérification de l'adresse 
  verifAdresseFunction(adresse:any){
    this.adresseMessage = "";

    let adresseLengthvalidate = validateLengthField(adresse, 3)
    let format = validateField(adresse);
    if(!adresse){
      this.adresseMessage = "L'adresse est obligatoire";
    } else if(!format) {
      this.adresseMessage = "L'adresse ne doit pas commencer par un espace";
    }
    else if (!adresseLengthvalidate) {
      this.adresseMessage = "La longueur doit être supérieur ou égale à 3";
    } else {
      this.adresseMessage = "";
      this.isAdresseValid = true;
    }
  }

  // Mis à jour admin réseau 
  updateAdminReseau(id:number, objectAdminReseau:any){
    this.userService.updateAdminReseau(id, objectAdminReseau).subscribe(
      (data:any) =>{
        // console.log(data);
        if(data.status){
          // console.log(data.message);
          sweetAlertMessage("success", "", data.message);
          this.userProfilInfos();
          // this.viderChamps();
          // this.showInfosProfil();
        }
        // else if(!data.success){
        //   if(data.errors.email){
        //     sweetAlertMessage("error", "", data.errors.email);
        //   }
        //   if(data.errors.password){
        //     sweetAlertMessage("error", "", data.errors.password);
        //   }
        //   if(data.errors.telephone){
        //     sweetAlertMessage("error", "", data.errors.telephone);
        //   }
        // } 
        // sweetAlertMessage("success", "", data.message);
        // this.viderChamps()
      },
      (err) =>{
        // console.log(err);
        // si l'email existe déjà 
        if(err.error.errors.email){
          this.emailMessage = err.error.errors.email[0];
        }         
        if(err.error.errors.telephone){
          this.phoneMessage = err.error.errors.telephone[0];
        } 
        
      }
    )
  }

  // Mis à jour admin system 
  updateAdminSystem(objectAdminSystem:any){
    this.userService.updateAdminSystem(objectAdminSystem).subscribe(
      (data:any) =>{
        // console.log(data);
        // // console.log(data.message);
        sweetAlertMessage("success", "", data.message);
        this.userProfilInfos();
        // this.viderChamps();
        // this.showInfosProfil();
        // if(data.status){
        // }
        // else if(!data.success){
        //   if(data.errors.email){
        //     sweetAlertMessage("error", "", data.errors.email);
        //   }
        //   if(data.errors.password){
        //     sweetAlertMessage("error", "", data.errors.password);
        //   }
        //   if(data.errors.telephone){
        //     sweetAlertMessage("error", "", data.errors.telephone);
        //   }
        // } 
        // sweetAlertMessage("success", "", data.message);
        // this.viderChamps()
      },
      (err) =>{
        // console.log(err);
        // si l'email existe déjà 
        if(err.error.errors.email){
          this.emailMessage = err.error.errors.email[0];
        }         
        if(err.error.errors.telephone){
          this.phoneMessage = err.error.errors.telephone[0];
        } 
        
      }
    )
  }

  // Vider les champs apres la modification 
  viderChamps(){
    this.emailModif = "";
    this.telephonModif = "";
    this.userConnect.adresse = "";
    this.passwordConf = "";
    this.password ="";
    this.passwordNew = "";    
  }

  // Méthodes appelées lors du clic pour les admins reseau et system
  // Mettre à jour le profil.
  modiferProfil(){
    
    let dataModif = new UserModif
    dataModif.id = this.userConnect.id;
    dataModif.nom = this.userConnect.nom;
    dataModif.prenom = this.userConnect.prenom;

    if(this.emailModif && this.emailModif != this.userConnect.email){ //S'il change l'email
      dataModif.email = this.emailModif
    }
    if (this.telephonModif  && this.telephonModif != this.userConnect.telephone){ // Si le téléphone change
      dataModif.telephone = this.telephonModif ;
    }
    
    
    // Si c'est un admin réseau on doit prendre l'adresse et le réseau sinon on ne prend que les infos restantes
    if(this.infosUser.type != "admin"){
      dataModif.adresse = this.userConnect.adresse;
      dataModif.reseau_id = this.userConnect.reseau_id;
      this.verifAdresseFunction(dataModif.adresse);
    }

    this.verifEmailModif(this.emailModif);
    this.verifPhoneModif(this.telephonModif);

    // Si c'est un admin réseau  
    if(this.isEmailValid && this.isPhoneValid && this.isAdresseValid && (this.infosUser.type != "admin")) {
      // // console.log(dataModif);
      sweetMessageConfirm("Vous allez modifier ce compte", "Oui je modifie").then( (result) =>{      
        if(result.isConfirmed ){
          // this.userService.updateAdminReseau(dataModif.id, dataModif).subscribe(
          //   (data:any) =>{
          //     // console.log(data);
          //     if(data.status){
          //       // // console.log(data.message);
          //       sweetAlertMessage("success", "", data.message);
          //       this.userProfilInfos();
          //       this.viderChamps();
          //       this.showInfosProfil();
          //     }
          //     // else if(!data.success){
          //     //   if(data.errors.email){
          //     //     sweetAlertMessage("error", "", data.errors.email);
          //     //   }
          //     //   if(data.errors.password){
          //     //     sweetAlertMessage("error", "", data.errors.password);
          //     //   }
          //     //   if(data.errors.telephone){
          //     //     sweetAlertMessage("error", "", data.errors.telephone);
          //     //   }
          //     // } 
          //     // sweetAlertMessage("success", "", data.message);
          //     // this.viderChamps()
          //   },
          //   (err) =>{
          //     // console.log(err);
          //     // si l'email existe déjà 
          //     if(err.error.errors.email){
          //       this.emailMessage = err.error.errors.email[0];
          //     }         
          //     if(err.error.errors.telephone){
          //       this.phoneMessage = err.error.errors.telephone[0];
          //     } 
              
          //   }
          // )
          this.updateAdminReseau(dataModif.id, dataModif);
          this.viderChamps();
        }

      })
    }
    // Si c'est l'admin system 
    else if (this.isEmailValid && this.isPhoneValid && (this.infosUser.type == "admin")){
      sweetMessageConfirm("Vous allez modifier ce compte", "Oui je modifie").then( (result) =>{      
        if(result.isConfirmed ){
          this.updateAdminSystem(dataModif);
          this.viderChamps();
        }
      })
    }

  }

  // Mettre à jour l'image du profil 
  uploadImage(event: any){
    // console.log (event.target.files[0])
    // event.target.files[0];
    this.image = event.target.files[0] as File;
    this.changeImage();
  }
  
  changeImage(){
    
    // sweetMessageConfirm("Vous allez modifier ce compte", "Oui je modifie").then( (result) =>{ 
    //   // let userModif = {
    //   //   id: this.userConnect.id,
    //   //   image: event.target.files[0],
    //   // }
  
    //   // On crée un formdata 
       
  
    //   if(result.isConfirmed ){
    //     this.userService.updateAdminReseau(this.userConnect.id, formData).subscribe(
    //       (data:any) =>{
    //         // console.log(data);
    //         if(data.status){
    //           // // console.log(data.message);
    //           sweetAlertMessage("success", "", data.message);
    //           this.userProfilInfos();
    //           this.viderChamps();
    //           window.location.reload();
    //           // this.showInfosProfil();
    //         } 
    //         // sweetAlertMessage("success", "", data.message);
    //         // this.viderChamps()
    //       },
    //       (err) =>{
    //         // console.log(err);
    //         // si l'email existe déjà 
    //         if(err.error){
    //           // console.log(err.error.error);
    //           this.passworldOldMessage = err.error.error;
    //         }          
            
            
    //       }
    //     )
    //   }
    // })
    // Si c'est un admin réseau  
    if((this.infosUser.type != "admin")) {
      const formData = new FormData();
      formData.append("image", this.image);
      // // console.log(dataModif);
      sweetMessageConfirm("Vous allez modifier l'image de votre profil", "Oui je modifie").then( (result) =>{      
        if(result.isConfirmed ){
          this.updateAdminReseau(this.userConnect.id, formData);
          // window.location.reload();
        }

      })
    }
    // Si c'est l'admin system 
    else if ((this.infosUser.type == "admin")){
      const formData = new FormData();
      formData.append("image", this.image);
      sweetMessageConfirm("Vous allez modifier l'image de votre profil", "Oui je modifie").then( (result) =>{      
        if(result.isConfirmed ){
          this.updateAdminSystem(formData);
          window.location.reload();
        }
      })
    }
    
  }

  // Vérification de l'ancien mot de passe 
  verifOldPasswordFunction(password:any){
    this.passworldOldMessage = "";
    if(password) {
      this.passworldOldMessage = "";
      this.isOldPassword = true;
    }
  }

  
  // Vérif mot de passe par défaut
  verifNewPasswordFunction(password:any){
    this.passwordMessage = "";
    this.isPasswordValid = validatePassword(password);
    if(!password){
      this.passwordMessage = "";
    } else if(!this.isPasswordValid){
      this.passwordMessage = "Au mois 8 caractères avec, une  majuscule, une minuscule un chiffre et un caractère spécial";
    }
     else {
      this.passwordMessage = "";
      this.isPasswordValid = true;
    }
  }

  
  verifConfirmPasswordFunction(password:any, passwordConf:any){
    this.passwordConformMessage = "";

    if(!passwordConf){
      this.passwordConformMessage = "";
    }
    if(passwordConf != password){
      this.passwordConformMessage = "Le mot de passe de confirmation dit etre identique au nouveau mot de passe";
    }
     else {
      this.passwordConformMessage = "";
      this.isPasswodConform = true;
    }
  }

  modifPassword(){
    if(!this.password || !this.passwordNew || !this.passwordConf) {
      if(!this.password){
        this.passworldOldMessage = "Le mot de passe est obligatoire";
      }
      if (!this.passwordNew){
        this.passwordMessage = "Le mot de passe est obligatoire";
      }
      if(!this.passwordConf){
        this.passwordConformMessage = "Le mot de passe de confirmation est obligatoire";
      }
    } else {
      this.verifOldPasswordFunction(this.password);
      this.verifNewPasswordFunction(this.passwordNew);
      this.verifConfirmPasswordFunction(this.passwordNew, this.passwordConf);
    }
    
    if(this.isOldPassword && this.isPasswodConform && this.isPasswordValid){
      let userModif = {
        id: this.userConnect.id,
        old_password: this.password,
        password: this.passwordNew,
        password_confirmation: this.passwordConf,
      }
      // // console.log(dataModif);
      // sweetMessageConfirm("Vous allez modifier ce compte", "Oui je modifie").then( (result) =>{      
      //   if(result.isConfirmed ){
      //     this.userService.updateAdminReseau(userModif.id, userModif).subscribe(
      //       (data:any) =>{
      //         // console.log(data);
      //         if(data.status){
      //           // // console.log(data.message);
      //           sweetAlertMessage("success", "", data.message);
      //           this.userProfilInfos();
      //           this.viderChamps();
      //           // this.showInfosProfil();
      //         } 
      //         // sweetAlertMessage("success", "", data.message);
      //         // this.viderChamps()
      //       },
      //       (err) =>{
      //         // console.log(err);
      //         // si l'email existe déjà 
      //         if(err.error){
      //           // console.log(err.error.error);
      //           this.passworldOldMessage = err.error.error;
      //         }          
              
              
      //       }
      //     )
      //   }
      // })

      // Si c'est un admin réseau  
      if((this.infosUser.type != "admin")) {
        // // console.log(dataModif);
        sweetMessageConfirm("Vous allez modifier ce compte", "Oui je modifie").then( (result) =>{      
          if(result.isConfirmed ){
            this.updateAdminReseau(userModif.id, userModif);
            this.viderChamps();
          }

        })
      }
      // Si c'est l'admin system 
      else if ((this.infosUser.type == "admin")){
        sweetMessageConfirm("Vous allez modifier ce compte", "Oui je modifie").then( (result) =>{      
          if(result.isConfirmed ){
            this.updateAdminSystem(userModif);
            this.viderChamps();
          }
        })
      }
    }

    
  }

  // Fonctions pour Affchier ou cacher le mot de passe 
  passwordVisibility(): void {
    if(this.password){
      this.hidePassword = !this.hidePassword;
    }
  }

  passwordNewVisibility(): void {
    if(this.passwordNew){
      this.hidePasswordNew = !this.hidePasswordNew;
    }
  }

  passwordConfVisibility(): void {
    if(this.passwordConf){
      this.hidePasswordConf = !this.hidePasswordConf;
    }
  }
  
}
