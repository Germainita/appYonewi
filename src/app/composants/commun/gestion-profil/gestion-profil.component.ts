import { Component, OnInit } from '@angular/core';
import { Reseau } from 'src/app/models/reseau.model';
import { Role } from 'src/app/models/role.model';
import { UserModif } from 'src/app/models/user.model';
import { ReseauService } from 'src/app/services/reseau.service';
import { RoleService } from 'src/app/services/role.service';
import { sweetAlertMessage, sweetMessageConfirm } from 'src/app/services/sweetAlert/alert.service';
import { UserService } from 'src/app/services/user.service';

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
  image: string = "";

  // Déclarations des méthodes 
  constructor( private roleService: RoleService, private reseauService:ReseauService, private userService:UserService){}
  ngOnInit() {
    this.infosUser = JSON.parse(localStorage.getItem("userConnect")) || "";
    this.userProfilInfos();

    // Liste des roles 
    this.roleService.getAllRoles().subscribe(
      (data: any) =>{
        console.log(data);
        // this.tabRole = data.roles.filter((role:any) => role.etat == "actif");
        // console.log(this.tabRole);
      }
    );
    
  }

  userProfilInfos(){
    // Le profil de l'utilisateur connecté 
    this.userService.getUserProfil().subscribe(
      (resp:any) =>{
        console.log(resp);
        this.userConnect = resp.user;

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
            console.log (error)
          }
        )
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

  // Mettre à jour le profil 
  modiferProfil(){
    let dataModif = new UserModif
    dataModif.id = this.userConnect.id;
    dataModif.nom = this.userConnect.nom;
    dataModif.prenom = this.userConnect.prenom;
    // dataModif.telephone = this.userConnect.telephone;
    dataModif.adresse = this.userConnect.adresse;
    dataModif.reseau_id = this.userConnect.reseau_id;
    if(this.emailModif && this.emailModif != this.userConnect.email){
      dataModif.email = this.emailModif
    }
    if (this.telephonModif  && this.telephonModif != this.userConnect.telephone){
      dataModif.telephone = this.telephonModif ;
    }
    
    // console.log(dataModif);
    sweetMessageConfirm("Vous allez modifier ce compte", "Oui je modifie").then( (result) =>{      
      if(result.isConfirmed ){
        this.userService.updateAdminReseau(dataModif.id, dataModif).subscribe(
          (data:any) =>{
            console.log(data);
            if(data.status){
              // console.log(data.message);
              sweetAlertMessage("success", "", data.message);
              this.userProfilInfos();
              this.viderChamps();
              this.showInfosProfil();
            }
            else if(!data.success){
              if(data.errors.email){
                sweetAlertMessage("error", "", data.errors.email);
              }
              if(data.errors.password){
                sweetAlertMessage("error", "", data.errors.password);
              }
              if(data.errors.telephone){
                sweetAlertMessage("error", "", data.errors.telephone);
              }
            } 
            // sweetAlertMessage("success", "", data.message);
            // this.viderChamps()
          },
          (err) =>{
            console.log(err);
            
          }
        )
      }
    })
  }

  viderChamps(){
    this.emailModif = "";
    this.telephonModif = "";
    this.userConnect.adresse = "";    
  }

  modifPassword(){
    if(!this.passwordNew || !this.password || !this.passwordConf){
      sweetAlertMessage("error", "","Veuillez remplir les champs");
    } else if (this.passwordConf != this.passwordNew){
      sweetAlertMessage("error", "","Les deux mots de passe ne sont pas conformes");
    } else {
      
    }
  }
  
}
