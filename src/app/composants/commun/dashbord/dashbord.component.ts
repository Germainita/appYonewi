import { Component, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';

import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { Ligne } from 'src/app/models/ligne.model';
import { Newsletter } from 'src/app/models/newsletter.model';
import { Reseau } from 'src/app/models/reseau.model';
import { Role } from 'src/app/models/role.model';
import { SectionModel } from 'src/app/models/section.model';
import { TypeLigne } from 'src/app/models/typeLigne.model';
import { User } from 'src/app/models/user.model';
import { AbonnementService } from 'src/app/services/abonnement.service';
import { AuthService } from 'src/app/services/auth.service';
import { LigneService } from 'src/app/services/ligne.service';
import { NewsletterService } from 'src/app/services/newsletter.service';
import { ReseauService } from 'src/app/services/reseau.service';
import { RoleService } from 'src/app/services/role.service';
import { SectionService } from 'src/app/services/section.service';
import { TarifService } from 'src/app/services/tarif.service';
import { TypeLigneService } from 'src/app/services/typeLigne.service';
import { UserService } from 'src/app/services/user.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  colors: any;
};
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit{
  // Déclaration des variables 
  // Si l'utilisateur connecté est un administrateur systeme ou réseau 
  isAdminSystem: boolean = false;
  isAdminReseau: boolean = false;
  userConnect:any;

  // Pour admin system 
  tabLigne: Ligne[] = [];
  tabLigneAftu: Ligne[] = [];
  tabLigneDemDikk: Ligne[] = [];

  tabReseaux: Reseau[] = [];
  reseau_id_demDikk: number = 0;
  reseau_id_aftu: number = 0;

  tabUtilisateurActifs: User[] = [];
  tabUtilisateurInactifs: User[] = [];

  tabRolesActif: Role[] = [];
  tabNewsletter: Newsletter[] = []

  // Pour admin reseau 
  tabLigneReseau: Ligne[] = [];
  tabLigneReseauSup: Ligne[] = [];
  tabSectionReseau: SectionModel[] = [];
  tabSectionReseauSup: SectionModel[] = [];

  tabTypeLigne: TypeLigne[] = [];
  tabTypeTarif: any[] = [];
  tabAbonnement: any[] = [];

  totalLigne:number = 0;
  totalSection:number = 0;

  // Chart pour administrateur system 
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {};

  constructor(
    private userService: UserService,
    private ligneService: LigneService, 
    private reseauService: ReseauService,
    private roleService:RoleService,
    private newsletterService: NewsletterService,
    private sectionService: SectionService,

    private typeLigneService: TypeLigneService, 
    private abonnementService: AbonnementService,
    private tarifService: TarifService, 
    private authService: AuthService,

  ) {}

  ngOnInit(): void {
    this.authService.deconnexionSansToken(); //Deconnecte l'utilisateur si on supprime le token

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

    // Pour l'admin systeme 
    if(this.isAdminSystem) {
      this.listeReseau();
      this.listeLigne();
      this.listeUsersActifs();
      this.listeUsersInactifs();
      this.listeRoles();
      this.listeNewsletters();
    }

    // Pour l'admin reseau 
    else if (this.isAdminReseau){
      this.listeLigneReseau();
      this.listeSectionReseau();
      this.statisticAdminReseau();
    }
      

  }

  // Liste des lignes 
  listeLigne(){
    this.ligneService.getAllLigne().subscribe(
      (data:any) =>{
        if(data.lignes){
          this.tabLigne = data.lignes;
          this.tabLigneAftu = this.tabLigne.filter((ligne:any) => ligne.reseau_id == this.reseau_id_aftu);
          // console.log("Le tableau des ligne de aftu", this.tabLigneAftu);
          
          this.tabLigneDemDikk = this.tabLigne.filter((ligne:any)=> ligne.reseau_id == this.reseau_id_demDikk);
          // console.log("Le tableau des ligne de dakar dem dikk", this.tabLigneDemDikk);
  
          this.chartOptions = {
            series: [this.tabLigneAftu.length, this.tabLigneDemDikk.length],
            chart: {
              type: "donut",
            },
            labels: ["AFTU", "DDD"],
            colors: ['#F2743B', '#2CCED2'],
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: "bottom"
                  }
                }
              }
            ]
          };
        }
      },
    );
  }

  // Liste des réseaux 
  listeReseau(){
    this.reseauService.getAllReseaux().subscribe(
      (data:any) =>{
        if(data.reseaux){
          this.tabReseaux= data.reseaux;
          let reseauAftu = this.tabReseaux.find((reseau:any)=> reseau.nom == "aftu");
          if(reseauAftu){
            this.reseau_id_aftu = reseauAftu.id;
          }
  
          let reseauDemDikk = this.tabReseaux.find((reseau:any)=> reseau.nom == "dakar dem dikk");
          if(reseauDemDikk){
            this.reseau_id_demDikk = reseauDemDikk.id;
          }
        }
      },
      (error) =>{
        this.tabReseaux= []
      }
    )
  }

  // Liste des utilisateurs 
  listeUsersActifs(){
    this.userService.getAllUsers().subscribe(
      (data:any) =>{
        // // console.log(data);
        if(data.users){
          this.tabUtilisateurActifs = data.users;
        }
      },
      (error) =>{
        // // console.log(error);
        this.tabUtilisateurActifs = [];
      }
    )
  }

  // Liste des utilisateurs 
  listeUsersInactifs(){
    this.userService.getAllUsersBlocked().subscribe(
      (data:any) =>{
        // // console.log(data);
        if(data.users){
          this.tabUtilisateurInactifs = data.users;
        }
      },
      (error) =>{
        // // console.log(error);
        this.tabUtilisateurInactifs = [];
      }
    )
  }

  // Liste des tous les roles 
  listeRoles(){
    this.roleService.getAllRoles().subscribe(
      (data:any) =>{
        if(data.roles){
          this.tabRolesActif = data.roles;
        }
      },
      (err:any) =>{
        this.tabRolesActif = [];
      }
    )
  }

  // Liste des inscrits à la newsletter 
  listeNewsletters(){
    this.newsletterService.getAllUsersNewsletter().subscribe(
      (data:any) =>{
        // // console.log(data);
        if(data.subscribers){
          this.tabNewsletter = data.subscribers;
        }
      },
      (err:any)=>{
        this.tabNewsletter = [];
      }
    )
  }
  

  // Pour le dashbord admin reseau 
  // Liste des lignes du réseau
  listeLigneReseau(){
    // Les lignes du réseaux actifs 
    this.ligneService.getAllLigneReseau().subscribe(
      (data:any) =>{
        if(data.lignes){
          this.tabLigneReseau = data.lignes;
          this.totalLigne += this.tabLigneReseau.length;
        }
      },
    );

    // Les lignes du réseaux inactifs 
    this.ligneService.getLigneDeleted().subscribe(
      (data:any) =>{
        if(data.lignes){
          this.tabLigneReseauSup = data.lignes;
          this.totalLigne += this.tabLigneReseauSup.length
        }
      }
    )

  }

  // Liste des sections du réseau
  listeSectionReseau(){
    // Les sections actifs du réseau 
    this.sectionService.getAllSectionReseau().subscribe(
      (data:any) =>{
        if(data.sections){
          // this.tabSectionReseau = data.sections;
          // this.totalSection += this.tabSectionReseau.length;
          if(data.sections){
            let tabSectionsLignes = data.sections;
            if (Array.isArray(tabSectionsLignes)){
              this.tabSectionReseau = tabSectionsLignes;
            } else {
              this.tabSectionReseau = Object.values(tabSectionsLignes);  // On récupères les valeurs on les mets dans un tableau
            }   
          } else {
            this.tabSectionReseau = [];
          }
          this.totalSection += this.tabSectionReseau.length;
        }
      },
    );

    // Les sections du réseaux inactifs 
    this.sectionService.getSectionDeleted().subscribe(
      (data:any) =>{
        // // console.log(data);
        if(data.sections){
          // this.tabSectionReseauSup = data.sections;
          // this.totalSection += this.tabSectionReseauSup.length;
          if(data.sections){
            let tabSectionsLignes = data.sections;
            if (Array.isArray(tabSectionsLignes)){
              this.tabSectionReseauSup = tabSectionsLignes;
            } else {
              this.tabSectionReseauSup = Object.values(tabSectionsLignes);  // On récupères les valeurs on les mets dans un tableau
            }   
          } else {
            this.tabSectionReseauSup = [];
          }
          this.totalSection += this.tabSectionReseauSup.length;
        }
      }, 
      (error:any) =>{
        this.tabSectionReseauSup = [];
        // this.totalSection = 0;
      }
    )
  }

  statisticAdminReseau(){
    // Les types de tarifs du reseau 
    this.tarifService.getAllTarifReseau().subscribe(
      (data:any) =>{
        // // console.log(data);
        if(data.tarifs){
          this.tabTypeTarif = data.tarifs;   
        }
      }
    );

    // Les abonnements du réseau 
    this.abonnementService.getAllAbonnementReseau().subscribe(
      (data:any) =>{
        // // console.log(data);
        if(data.abonnements){
          this.tabAbonnement = data.abonnements;
        }
      }
    );

    // Les types de ligne du réseau 
    this.typeLigneService.getTypesLigneReseau().subscribe(
      (data:any) =>{
        // console.log(data);
        if(data.types) {
          this.tabTypeLigne = data.types;
        }
      }, (err:any) => {
        this.tabTypeLigne = [];
      }
    )
  }
}
