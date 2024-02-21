import { Component, OnInit } from '@angular/core';
import { Reseau } from 'src/app/models/reseau.model';
import { Role } from 'src/app/models/role.model';
import { urlImage } from 'src/app/services/apiUrl';
import { ReseauService } from 'src/app/services/reseau.service';
import { RoleService } from 'src/app/services/role.service';
import { sweetAlertMessage } from 'src/app/services/sweetAlert/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  // Déclaration des variables 
  // Si l'utilisateur connecté est un administrateur systeme ou réseau 
  isAdminSystem: boolean = false;
  isAdminReseau: boolean = false;
  userConnect:any;
  tabRole: Role[] = [];

  tabReseaux: Reseau[] = [];

  reseauFound = new Reseau;
  reseauUser ?: string;
  reseauUserId : number = 0;

  // Variable pour modifier le réseau 
  description ?:string;
  telephone ?:string;
  email ?:string;

  isDescUpdate:boolean = false;
  isContactUpdate:boolean = false;

  imageUserConnected: any;
  
  // Déclaration des méthodes 
  constructor(private roleService:RoleService, private reseauService: ReseauService, private userService:UserService){}

  ngOnInit(): void {
    // On récupère les infos de l'utilisateur qui s'est connecté 
    // localStorage.setItem("userConnect", JSON.stringify(userConnect));
    this.userConnect = JSON.parse(localStorage.getItem("userConnect")) || "";

    // Les infos de l'utilisateur connecté 
    // console.log(this.userConnect.user);
    // this.imageUserConnected = `${urlImage}${this.userConnect.image}`;    

    
    
    if(this.userConnect.type == "admin"){
      this.isAdminSystem = true;
      this.isAdminReseau = false;
    } else if(this.userConnect.type == "utilisateur"){
        this.isAdminSystem = false;
        this.isAdminReseau = true;
    }

    if(this.isAdminReseau){
      this.listeReseau();
    }

    // Le profil de l'utilisateur connecté 
    this.userService.getUserProfil().subscribe(
      (resp:any) =>{
        console.log(resp);
        let userConnect = resp.user;

        console.log("Utilisateur connecté");
        
        console.log(userConnect);
        

        // L'image de l'utilisateur connecter 
        this.imageUserConnected = `${urlImage}${userConnect.image}`;
        // console.log(this.imageUserConnected);
        

        // Liste des réseaux 
        // this.reseauService.getAllReseaux().subscribe(
        //   (data:any) =>{
        //     this.tabReseaux  = data.reseaux;
        //     let reseauFound = this.tabReseaux.find((elemt:any) => (elemt.id == this.userConnect.reseau_id) )
        //     if (reseauFound){
        //       this.reseauName = reseauFound.nom;
        //     }
        //   },
        //   (error) =>{
        //     console.log (error)
        //   }
        // )
      }
    )
  }

  // Liste des tous les roles 
  listeRoles(){
    let response: any;
    this.roleService.getAllRoles().subscribe(
      (data: any) =>{
        this.tabRole = response.roles;
      },
      (err:any) =>{
        this.tabRole = [];
      }
    )
  }

  // Liste des réseaux 
  listeReseau(){
    this.reseauService.getAllReseaux().subscribe(
      (data:any) =>{
        console.log (data);
        this.tabReseaux = data.reseaux;
        this.reseauFound = this.tabReseaux.find((reseau:any) => reseau.id == this.userConnect.user.reseau_id);
        console.log(this.reseauFound);
        // if(reseauFound){
        //   this.reseauUser = reseauFound.nom;
        //   this.reseauUserId = reseauFound.id;
        //   // console.log(this.reseauUser);
        // }
      },
      (error) =>{
        // console.log (error);
        this.tabReseaux = []
      }
    )
  }

  // Modifier la description 
  modifDescReseau(){
    if(!this.description){
      sweetAlertMessage("error", "", "Veuillez donner une description ou annuler l'option");
      this.isDescUpdate = false;
    } else{
      this.reseauFound.description = this.description;
      this.reseauService.updateDetailsReseau(this.reseauFound).subscribe(
        (data:any) =>{
          console.log(data);
          this.isDescUpdate = true;
          sweetAlertMessage("success", "", data.message);
          this.listeReseau();
          // this.viderChamps();
          console.log(data);
        }
      )
    }
  }

  viderChamps(){
    this.description = "";
    this.telephone ="";
    this.email="";
  }

  chargerInfos(){
    this.description = this.reseauFound.description;
    this.email = this.reseauFound.email;
    this.telephone = this.reseauFound.telephone;
  }

  mdofifierContact(){
    if(!this.telephone || !this.email){
      sweetAlertMessage("error", "", "Veuillez remplir les champs");
      this.isContactUpdate = false;
    }else{
      this.reseauFound.email = this.email;
      this.reseauFound.telephone = this.telephone;
      this.reseauService.updateDetailsReseau(this.reseauFound).subscribe(
        (data:any) =>{
          this.isContactUpdate = true;
          console.log(data);
          sweetAlertMessage("success", "", data.message);
        },
        (err:any)=>{
          this.isContactUpdate = false;
          console.log(err);
          if(err.error.errors.telephone){
            sweetAlertMessage("error", "", err.error.errors.telephone[0]);
          }
          console.log(err.error.errors.telephone[0]);
        }
      )

    }
    // console.log(this.reseauFound.telephone);
    // console.log(this.reseauFound.email);
  }

}
