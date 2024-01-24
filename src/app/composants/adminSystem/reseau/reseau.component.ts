import { Component, OnInit } from '@angular/core';
import { Ligne } from 'src/app/models/ligne';
import { Reseau } from 'src/app/models/reseau';

@Component({
  selector: 'app-reseau',
  templateUrl: './reseau.component.html',
  styleUrls: ['./reseau.component.css']
})
export class ReseauComponent implements OnInit {
  // Déclaration des variables 
  tabReseau: Reseau [] = [
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
  tabFilter:any[] = [];


  // Déclaration des méthodes 
  constructor(){}

  ngOnInit(): void {
    this.tabReaseauFilter = this.tabReseau;
    
  }

  // Voir le liste des reseaux 
  showListeReseaux(){
    this.isListeReseaux = true;
    this.isListeLignes = false;
    this.isListeSections = false;
  }

  // Voir le liste des lignes 
  showListeLignes(element: any){
    this.isListeLignes = true;
    this.isListeReseaux = false;
    this.isListeSections = false;
    this.reseau = element;
    this.tabLigne = this.reseau.lignes;
    this.tabLignesFilter = this.tabLigne;
  }

  // Voir le liste des sections 
  showListeSections(element:any){
    this.isListeSections = true;
    this.isListeLignes = false;
    this.isListeReseaux = false;
    this.ligne = element;
    this.tabSections = element.sections;
    this.tabSectionsFilter = this.tabSections;
  }

  // Methode de recherche automatique pour les reseaux
  onSearch(){
    // Recherche se fait selon le nom ou le prenom 
    this.tabReaseauFilter = this.tabReseau.filter(
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

  // showModifReseauForm()

  // Voir Formulaire de modification 
  showModifReseau(element:any){
    this.isAjout = false;
    this.isModifier = true;
    this.reseau = element;

  }

  // Les détails du reseau 
  showDetailsReseau(element:any){
    this.reseau = element;
    alert(this.reseau.nom)
  }
  // chargerInfosReseau(element:any){
  //   this.reseau = element;
  // }



  // Pagination 
  // Méthode pour déterminer les articles à afficher sur la page actuelle
  // getItemsPage(): any[] {
  //   const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
  //   const indexFin = indexDebut + this.itemsParPage;
  //   return this.tabReaseauFilter.slice(indexDebut, indexFin);
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
  getItemsPage(tabFilter:any){
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