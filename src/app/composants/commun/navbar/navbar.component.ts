import { Component, OnInit } from '@angular/core';
import { Reseau } from 'src/app/models/reseau.model';
import { Role } from 'src/app/models/role.model';
import { ReseauService } from 'src/app/services/reseau.service';
import { RoleService } from 'src/app/services/role.service';

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

  reseauUser ?: string;

  // Déclaration des méthodes 
  constructor(private roleService:RoleService, private reseauService: ReseauService){}

  ngOnInit(): void {
    // On récupère les infos de l'utilisateur qui s'est connecté 
    // localStorage.setItem("userConnect", JSON.stringify(userConnect));
    this.userConnect = JSON.parse(localStorage.getItem("userConnect")) || "";

    this.listeReseau();
    
    if(this.userConnect.type == "admin"){
      this.isAdminSystem = true;
      this.isAdminReseau = false;
    } else if(this.userConnect.type == "utilisateur"){
        this.isAdminSystem = false;
        this.isAdminReseau = true;
    }
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
        let reseauFound = this.tabReseaux.find((reseau:any) => reseau.id == this.userConnect.user.reseau_id);
        if(reseauFound){
          this.reseauUser = reseauFound.nom;
          console.log(this.reseauUser);
        }
      },
      (error) =>{
        // console.log (error);
        this.tabReseaux = []
      }
    )
  }

}
