import { Component, OnInit } from '@angular/core';
import { Ligne } from 'src/app/models/ligne.model';
import { LigneService } from 'src/app/services/ligne.service';
import { ReseauService } from 'src/app/services/reseau.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  // Déclaration des variables 
   // Les réseaux 
   tabReseauxActifs: any [] = [];
   idAftu: number = 0;
   idDemDikk: number = 0;

  // Pour ce qui concerne les lignes 
  tabLigne: Ligne[] = [];
  tabAftu: Ligne[] = [];  
  tabLigneDemDikk: Ligne[] = [];

  // Déclaration des methodes
  constructor(
    private reseauService: ReseauService,
    private ligneService: LigneService, 
  ){}

  ngOnInit(): void {
    // Les réseaux 
    this.reseauService.getAllReseaux().subscribe(
      (data:any) =>{
        console.log (data)
        this.tabReseauxActifs = data.reseaux;
        // console.log(this.tabReseauxActifs);

        // on trouve l'id du réseau AFTU 
        let reseauAftu = this.tabReseauxActifs.find((element:any) => element.nom == "aftu");
        if(reseauAftu){
          this.idAftu = reseauAftu.id;
        }

        // on trouve l'id du réseau Dakar dem dikk 
        let reseauDemDikk = this.tabReseauxActifs.find((element:any) => element.nom == "dakar dem dikk");
        if(reseauDemDikk){
          this.idDemDikk = reseauDemDikk.id;
        }
      },
      (error) =>{
        console.log (error)
      }
    );
    

    // Les lignes de chaque réseaux 
    this.ligneService.getAllLigne().subscribe(
      (data:any) =>{
        // console.log(data);

        this.tabLigne = data.lignes;

        // Les infos du réseau de AFTU 
        this.tabAftu = this.tabLigne.filter((element:any)=> element.reseau_id == this.idAftu);
        console.log("Liste des lignes du reseau AFTU ",this.tabAftu);

        // Les infos du réseau de Dakar Dem Dikk 
        this.tabLigneDemDikk = this.tabLigne.filter((element:any)=> element.reseau_id == this.idDemDikk);
        console.log("Liste des lignes du reseau LigneDemDikk ",this.tabLigneDemDikk);
      }
    )
  }
}
