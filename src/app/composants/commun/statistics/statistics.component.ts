import { Component, OnInit } from '@angular/core';
import { Abonnement } from 'src/app/models/abonnement.model';
import { Contact } from 'src/app/models/contact.model';
import { Ligne } from 'src/app/models/ligne.model';
import { Reseau } from 'src/app/models/reseau.model';
import { Tarif } from 'src/app/models/tarif.model';
import { TypeLigne } from 'src/app/models/typeLigne.model';
import { User } from 'src/app/models/user.model';
import { AbonnementService } from 'src/app/services/abonnement.service';
import { ContactService } from 'src/app/services/contact.service';
import { LigneService } from 'src/app/services/ligne.service';
import { ReseauService } from 'src/app/services/reseau.service';
import { TarifService } from 'src/app/services/tarif.service';
import { TypeLigneService } from 'src/app/services/typeLigne.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit{
  // Déclaration des variables 
  // Si l'utilisateur connecté est un administrateur systeme ou réseau 
  isAdminSystem: boolean = false;
  isAdminReseau: boolean = false;
  userConnect: any;

  // Statistiques pour admin reseau 
  tabLigne: Ligne[] = [];
  // tabTypeLigne: TypeLigne[] = [];
  tabTypeTarif: Tarif[] = [];
  tabAbonnement: Abonnement[] = [];

  // Pour admin systeme 
  tabReseaux: Reseau[] = [];
  tabContacts: Contact[] = [];
  tabUtilisateur: User[] = [];


  constructor(
    private ligneService: LigneService, 
    // private typeLigneService: TypeLigneService, 
    private abonnementService: AbonnementService,
    private tarifService: TarifService, 

    private userService: UserService,
    private reseauService: ReseauService,
    private contactService: ContactService,
    
  ){}

  // Déclarations des méthodes 
  ngOnInit(): void {
    // On récupère les infos de l'utilisateur qui s'est connecté 
    // localStorage.setItem("userConnect", JSON.stringify(userConnect));
    this.userConnect = JSON.parse(localStorage.getItem("userConnect")) || "";
    
    if(this.userConnect.type == "admin"){
      this.isAdminSystem = true;
      this.isAdminReseau = false;
    } else if(this.userConnect.type == "utilisateur"){
        this.isAdminSystem = false;
        this.isAdminReseau = true;
    }

    // Pour l'admin réseau 
    if(this.isAdminReseau){
      this.listeLigne();
      this.listeAbonnement();
      this.listetarif();
    }

    else if (this.isAdminSystem){
      this.listeUsers();
      this.listeReseau();
      this.listeContacts();
    }
  }

  listeLigne(){
    this.ligneService.getAllLigneReseau().subscribe(
      (data:any) =>{
        this.tabLigne = data.lignes;
      }
    )
  }

  // Liste des tous les Abonnement 
  listeAbonnement(){
    this.abonnementService.getAllAbonnementReseau().subscribe(
      (data:any) =>{
        // console.log(data);
        this.tabAbonnement = data.abonnements;
      }
    )
  }

  // Liste des tous les TypeLignes 
  // listeTypeLignes(){
  //   this.typeLigneService.getTypesLigneReseau().subscribe(
  //     (data:any) =>{
  //       this.tabTypeLigne = data.types;
  //     }
  //   )
  // }

  // Liste des tous les tarif 
  listetarif(){
    this.tarifService.getAllTarifReseau().subscribe(
      (data:any) =>{
        // console.log(data);
        this.tabTypeTarif = data.tarifs;        
      }
    )
  }


  // Pour l'admin systeme 
  // Liste des utilisateurs 
  listeUsers(){
    this.userService.getAllUsers().subscribe(
      (data:any) =>{
        // console.log(data);
        this.tabUtilisateur = data.users;
      },
      (error) =>{
        // console.log(error);
        this.tabUtilisateur = [];
      }
    )
  }

  // Liste des réseaux 
  listeReseau(){
    this.reseauService.getAllReseaux().subscribe(
      (data:any) =>{
        this.tabReseaux= data.reseaux;
      },
      (error) =>{
        this.tabReseaux= []
      }
    )
  }

  listeContacts(){
    this.contactService.getAllContacts().subscribe(
      (data:any) =>{
        this.tabContacts = data.contact;
      }, 
      (err:any)=>{
        this.tabContacts = [];
      }
    )
  }
}
