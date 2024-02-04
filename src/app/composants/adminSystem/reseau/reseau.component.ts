import { Component, OnInit } from '@angular/core';
import { error } from 'highcharts';
import { Ligne } from 'src/app/models/ligne';
import { Reseau } from 'src/app/models/reseau.model';
import { ReseauService } from 'src/app/services/reseau.service';
import { sweetAlertMessage, sweetMessageConfirm } from 'src/app/services/sweetAlert/alert.service';

@Component({
  selector: 'app-reseau',
  templateUrl: './reseau.component.html',
  styleUrls: ['./reseau.component.css']
})
export class ReseauComponent implements OnInit {
  // Déclaration des variables 
  tabReseau: any [] = [
    {
      id: 1, 
      nom:"Dakar Dem Dikk",
      lignes: [ 
        {
          id: 1,
          numLigne: 1,
          depart: "Yoff",
          arrivee: "Petersen",
          sections: [
            {
              numSection: "1",
              debut: "Yoff",
              fin: "oukam",
              prix: 150
            },
            {
              numSection: "2",
              debut: "oukam",
              fin: "petersen",
              prix: 150
            },
            {
              numSection: "3",
              debut: "Yoff",
              fin: "pertersen",
              prix: 200
            },


          ]
        },
        {
          id: 2,
          numLigne: 2,
          depart: "Yoff",
          arrivee: "Petersen",
          sections: []
        },
        {
          id: 3,
          numLigne: 7,
          depart: "Ouakam",
          arrivee: "Petersen",
          sections: []
        }

      ] ,
      description: "dhdhhdhd",
    },
    {
      id: 2, 
      nom:"AFTU",
      lignes: [],
      description: "dhdhhdhd"
    },
    {
      id: 3, 
      nom:"DDD",
      lignes: [],
      description: "dhdhhdhd"
    },
    {
      id: 4, 
      nom:"Dakar",
      lignes: [],
      description: "dhdhhdhd"
    },
    {
      id: 5, 
      nom:"AFTU",
      lignes: [],
      description: "dhdhhdhd"
    },
    {
      id: 6, 
      nom:"DDD",
      lignes: [],
      description: "dhdhhdhd"
    },
    {
      id: 7, 
      nom:"Dakar Dem Dikk",
      lignes: [],
      description: "dhdhhdhd"
    },
    {
      id: 8, 
      nom:"AFTU",
      lignes: [],
      description: "dhdhhdhd"
    },
    {
      id: 9, 
      nom:"DDD",
      lignes: [],
      description: "dhdhhdhd"
    },
  ];

  // Voir entre liste des réseaux, des lignes du réseaux et des sections de la ligne 
  isListeReseaux:boolean = true;
  isListeLignes:boolean = false;
  isListeSections:boolean = false;
  isListeCorbeille:boolean = false;

  // Variables pour les réseaux 
  reseau= new Reseau; 
  tabReaseauFilter: any;

  // Attribut pour ajouter ou modifier 
  isAjout: boolean = true;
  isModifier: boolean = false;

  // Variables pour les lignes 
  tabLigne: Ligne[] = [];
  tabLignesFilter: any;
  ligne = new Ligne;

  // Variables pour les sections 
  tabSections: any[];
  tabSectionsFilter: any;

  // Variable pour récupérer la saisie de la recherche 
  filterValue: string = "";


  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle

  // Le tableau filtrer peu importe la liste 
  tabFilter:Reseau[] = [];

  // Déclarations des variables à utiliser avec les services 
  tabReseauxActifs : Reseau[] = []
  tabReseauxActifsFilter : Reseau[] = []

  tabReseauxSup : Reseau[] = []
  tabReseauxSupFilter : Reseau[] = []

  // Déclaration des méthodes 
  constructor(private reseauService: ReseauService){}

  ngOnInit(): void {
    this.tabReaseauFilter = this.tabReseau;
    this.listeReseau();
    this.listeCorbeille();
  }

  // Voir le liste des reseaux 
  showListeReseaux(){
    this.isListeReseaux = true;
    this.isListeLignes = false;
    this.isListeSections = false;
    this.isListeCorbeille = false;
  }

  // Voir le liste des lignes 
  showListeLignes(element: any){
    this.isListeLignes = true;
    this.isListeReseaux = false;
    this.isListeSections = false;
    this.isListeCorbeille = false;
    this.reseau = element;
    this.tabLigne = this.reseau.lignes;
    this.tabLignesFilter = this.tabLigne;
  }

  // Voir le liste des sections 
  showListeSections(element:any){
    this.isListeSections = true;
    this.isListeLignes = false;
    this.isListeReseaux = false;
    this.isListeCorbeille = false;
    this.ligne = element;
    this.tabSections = element.sections;
    this.tabSectionsFilter = this.tabSections;
  }

  // Voir la corbeille 
  showListeCorbeille(){
    this.isListeCorbeille = true;
    this.isListeReseaux = false;
    this.isListeLignes = false;
    this.isListeSections = false;
  }

  // Methode de recherche automatique pour les reseaux
  onSearch(){
    // Recherche se fait selon le nom ou le prenom 
    this.tabReseauxActifsFilter = this.tabReseauxActifs.filter(
      (elt:any) => (elt?.nom.toLowerCase().includes(this.filterValue.toLowerCase())) 
    );
  }

  // Methode de recherche automatique pour les reseaux
  onSearchCorbeille(){
    // Recherche se fait selon le nom ou le prenom 
    this.tabReseauxSupFilter = this.tabReseauxSup.filter(
      (elt:any) => (elt?.nom.toLowerCase().includes(this.filterValue.toLowerCase())) 
    );
  }

  // Methode de recherche pour les lignes 
  onSearchLignes(){
    // Recherche se fait selon le nom ou le prenom 
    this.tabLignesFilter = this.tabLigne.filter(
      (elt:any) => (elt?.depart.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.numLigne.toString().toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.arrivee.toLowerCase().includes(this.filterValue.toLowerCase())) 
    );
  }

  // Methode de recherche pour les sections 
  onSearchSections(){
    // Recherche se fait selon le nom ou le prenom 
    this.tabSectionsFilter = this.tabSections.filter(
      (elt:any) => (elt?.debut.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.fin.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.prix.toString().toLowerCase().includes(this.filterValue.toLowerCase()))
    );
  }

  // Rechercher les lignes 

  // Voir Formulaire d'ajout 
  showAjoutReseau(){
    this.isAjout = true;
    this.isModifier = false;
  }

  // Ajouter un réseau 
  ajoutReseau(){
    if(!this.reseau.nom){
      sweetAlertMessage("error", "", "Le nom est obligatoire")
    } else{
      // On vérifie si le réseau n'existe pas déjà 
      let reseauExiste = this.tabReseauxActifs.find((element) => element.nom == this.reseau.nom);
      if(reseauExiste){
        sweetAlertMessage("success", "", "Ce nom est déjà pris");
      } else {
        let reseauAdd = {
          nom: this.reseau.nom
        }
        this.reseauService.addReseau(reseauAdd).subscribe(
          (data:any)=>{
            console.log(data);
            sweetAlertMessage("success", "", data.message);
            this.reseau.nom = "";
            this.reseau.description = "";
            this.listeReseau();
          },
          (error) =>{
            console.log(error);
            
          }
        )
      }
    }
  }

  // Liste des réseaux 
  listeReseau(){
    this.reseauService.getAllReseaux().subscribe(
      (data:any) =>{
        console.log (data)
        this.tabReseauxActifs = this.tabReseauxActifsFilter = data.reseaux;
        console.log(this.tabReseauxActifs);
        console.log(this.tabReseauxActifsFilter.length);
      },
      (error) =>{
        console.log (error)
      }
    )
  }

  // showModifReseauForm()

  // Voir Formulaire de modification 
  showModifReseau(element:any){
    this.isAjout = false;
    this.isModifier = true;
    this.reseau = element;
  }

  // Modifier un réseau 
  modifReseau(){
    sweetMessageConfirm("Vous allez modifier ce réseau", "Oui je modifie").then( (result) =>{
      if(result.isConfirmed ){
        let nomReseau = {"nom": this.reseau.nom}
        this.reseauService.updateReseau(this.reseau.id, nomReseau).subscribe(
          (data:any) =>{
            // console.log(data);
            sweetAlertMessage("success", "", data.message);
            this.reseau.nom = "";
          },
          (err) =>{
            console.log(err);
            
          }
        )
      }
    })
  }

  // Supprimer un reseau
  supprimerReseau(reseau:any){
    sweetMessageConfirm("Vous allez supprimer ce reseau", "Oui, je supprime").then( (result) =>{
      if(result.isConfirmed ){
        this.reseauService.deleteReseau(reseau.id).subscribe(
          (data:any) =>{
            console.log(data);
            sweetAlertMessage("success", "", data.message);
            this.listeReseau();
            this.listeCorbeille();
          },
          (err) => {
            alert("Error");
            console.log(err);
          }
        )
      }
    })
    
  }


  // Liste des reseaux dans la corbeille 
  listeCorbeille(){
    this.reseauService.getReseauxDeleted().subscribe(
      (data:any)=>{
        console.log(data);
        this.tabReseauxSup = this.tabReseauxSupFilter = data.reseaux;      
      },
      (error) =>{
        console.log(error);
        
      }
    )
  }

  
  // Restaurer un reseau 
  restaureReeseau(reseau:any){
    sweetMessageConfirm("Vous allez restaurer ce réseau", "Oui, je restaure").then( (result) =>{
      if(result.isConfirmed ){
        this.reseauService.restaureReseau(reseau.id).subscribe(
          (data:any) =>{
            console.log(data);
            sweetAlertMessage("success", "", data.message);
            this.listeReseau();
            this.listeCorbeille();
          },
          (err) => {
            alert("Error");
            console.log(err);
          }
        )
      }
    })
  }

  // Supprimer definitivemenent un reseau 
  supprimerDefinitif(reseau:any){
    sweetMessageConfirm("Vous allez supprimer définitivement ce réseau", "Oui, je supprime").then( (result) =>{
      if(result.isConfirmed ){
        this.reseauService.deleteDefinitif(reseau.id).subscribe(
          (data:any) =>{
            console.log(data);
            sweetAlertMessage("success", "", data.message);
            this.listeReseau();
            this.listeCorbeille();
          },
          (err) => {
            alert("Error");
            console.log(err);
          }
        )
      }
    })
  }
  
  // Vider la corbeille 
  viderCorbeille(){
    sweetMessageConfirm("Vous allez vider la corbeille", "Oui, je vide").then( (result) =>{
      if(result.isConfirmed ){
        this.reseauService.emptyTrash().subscribe(
          (data:any) =>{
            sweetAlertMessage("success", "", data.message);
            this.listeCorbeille();
          }
        )
      }
    })
  }

  // Les détails du reseau 
  showDetailsReseau(element:any){
    this.reseau = element;
  }
  // chargerInfosReseau(element:any){
  //   this.reseau = element;
  // }



  // Pagination 
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  // getItemsPage(): any[] {
  //   const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
  //   const indexFin = indexDebut + this.itemsParPage;
  //   return this.tabReseauxActifsFilter.slice(indexDebut, indexFin);
  // }

  // // Méthode pour générer la liste des pages
  // get pages(): number[] {
  //   const totalPages = Math.ceil(this.tabReaseauFilter.length / this.itemsParPage);
  //   return Array(totalPages).fill(0).map((_, index) => index + 1);
  // }
  
  // // Méthode pour obtenir le nombre total de pages
  // get totalPages(): number {
  //   return Math.ceil(this.tabReaseauFilter.length / this.itemsParPage);
  // }

  
  // Pagination pour tous les tableaux de manières automatique
  getItemsPage(tabFilter:any[]){
    const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
    const indexFin = indexDebut + this.itemsParPage;
    this.tabFilter = tabFilter;
    return tabFilter.slice(indexDebut, indexFin);

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