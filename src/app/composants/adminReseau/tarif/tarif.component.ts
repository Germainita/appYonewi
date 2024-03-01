import { Component } from '@angular/core';
import { Tarif } from 'src/app/models/tarif.model';
import { TarifService } from 'src/app/services/tarif.service';
import { sweetAlertMessage, sweetMessageConfirm } from 'src/app/services/sweetAlert/alert.service';

@Component({
  selector: 'app-tarif',
  templateUrl: './tarif.component.html',
  styleUrls: ['./tarif.component.css']
})
export class TarifComponent {
  // Les lignes actifs 
  tabTarif: Tarif[] = [];
  tabTarifFilterActifs: Tarif[] = [];

  // Tableau des tarifs supprimés
  tabTarifsSup: Tarif [] = []; 
  tabTarifFilterSup: Tarif[] = [];

  tarif = new Tarif;
  tarifSection = new Tarif;
  filterValue: string = "";
  // nomtarif: string = "";

  // Attribut pour ajouter ou modifier 
  isModifier: boolean = false;

  // Attribut pour voir la liste ou la corbeille
  isConfig: boolean = true; 
  isActifs: boolean = false; 

  isTarifSection: boolean = false;
  isTarifEntreSection: boolean = false;

  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle



  // Le tableau filtrer peu importe la liste 
  tabFilter:any[] = [];

  constructor(private tarifService: TarifService){}

  

  // Déclaration des méhodes 
  ngOnInit(): void {
    // On charge les tarifs à l'initialisation 
    this.listetarif();

    

  }

  // Voir la liste des tarif actifs 
  showTarifActifs(){
    this.isActifs = true;
    this.isConfig = false;
    this.filterValue = "";
  }

  showConfigTarif(){ 
    this.isConfig = true;
    this.isActifs = false;
  }

  // Voir la liste des tarif supprime 
  // showCorbeille(){
  //   this.isSup = true;
  //   this.isActifs = false;
  //   this.filterValue = "";
  //   this.listetarifSup();
  // }

  // Methode de recherche automatique pour les reseaux
  // onSearch(){
  //   // Recherche se fait selon le type ou la durée ou le prix
  //   this.tabTarifFilterActifs = this.tabTarif.filter(
  //     (elt:any) => (elt?.type.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.duree.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.prix.toLowerCase().includes(this.filterValue.toLowerCase()))  
  //   );
  // }

  // // Recheche pour les tarif actifs ou inactifs
  // onSearchTarifSup(){
  //   // Recherche se fait selon le type ou la durée ou le prix
  //   this.tabTarifFilterSup = this.tabTarifsSup.filter(
  //     (elt:any) => (elt?.type.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.duree.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.prix.toLowerCase().includes(this.filterValue.toLowerCase()))   
  //   );
  // }

  // // Voir Formulaire d'ajout 
  // showAjout(){
  //   this.isAjout = true;
  //   this.isModifier = false;
  // }

  // // showModiftarifForm()

  // // Voir Formulaire de modification 
  showModif(element:any){
    this.tarif = element;
  }
  

  // Les détails du tarif 
  showDetails(element:any){
    this.tarif = element;
  }

  // Liste des tous les tarif 
  listetarif(){
    this.tarifService.getAllTarifReseau().subscribe(
      (data:any) =>{
        // console.log(data);
        this.tabTarif = data.tarifs;
        let tarifSectionExist = this.tabTarif.find((tarif:any) => tarif.type.toLowerCase() == "tarif section");
        if (tarifSectionExist){
          this.isTarifSection = true;
        }

        let tarifEntreSectionExist = this.tabTarif.find((tarif:any) => tarif.type.toLowerCase() == "tarif entre section");
        if (tarifEntreSectionExist){
          this.isTarifEntreSection = true;
        }

        if (this.isTarifEntreSection && this.tarifSection){
          this.showTarifActifs();
        }
        
      }
    )
  }

  // Liste des tarif supprimés 
  listetarifSup(){
    this.tarifService.getTarifDeleted().subscribe(
      (data:any) =>{
        // On filtre les tarifs supprimés 
        // // console.log(data)
        this.tabTarifsSup = this.tabTarifFilterSup = data.tarifs;
      },
      (err) =>{
        // // console.log(err);
        this.tabTarifsSup = [];
      }
    )
  }

  // Vider tarif 
  viderChamps(){
    this.tarif.prix = "";
  }

  // Ajouter un tarif pour les sections
  ajoutTarifSection(){
    this.tarifSection.type = "tarif section";
    if (!this.tarifSection.prix){
      sweetAlertMessage("error", "", "Veuillez donner le prix pour les section ");
    } else{
      this.tarifService.addTarif(this.tarifSection).subscribe( 
        (data:any) =>{
          // console.log(data);
          sweetAlertMessage("success", "", data.message);
          this.listetarif();
          this.viderChamps();
        },
        (err) =>{
          // console.log(`Erreur lors de l'ajout ${err}`);
        }
      )
    }
  }

  // Ajouter un tarif pour les sections
  ajoutTarifEntreSection(){
    this.tarif.type = "tarif entre section";
    if (!this.tarif.prix){
      sweetAlertMessage("error", "", "Veuillez donner le prix d'augmentation entre les section ");
    } else{
      this.tarifService.addTarif(this.tarif).subscribe( 
        (data:any) =>{
          // console.log(data);
          // console.log(data);
          sweetAlertMessage("success", "", data.message);
          this.listetarif();
          this.viderChamps();
        },
        (err) =>{
          // console.log(`Erreur lors de l'ajout ${err}`);
        }
      )
    }
  }
  // Ajouter un tarif à vérifier 
  // ajouter(){
  //   // On vérifie si les champs sont vides 
  //   if (!this.tarif.type  || !this.tarif.prix){
  //     sweetAlertMessage("error", "", "Vueillez saisir les informations requises");
  //   } else{
  //     // On vérifie si le tarif n'existe pas déjà 
  //     let tarifExist = this.tabTarif.find((tarif:any) => tarif.type.toLowerCase() == this.tarif.type.toLowerCase());
  //     let tarifExist1 = this.tabTarifsSup.find((tarif:any) => tarif.type.toLowerCase() == this.tarif.type.toLowerCase());
  //     if(tarifExist){
  //       sweetAlertMessage("error", "", "le type de l'tarif doit être unique");
  //     }
  //     else if (tarifExist1) {
  //       sweetAlertMessage("error", "", "Ce type est déjà dans la corbeille. Vueillez le restaure");
  //     } 
  //     else{
  //       // // console.log(this.tarif.duree);
  //       this.tarifService.addTarif(this.tarif).subscribe( 
  //         (data:any) =>{
  //           // console.log(data);
  //           // // console.log(data.success);
  //           // if(data.success == false) {
  //           //   sweetAlertMessage("error", "", "Le prix doit etre suppérieur à 1000");
  //           // } else if(data.message) {
  //           //   sweetAlertMessage("success", "", data.message);
  //           //   this.listetarif();
  //           //   this.viderChamps();
  //           // }
  //         },
  //         (err) =>{
  //           // console.log(`Erreur lors de l'ajout ${err}`);
  //         }
  //       )
  //     }
  //   }
  // }

  // Modifier tarif 
  modifier(){ 
    if (!this.tarif.prix){
      sweetAlertMessage("error", "", "Vueillez saisir le prix");
    }  else{   
      this.tarifService.updateTarif(this.tarif.id, this.tarif).subscribe( 
        (data:any) =>{
          sweetAlertMessage("success", "", data.message);
          this.listetarif();
          this.viderChamps();
          this.isModifier=true;
        },
        (err) =>{
          // console.log (err)
  
        }
      )
    }
  }

  // Supprimer un tarif
  // supprimer(tarif:any){
  //   sweetMessageConfirm("Vous allez supprimer ce tarif", "Oui, je supprime").then( (result) =>{
  //     if(result.isConfirmed ){
  //       this.tarifService.deleteTarif(tarif.id).subscribe(
  //         (data:any) =>{
  //           // console.log(data);
  //           sweetAlertMessage("success", "", data.message);
  //           this.listetarif();
  //           this.listetarifSup();
  //         },
  //         (err) => {
  //           alert("Error");
  //           // console.log(err);
  //         }
  //       )
  //     }
  //   })
    
  // }

  // Restaurer un tarif 
  // restaurer(tarif:any){
  //   sweetMessageConfirm("Vous allez restaurer ce tarif", "Oui, je restaure").then( (result) =>{
  //     if(result.isConfirmed ){
  //       // tarif.etat = "actif";
  //       this.tarifService.restaureTarif(tarif.id).subscribe(
  //         (data:any) =>{
  //           // console.log(data);
  //           sweetAlertMessage("success", "", data.message);
  //           this.listetarif();
  //           this.listetarifSup();
  //         },
  //         (err) => {
  //           alert("Error");
  //           // console.log(err);
  //         }
  //       )
  //     }
  //   })
  // }


  // Supprimer d"finitivement ce tarif 
  // supprimerDefinitif(tarif:any){
  //   sweetMessageConfirm("Vous allez supprimer définitivement ce tarif", "Oui, je supprime").then( (result) =>{
  //     if(result.isConfirmed ){
  //       this.tarifService.deleteDefinitif(tarif.id).subscribe(
  //         (data:any) =>{
  //           sweetAlertMessage("success", "", data.message);
  //           this.listetarifSup();
  //         },
  //         (err) =>{
  //           // console.log(err);
  //         }
  //       )
  //     }
  //   })
  // }

  // Méthode pour vider la corbeille 
  viderCorbeille(){
      sweetMessageConfirm("Vous allez vider la corbeille", "Oui, je vide").then( (result) =>{
        if(result.isConfirmed ){
          this.tarifService.emptyTrash().subscribe(
            (data:any) =>{
              sweetAlertMessage("success", "", data.message);
              this.listetarifSup();
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

  // Méthode pour obTenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.tabFilter.length / this.itemsParPage);
  }
}
