import { Component } from '@angular/core';
import { Abonnement } from 'src/app/models/abonnement.model';
import { AbonnementService } from 'src/app/services/abonnement.service';
import { sweetAlertMessage, sweetMessageConfirm } from 'src/app/services/sweetAlert/alert.service';
import { validateLengthField } from 'src/app/validation/validation';

@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.css']
})
export class AbonnementComponent {
    // Les lignes actifs 
    tabAbonnement: Abonnement[] = [];
    tabAbonnementFilterActifs: Abonnement[] = [];
  
    // Tableau des Abonnements supprimés
    tabAbonnementsSup: Abonnement [] = []; 
    tabAbonnementFilterSup: Abonnement[] = [];
  
    abonnement = new Abonnement;
    filterValue: string = "";
    // nomAbonnement: string = "";
  
    // Attribut pour ajouter ou modifier 
    isAjout: boolean = true;
    isModifier: boolean = false;
  
    // Attribut pour voir la liste ou la corbeille
    isActifs: boolean = true; 
    isSup: boolean = false; 
  
    // Attribut pour la pagination
    itemsParPage = 3; // Nombre d'articles par page
    pageActuelle = 1; // Page actuelle

    // Attribut pour la durée 
    nombreJour ?: string; 
    temps ?: string; 

    test: any;

    // Validation des infos 
    // type 
    isType:boolean = false;
    verifTypeMessage: string = "";

    // Nombre de jour 
    isNbreJour:boolean = false;
    verifNbreJourMessage: string = "";

    // Temps 
    isTemps:boolean = false;
    verifTempsMessage: string = "";

    // Prix 
    isPrix:boolean = false;
    verifPrixMessage: string = "";

  
    // Le tableau filtrer peu importe la liste 
    tabFilter:any[] = [];
  
    constructor(private abonnementService: AbonnementService){}
  
    
  
    // Déclaration des méhodes 
    ngOnInit(): void {
      // On charge les abonnements à l'initialisation 
      this.listeAbonnement();
  
      this.listeAbonnementSup();
  
    }
  
    // Voir la liste des Abonnement actifs 
    showAbonnementActifs(){
      this.isActifs = true;
      this.isSup = false;
      this.filterValue = "";
    }
  
    // Voir la liste des Abonnement supprime 
    showCorbeille(){
      this.isSup = true;
      this.isActifs = false;
      this.filterValue = "";
      this.listeAbonnementSup();
    }
  
    // Methode de recherche automatique pour les reseaux
    onSearch(){
      // Recherche se fait selon le type ou la durée ou le prix
      this.tabAbonnementFilterActifs = this.tabAbonnement.filter(
        (elt:any) => (elt?.type.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.duree.toLowerCase().includes(this.filterValue.toLowerCase()))  
      );
    }
  
    // Recheche pour les Abonnement actifs ou inactifs
    onSearchAbonnementup(){
      // Recherche se fait selon le type ou la durée ou le prix
      this.tabAbonnementFilterSup = this.tabAbonnementsSup.filter(
        (elt:any) => (elt?.type.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.duree.toLowerCase().includes(this.filterValue.toLowerCase()))   
      );
    }

    
  
    // Voir Formulaire d'ajout 
    showAjout(){
      this.isAjout = true;
      this.isModifier = false;
      // if(this.abonnement){
      //   this.viderChamps()
      // }
    }
  
    // showModifabonnementForm()
  
    // Voir Formulaire de modification 
    showModif(element:any){
      this.isAjout = false;
      this.isModifier = true;
      this.abonnement = element;
      let abonnementModif = this.abonnement.duree.split(" ");
      // console.log(abonnementModif);
      this.nombreJour = abonnementModif[0];
      this.temps = abonnementModif[1];
    }
    
  
    // Les détails du abonnement 
    showDetails(element:any){
      this.abonnement = element;
    }
  
    // Liste des tous les Abonnement 
    listeAbonnement(){
      this.abonnementService.getAllAbonnementReseau().subscribe(
        (data:any) =>{
          // console.log(data);
          this.tabAbonnement = data.abonnements;
          this.tabAbonnementFilterActifs = this.tabAbonnement;
        }
      )
    }
  
    // Liste des Abonnement supprimés 
    listeAbonnementSup(){
      this.abonnementService.getAbonnementDeleted().subscribe(
        (data:any) =>{
          // On filtre les abonnements supprimés 
          // // console.log(data)
          this.tabAbonnementsSup = this.tabAbonnementFilterSup = data.abonnements;
        },
        (err) =>{
          // // console.log(err);
          this.tabAbonnementsSup = [];
        }
      )
    }
  
    // Vider abonnement 
    viderChamps(){
      this.abonnement.prix = "";
      this.nombreJour = "";
      this.temps = ""
      this.abonnement.type = "";
      this.abonnement.description = "";
    }

    // Validation des infos 
    // Validation du type d'abonnement 
    verifTypeFunction(){
      this.verifTypeMessage = "";
      this.isType = validateLengthField(this.abonnement.type, 2);
      if(!this.abonnement.type ) {
        this.verifTypeMessage = " Le nom de l'abonnement est obligatoire";
      }
      else if (!this.isType){
        this.verifTypeMessage = " La longueur doit etre supérieur ou égale à 2";
      } else {
        this.verifTypeMessage = "";
      }
    }

    // Validation du type d'abonnement 
    verifPrixFunction(){
      this.verifPrixMessage = "";
      if(!this.abonnement.prix ) {
        this.verifPrixMessage = " Le prix est obligatoire";
      }
      else if (parseInt(this.abonnement.prix) < 1000){
        this.verifPrixMessage = "Le prix doit etre supérieure ou égal à 1000 FCFA";
      } else {
        this.verifPrixMessage = "";
      }
    }

    // Validation du nombre de jour de l'abonnement 
    verifNbreJourFunction(){
      this.verifNbreJourMessage = "";
      if(!this.nombreJour) {
        this.verifNbreJourMessage = " Le nombre est obligatoire";
      }
      else if (parseInt(this.nombreJour) < 1){
        this.verifNbreJourMessage = "Le nombre ne peut etre nigatif ni null";
      } else {
        this.verifNbreJourMessage = "";
      }
    }

    // Validation du nombre de jour de l'abonnement 
    verifTempsFunction(){
      this.verifTempsMessage = "";
      if(!this.temps) {
        this.verifTempsMessage = " Le nombre est obligatoire";
      } else {
        this.verifTempsMessage = "";
      }
    }

    // Ajouter un abonnement à vérifier 
    ajouter(){
      this.verifTypeFunction();
      this.verifPrixFunction();
      this.verifNbreJourFunction();
      this.verifTempsFunction();

      if(this.isType && this.isNbreJour && this.isTemps && this.isPrix){
        // On vérifie si le abonnement n'existe pas déjà 
        let abonnementExist = this.tabAbonnement.find((abonnement:any) => abonnement.type.toLowerCase() == this.abonnement.type.toLowerCase());
        let abonnementExist1 = this.tabAbonnementsSup.find((abonnement:any) => abonnement.type.toLowerCase() == this.abonnement.type.toLowerCase());
        if(abonnementExist){
          this.verifTypeMessage = "Le type de l'abonnement doit être unique"
          // sweetAlertMessage("error", "", "le type de l'abonnement doit être unique");
        }
        else if (abonnementExist1) {
          this.verifTypeMessage = "Ce type est déjà dans la corbeille. Vueillez le restaure"
          // sweetAlertMessage("error", "", "Ce type est déjà dans la corbeille. Vueillez le restaure");
        } 
        else{
          this.abonnement.duree =  `${this.nombreJour} ${this.temps }`;
          // // console.log(this.abonnement.duree);
          this.abonnementService.addAbonnement(this.abonnement).subscribe( 
            (data:any) =>{
              // // console.log(data);
              // console.log(data.success);
              if(data.success == false) {
                sweetAlertMessage("error", "", "Le prix doit etre suppérieur à 1000");
              } else if(data.message) {
                sweetAlertMessage("success", "", data.message);
                this.listeAbonnement();
                this.viderChamps();
              }
            },
            (err:any) =>{
              // console.log(err);
              sweetAlertMessage("error", "", "Le prix doit etre suppérieur à 1000");
              // console.log(`Erreur lors de l'ajout ${err}`);
            }
          )
        }
        
      }
      
    }
  
    // Modifier abonnement 
    modifier(){ 
      this.verifTypeFunction();
      this.verifPrixFunction();
      this.verifNbreJourFunction();
      this.verifTempsFunction();

      if(this.isType && this.isNbreJour && this.isTemps && this.isPrix) {
        this.abonnement.duree =  `${this.nombreJour} ${this.temps }`;     
        this.abonnementService.updateAbonnement(this.abonnement.id, this.abonnement).subscribe( 
          (data:any) =>{
            if(data.success == false) {
              sweetAlertMessage("error", "", "Le prix doit etre suppérieur à 1000");
            } else if(data.message) {
              sweetAlertMessage("success", "", data.message);
              this.listeAbonnement();
              this.viderChamps();
              this.showAjout();
            }
          },
          (err) =>{
            // console.log (err)
    
          }
        )
      }
    }
  
    // Supprimer un abonnement
    supprimer(abonnement:any){
      sweetMessageConfirm("Vous allez supprimer cet abonnement", "Oui, je supprime").then( (result) =>{
        if(result.isConfirmed ){
          this.abonnementService.deleteAbonnement(abonnement.id).subscribe(
            (data:any) =>{
              // console.log(data);
              sweetAlertMessage("success", "", data.message);
              this.listeAbonnement();
              this.listeAbonnementSup();
            },
            (err) => {
              alert("Error");
              // console.log(err);
            }
          )
        }
      })
      
    }
  
    // Restaurer un abonnement 
    restaurer(abonnement:any){
      sweetMessageConfirm("Vous allez restaurer cet abonnement", "Oui, je restaure").then( (result) =>{
        if(result.isConfirmed ){
          // abonnement.etat = "actif";
          this.abonnementService.restaureAbonnement(abonnement.id).subscribe(
            (data:any) =>{
              // console.log(data);
              sweetAlertMessage("success", "", data.message);
              this.listeAbonnement();
              this.listeAbonnementSup();
            },
            (err) => {
              alert("Error");
              // console.log(err);
            }
          )
        }
      })
    }
  
  
    // Supprimer d"finitivement ce abonnement 
    supprimerDefinitif(abonnement:any){
      sweetMessageConfirm("Vous allez supprimer définitivement ce abonnement", "Oui, je supprime").then( (result) =>{
        if(result.isConfirmed ){
          this.abonnementService.deleteDefinitif(abonnement.id).subscribe(
            (data:any) =>{
              sweetAlertMessage("success", "", data.message);
              this.listeAbonnementSup();
            },
            (err) =>{
              // console.log(err);
            }
          )
        }
      })
    }
  
    // Méthode pour vider la corbeille 
    viderCorbeille(){
        sweetMessageConfirm("Vous allez vider la corbeille", "Oui, je vide").then( (result) =>{
          if(result.isConfirmed ){
            this.abonnementService.emptyTrash().subscribe(
              (data:any) =>{
                sweetAlertMessage("success", "", data.message);
                this.listeAbonnementSup();
              }
            )
          }
        })
    }
  
    // Pagination pour tous les tableaux de manières automatique
    getItemsPage(tabFilter:any){
      const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
      const indexFin = indexDebut + this.itemsParPage;
      this.tabFilter = tabFilter;
      return tabFilter.reverse().slice(indexDebut, indexFin);
  
    }
  
    // Méthode pour générer la liste des pages
    get pages(): number[] {
      const totalPages = Math.ceil(this.tabFilter.length / this.itemsParPage);
      return Array(totalPages).fill(0).map((_, index) => index + 1);
    }
  
    // Méthode pour obtenir le nombre total de pages
    get totalPages(): number {
      return Math.ceil(this.tabFilter.length / this.itemsParPage);
    }
}