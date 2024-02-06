import { Component, OnInit } from '@angular/core';
import { Abonnement } from 'src/app/models/abonnement.model';
import { AbonnementService } from 'src/app/services/abonnement.service';
import { ReseauService } from 'src/app/services/reseau.service';

@Component({
  selector: 'app-abonnement-aftu',
  templateUrl: './abonnement-aftu.component.html',
  styleUrls: ['./abonnement-aftu.component.css']
})
export class AbonnementAFTUComponent implements OnInit{
  // Déclarations des variables 
  tabAbonnementsAftu: Abonnement[] = []
  reseau_id_AFTU: number = 0;

  // Déclaration des Méthodes 
  constructor(
    private abonnementService: AbonnementService,
    private reseauService: ReseauService,
    ){}
  
  ngOnInit(): void {
    // On prend la liste des réseau 
    this.reseauService.getAllReseaux().subscribe(
      (data:any) =>{
        // console.log(data);
        let reseauAftu = data.reseaux.find((reseau:any)=> reseau.nom.toLowerCase() == "aftu");
        if(reseauAftu){
          this.reseau_id_AFTU = reseauAftu.id;
          // On récupère la liste des abonnement de aftu 
          this.abonnementService.getAllAbonnement().subscribe(
            (data:any) =>{
              let tabAllAbonnement = data.abonnements;
              // console.log(data.abonnements);
              // console.log(this.reseau_id_AFTU)
              // On récupère la liste des abonnements du réseau AFTU
              this.tabAbonnementsAftu = tabAllAbonnement.filter((abonnement:any) => abonnement.reseau_id == this.reseau_id_AFTU);
              // console.log(this.tabAbonnementsAftu);
            }
          )
        }
      }
    )

  }
}
