import { Component, OnInit } from '@angular/core';
import { TypeLigne } from 'src/app/models/typeLigne.model';
import { sweetAlertMessage, sweetMessageConfirm } from 'src/app/services/sweetAlert/alert.service';
import { TypeLigneService } from 'src/app/services/typeLigne.service';
import { validateLengthField } from 'src/app/validation/validation';
import { Loading, Notify } from 'notiflix';


@Component({
  selector: 'app-type-ligne',
  templateUrl: './type-ligne.component.html',
  styleUrls: ['./type-ligne.component.css']
})
export class TypeLigneComponent implements OnInit {
  // Toutes les lignes 
  allTypeLign: TypeLigne[] = [];

  // Les lignes actifs 
  tabTypeLigne: TypeLigne[] = [];
  tabTypeLigneFilterActifs: TypeLigne[] = [];

  // Tableau des TypeLignes supprimés
  tabTypeLignesSup: TypeLigne [] = []; 
  tabTypeLigneFilterSup: TypeLigne[] = [];

  typeLigne = new TypeLigne;
  filterValue: string = "";
  // nomTypeLigne: string = "";

  // Attribut pour ajouter ou modifier 
  isAjout: boolean = true;
  isModifier: boolean = false;

  // Attribut pour voir la liste ou la corbeille
  isActifs: boolean = true; 
  isSup: boolean = false; 

  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle

  // Le tableau filtrer peu importe la liste 
  tabFilter:any[] = [];

  verifNameTypeLigne:boolean = false;
  verifMessageLigne: string = "";

  constructor(private typeLigneService: TypeLigneService){}

  

  // Déclaration des méhodes 
  ngOnInit(): void {
    // On charge les TypeLignes à l'initialisation 
    this.listeTypeLignes();

    this.listeTypeLignesSup();

  }

  // Voir la liste des TypeLignes actifs 
  showTypeLignesActifs(){
    this.isActifs = true;
    this.isSup = false;
    this.filterValue = "";
    // this.viderChamps();
  }

  // Voir la liste des TypeLignes supprime 
  showCorbeille(){
    this.isSup = true;
    this.isActifs = false;
    this.filterValue = "";
    // this.viderChamps();
    this.listeTypeLignesSup();
  }

  // Methode de recherche automatique pour les reseaux
  onSearch(){
    // Recherche se fait selon le nom ou le prenom 
    this.tabTypeLigneFilterActifs = this.tabTypeLigne.filter(
      (elt:any) => (elt?.nom.toLowerCase().includes(this.filterValue.toLowerCase()))   
    );
  }

  // Recheche pour les TypeLignes actifs ou inactifs
  onSearchTypeLigneSup(){
    // Recherche se fait selon le nom ou le prenom 
    this.tabTypeLigneFilterSup = this.tabTypeLignesSup.filter(
      (elt:any) => (elt?.nom.toLowerCase().includes(this.filterValue.toLowerCase()))   
    );
  }

  // Voir Formulaire d'ajout 
  showAjoutTypeLigne(){
    this.isAjout = true;
    this.isModifier = false;
  }

  // showModifTypeLigneForm()

  // Voir Formulaire de modification 
  showModifTypeLigne(element:any){
    this.isAjout = false;
    this.isModifier = true;
    this.typeLigne = element;
    this.viderChamps();
  }
  

  // Les détails du TypeLigne 
  showDetailsTypeLigne(element:any){
    this.typeLigne = element;
  }

  // Liste des tous les TypeLignes 
  listeTypeLignes(){
    Loading.dots();
    this.typeLigneService.getTypesLigneReseau().subscribe(
      (data:any) =>{
        // // console.log(data);
        if(data.types){
          this.tabTypeLigne = data.types;
          this.tabTypeLigneFilterActifs = this.tabTypeLigne;
        } else{
          this.tabTypeLigne = [];
        }
        Loading.remove();
      }
    )
  }

  // Liste des TypeLignes supprimés 
  listeTypeLignesSup(){
    Loading.dots();
    this.typeLigneService.gettypeLignexDeleted().subscribe(
      (data:any) =>{
        if(data.types){
          this.tabTypeLignesSup = this.tabTypeLigneFilterSup = data.types;
        } else {
          this.tabTypeLignesSup = [];
          Loading.remove();
        }
      },
      (err) =>{
        // console.log(err);
        this.tabTypeLignesSup = [];
        Loading.remove();
      }
    )
  }

  // On vérifie le type de ligne 
  verifNameFunction(){
    this.verifNameTypeLigne = validateLengthField(this.typeLigne.nom, 2);
    if(!this.typeLigne.nom ) {
      this.verifMessageLigne = " Le nom est obligatoire";
    }
    else if (!this.verifNameTypeLigne){
      this.verifMessageLigne = " La longueur doit etre supérieur ou égale à 2";
    } else {
      this.verifMessageLigne = "";
    }
  }

  // On vide les champs 
  viderChamps(){
    this.verifMessageLigne = "";
    this.verifNameTypeLigne = false; 
  }

  // Ajouter un TypeLigne 
  ajoutTypeLigne(){

    this.verifNameFunction();
    // On vérifie si les champs sont vides 
    if (this.verifNameTypeLigne){
      // On vérifie si le TypeLigne n'existe pas déjà 
      let typeLigneExist = this.tabTypeLigne.find((typeLigne:any) => typeLigne.nom.toLowerCase() == this.typeLigne.nom.toLowerCase());
      let typeLigneExist1 = this.tabTypeLignesSup.find((typeLigne:any) => typeLigne.nom.toLowerCase() == this.typeLigne.nom.toLowerCase());
      if(typeLigneExist){
        this.verifMessageLigne = "Un type de ligne a dèjà ce nom";
        // sweetAlertMessage("error", "", "Un type de ligne a dèjà ce nom");
      }
      else if (typeLigneExist1) {
        this.verifMessageLigne = "Un type de ligne a dèjà ce nom dans la corbeille";
        // sweetAlertMessage("error", "", "Un type de ligne a dèjà ce nom dans la corbeille");
      }
      // if (typeLigneExist || typeLigneExist1){
      //   sweetAlertMessage("error", "", "Ce type de ligne est déjà enregistré");
      // } 
      else{
        // let nom = {"nom": this.nomTypeLigne}
        this.typeLigneService.addTypeLigne(this.typeLigne).subscribe( 
          (data:any) =>{
            // console.log(data);
            sweetAlertMessage("success", "", data.message);
            this.listeTypeLignes();
            this.typeLigne.nom = "";
            this.typeLigne.description = "";
          },
          (err) =>{
            // console.log(`Erreur lors de l'ajout`);
            // console.log(err);
            
          }
        )
      }
    }
  }

  // Modifier TypeLigne 
  modifierTypeLigne(){
    // On vérifie si le TypeLigne n'existe pas déjà 
    // let TypeLigneExist = this.tabTypeLigne.find((typeLigne:any) => typeLigne.nom.toLowerCase() == this.typeLigne.nom.toLowerCase());
    // if (TypeLigneExist){
    //   sweetAlertMessage("error", "", "Ce TypeLigne est déjà enregistré");
    // } else{
    //   // let nom = {"nom": this.typeLigne.nom} 
    
    // }
    this.typeLigneService.updateTypeLigne(this.typeLigne.id, this.typeLigne).subscribe( 
      (resp:any) =>{
        sweetAlertMessage("success", "", resp.message);
        this.listeTypeLignes();
        // this.typeLigne.nom = "";
        this.typeLigne.nom = "";
        this.typeLigne.description = "";
        this.showAjoutTypeLigne();
      },
      (err) =>{
        // console.log (err)

      }
    )
  }

  // Supprimer un TypeLigne
  supprimerTypeLigne(typeLigne:any){
    sweetMessageConfirm("Vous allez supprimer ce TypeLigne", "Oui, je supprime").then( (result) =>{
      if(result.isConfirmed ){
        this.typeLigneService.deleteTypeLigne(typeLigne.id).subscribe(
          (data:any) =>{
            // console.log(data);
            sweetAlertMessage("success", "", data.message);
            this.listeTypeLignes();
            this.listeTypeLignesSup();
          },
          (err) => {
            alert("Error");
            // console.log(err);
          }
        )
      }
    })
    
  }

  // Restaurer un TypeLigne 
  restaureTypeLigne(typeLigne:any){
    sweetMessageConfirm("Vous allez restaurer ce TypeLigne", "Oui, je restaure").then( (result) =>{
      if(result.isConfirmed ){
        // typeLigne.etat = "actif";
        this.typeLigneService.restaureTypeLigne(typeLigne.id).subscribe(
          (data:any) =>{
            // console.log(data);
            sweetAlertMessage("success", "", data.message);
            this.listeTypeLignes();
            this.listeTypeLignesSup();
          },
          (err) => {
            alert("Error");
            // console.log(err);
          }
        )
      }
    })
  }


  // Supprimer d"finitivement ce TypeLigne 
  supprimerDefinitif(typeLigne:any){
    sweetMessageConfirm("Vous allez supprimer définitivement ce TypeLigne", "Oui, je supprime").then( (result) =>{
      if(result.isConfirmed ){
        this.typeLigneService.deleteDefinitif(typeLigne.id).subscribe(
          (data:any) =>{
            sweetAlertMessage("success", "", data.message);
            this.listeTypeLignesSup();
          },
          (err) =>{
            // console.log(err);
          }
        )
        // this.typeLigneService.restaureTypeLigne(TypeLigne.id).subscribe(
        //   (data) =>{
        //     // console.log(data);
        //     response = data;
        //     sweetAlertMessage("success", "", response.message);
        //     this.listeTypeLignes();
        //   },
        //   (err) => {
        //     alert("Error");
        //     // console.log(err);
        //   }
        // )
      }
    })
  }

  // Méthode pour vider la corbeille 
  viderCorbeille(){
      sweetMessageConfirm("Vous allez vider la corbeille", "Oui, je vide").then( (result) =>{
        if(result.isConfirmed ){
          this.typeLigneService.emptyTrash().subscribe(
            (data:any) =>{
              sweetAlertMessage("success", "", data.message);
              this.listeTypeLignesSup();
            }
          )
        }
      })
  }
  // Pagination pour tous les tableaux de manières automatique
  // getItemsPage(){
  //   const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
  //   const indexFin = indexDebut + this.itemsParPage;
  //   return this.tabTypeLigneFilter.slice(indexDebut, indexFin);

  // }


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
