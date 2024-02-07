import { Component } from '@angular/core';
import { Abonnement } from 'src/app/models/abonnement.model';
import { Reseau } from 'src/app/models/reseau.model';
import { AbonnementService } from 'src/app/services/abonnement.service';
import { ReseauService } from 'src/app/services/reseau.service';

@Component({
  selector: 'app-abonnement-ddd',
  templateUrl: './abonnement-ddd.component.html',
  styleUrls: ['./abonnement-ddd.component.css']
})
export class AbonnementDDDComponent {
  // Déclarations des variables 
  tabAbonnementsDemDikk: Abonnement[] = []
  reseau_id_DemDikk: number = 0;
  reseauDemDikk = new Reseau;
  emailTo: string = "";
  watsappTO: any;

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
        this.reseauDemDikk = data.reseaux.find((reseau:any)=> reseau.nom.toLowerCase() == "dakar dem dikk");
        this.emailTo = `mailto:${this.reseauDemDikk.email}`;
        if(this.reseauDemDikk){
          this.reseau_id_DemDikk = this.reseauDemDikk.id;
          // On récupère la liste des abonnement de DemDikk 
          this.abonnementService.getAllAbonnement().subscribe(
            (data:any) =>{
              let tabAllAbonnement = data.abonnements;
              console.log(data.abonnements);
              // console.log(this.reseau_id_DemDikk)
              // On récupère la liste des abonnements du réseau DemDikk
              this.tabAbonnementsDemDikk = tabAllAbonnement.filter((abonnement:any) => abonnement.reseau_id == this.reseau_id_DemDikk);
              console.log(this.tabAbonnementsDemDikk);
            }
          )
        }
      }
    )

  }

  redirectToWhatsapp(): void {
    const phoneNumber = `+221${this.reseauDemDikk.telephone}`; 
    this.watsappTO = this.abonnementService.redirectWhatsapp(phoneNumber);
  }
}
