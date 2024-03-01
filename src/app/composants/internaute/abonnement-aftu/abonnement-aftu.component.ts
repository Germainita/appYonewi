import { Component, OnInit } from '@angular/core';
import { Abonnement } from 'src/app/models/abonnement.model';
import { Reseau } from 'src/app/models/reseau.model';
import { AbonnementService } from 'src/app/services/abonnement.service';
import { ReseauService } from 'src/app/services/reseau.service';
import { Loading, Notify } from 'notiflix';


@Component({
  selector: 'app-abonnement-aftu',
  templateUrl: './abonnement-aftu.component.html',
  styleUrls: ['./abonnement-aftu.component.css']
})
export class AbonnementAFTUComponent implements OnInit{
  // Déclarations des variables 
  tabAbonnementsAftu: Abonnement[] = []
  reseau_id_AFTU: number = 0;
  reseauAftu = new Reseau;
  emailTo: string= "";
  watsappTO: any;
  abonnement = new Abonnement;

  // Déclaration des Méthodes 
  constructor(
    private abonnementService: AbonnementService,
    private reseauService: ReseauService,
    ){}
  
  ngOnInit(): void {
    // On prend la liste des réseau 
    Loading.dots();
    this.reseauService.getAllReseaux().subscribe(
      (data:any) =>{
        // // console.log(data);
        this.reseauAftu = data.reseaux.find((reseau:any)=> reseau.nom.toLowerCase() == "aftu");
        this.emailTo = `mailto:${this.reseauAftu.email}`;
        if(this.reseauAftu){
          this.reseau_id_AFTU = this.reseauAftu.id;
          // On récupère la liste des abonnement de aftu 
          this.abonnementService.getAllAbonnement().subscribe(
            (data:any) =>{
              let tabAllAbonnement = data.abonnements;
              // // console.log(data.abonnements);
              // // console.log(this.reseau_id_AFTU)
              // On récupère la liste des abonnements du réseau AFTU
              this.tabAbonnementsAftu = tabAllAbonnement.filter((abonnement:any) => abonnement.reseau_id == this.reseau_id_AFTU);
              // // console.log(this.tabAbonnementsAftu);
              Loading.remove();
            }
          )
        }
      }
    )

  }

  getAbonnement(element:any){
    this.abonnement = element;
  }

  // Souscrire à un abonnement 
  redirectToWhatsapp(): void {
    const phoneNumber = `+221${this.reseauAftu.telephone}`; 
    this.watsappTO = this.abonnementService.redirectWhatsapp(phoneNumber);
  }

  // souscrireAbonnement(){
  //   this.abonnementService.souscrireAbonnement(this.abonnement.id).subscribe(
  //     (data:any) =>{
  //       // console.log(data);
  //     }
  //   )
  // }
}
