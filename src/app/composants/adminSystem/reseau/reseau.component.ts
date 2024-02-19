import { Component, OnInit } from '@angular/core';
import { error } from 'highcharts';
import { Ligne } from 'src/app/models/ligne.model';
import { Reseau } from 'src/app/models/reseau.model';
import { SectionModel } from 'src/app/models/section.model';
import { Tarif } from 'src/app/models/tarif.model';
import { LigneService } from 'src/app/services/ligne.service';
import { ReseauService } from 'src/app/services/reseau.service';
import { SectionService } from 'src/app/services/section.service';
import { sweetAlertMessage, sweetMessageConfirm } from 'src/app/services/sweetAlert/alert.service';
import { TarifService } from 'src/app/services/tarif.service';
import { validateLengthField } from 'src/app/validation/validation';

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
  tabSections: SectionModel[] = [];
  tabSectionsFilter: any;

  prixSection : number = 0;
  prixEntreSection : number = 0;

  // Variable pour récupérer la saisie de la recherche 
  filterValue: string = "";

  reseau_id: number = 0;


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

  // Variable pour la vérification 
  verifMessageNom:string = "";
  isNomValide: boolean = false;

  // Déclaration des méthodes 
  constructor(
    private reseauService: ReseauService, 
    private ligneService: LigneService,
    private sectionService: SectionService,
    private tarifService: TarifService,
  ){}

  ngOnInit(): void {
    this.tabReaseauFilter = this.tabReseau;
    this.listeSections();
    this.getTarifPrix(1);
    this.listeLigne();
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

  getTarifPrix(reseau_id:any){
    this.tarifService.getAllTarif().subscribe(
      (data:any)=>{
        console.log(data);

        // On trouve le tarif du réseau 
        let tabTarif = data.tarifs.filter((tarif:any) => tarif.reseau_id == reseau_id);
        console.log(tabTarif);
        // On trouve le prix du tarif des section 
        let tarifSection = tabTarif.find((tarif:any) => tarif.type == "tarif section");
        if(tarifSection){
          this.prixSection = tarifSection.prix
        }

        // On trouve le prix du tarif entre section 
        let tarifEntreSection = tabTarif.find((tarif:Tarif) => tarif.type == "tarif entre section");
        if(tarifEntreSection){
          this.prixEntreSection = tarifEntreSection.prix;
        }
        console.log("Prix des section: ", this.prixSection);
        console.log("Prix entre section: ", this.prixEntreSection);
      }
    )
  }
  // Liste des sections
  listeSections(){
    this.sectionService.getAllSection().subscribe(
      (data:any) =>{
        // console.log(data);
        this.tabSections = data.sections;     
        console.log("Liste des sections",this.tabSections);
      }
    )
  }

  // Liste des lignes 
  listeLigne(){
    this.ligneService.getAllLigne().subscribe(
      (data:any) =>{
        this.tabLigne = data.lignes;
        console.log(this.tabSections);
        // Pour les sections enregistrés par l'administrateur réseau 
        for(let i = 0; i<this.tabLigne.length; i++){
          let tabSection = this.tabSections.filter((section:SectionModel) => parseInt(section.ligne_id) == this.tabLigne[i].id);
          console.log( "tabSection: ", tabSection)
          this.tabLigne[i].sections = tabSection;
          if(tabSection){
            for(let y = 0; y < tabSection.length; y++){
              tabSection[y].num = (y + 1).toString();
              tabSection[y].prix = this.prixSection;
            }   
            
            // console.log(tabSection);         
          }
          // On enregistre la dernière section qui est le debut et la fin de la ligne 
          if(tabSection.length) {
            let lastSection = new SectionModel;
            lastSection.depart = this.tabLigne[i].lieuDepart;
            lastSection.arrivee = this.tabLigne[i].lieuArrivee;
            lastSection.created_at = this.tabLigne[i].created_at;
            lastSection.created_by = this.tabLigne[i].created_by;
            lastSection.updated_at = this.tabLigne[i].updated_at;
            lastSection.updated_by = this.tabLigne[i].updated_by;
            lastSection.num = (tabSection.length + 1).toString();
            lastSection.prix = this.prixSection + ((tabSection.length - 1 )* this.prixEntreSection);

            // On ajoute la derniere section dans le tableau 
            tabSection.push(lastSection);
          }

          // this.tabLigne[i].sections = tabSection;

          console.log(this.tabLigne[i].sections );
        }
      }
    )
    
    // this.ligneService.getAllLignegReseau().subscribe(
    //   (data:any) =>{
    //     console.log(data);

    //     this.tabLigne = data.lignes;
        

        

        
    //   }
    // )
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
      (elt:any) => (elt?.lieuDepart.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.lieuArrivee.toLowerCase().includes(this.filterValue.toLowerCase())) 
    );
  }

  // Methode de recherche pour les sections 
  onSearchSections(){
    // Recherche se fait selon le nom ou le prenom 
    this.tabSectionsFilter = this.tabSections.filter(
      (elt:any) => (elt?.depart.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.arrivee.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.prix.toString().toLowerCase().includes(this.filterValue.toLowerCase()))
    );
  }

  // Rechercher les lignes 

  // Voir Formulaire d'ajout 
  showAjoutReseau(){
    this.isAjout = true;
    this.isModifier = false;
  }

  // Vérification du nom de la ligne 
  verifNomFunction(nom:any){
    this.verifMessageNom = "";
    this.isNomValide = validateLengthField(nom, 3);;
    let roleExist = this.tabReseauxActifs.find((role:any) => role.nom.toLowerCase() == nom.toLowerCase());

    let roleExist1 = this.tabReseauxSup.find((ligne:any) => ligne.nom.toLowerCase() == nom.toLowerCase());

    if (!nom){
      this.verifMessageNom = "Le nom du role est obligatoire";
    } else if (!this.isNomValide){
      this.verifMessageNom = "Le nom du role doit etre supérieure ou égale à 3";
    }else if (roleExist1) {
      this.verifMessageNom = "Ce nom de role est déjà dans la corbeille. Vueillez le restaure";
    } else if (roleExist){
      this.verifMessageNom = "Ce nom  existe déja";
    } else {
      this.verifMessageNom = "";
    }
  }

  // Ajouter un réseau 
  ajoutReseau(){
    this.verifNomFunction(this.reseau.nom);
    if(this.isNomValide){
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

  // Liste des réseaux 
  listeReseau(){
    this.reseauService.getAllReseaux().subscribe(
      (data:any) =>{
        console.log (data)
        this.tabReseauxActifs = this.tabReseauxActifsFilter = data.reseaux;
        for (let i= 0; i< this.tabReseauxActifs.length; i++){
          this.tabReseauxActifs[i].lignes =  this.tabLigne.filter((ligne:Ligne) => ligne.reseau_id == this.tabReseauxActifs[i].id)
        }
        console.log(this.tabReseauxActifs);
      },
      (error) =>{
        console.log (error);
        this.tabReseauxActifs = []
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

  // Vérif pour la modification 
  verifModifNomFunction(nom:any){
    this.verifMessageNom = "";
    this.isNomValide = validateLengthField(nom, 3);
    if (!nom){
      this.verifMessageNom = "Le nom du role est obligatoire";
    } else if (!this.isNomValide){
      this.verifMessageNom = "Le nom du role doit etre supérieure ou égale à 3";
    } else {
      this.verifMessageNom = "";
    }
  }
  // Modifier un réseau 
  modifReseau(){
    this.verifModifNomFunction(this.reseau.nom)
    if(this.isNomValide){
      sweetMessageConfirm("Vous allez modifier ce réseau", "Oui je modifie").then( (result) =>{
        if(result.isConfirmed ){
          let nomReseau = {"nom": this.reseau.nom}
          this.reseauService.updateReseau(this.reseau.id, nomReseau).subscribe(
            (data:any) =>{
              // console.log(data);
              sweetAlertMessage("success", "", data.message);
              this.reseau.nom = "";
              this.showAjoutReseau();
            },
            (err) =>{
              console.log(err);
              
            }
          )
        }
      })
    }
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
        this.tabReseauxSup = [];
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