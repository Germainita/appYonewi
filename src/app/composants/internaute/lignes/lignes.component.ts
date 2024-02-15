import { Component, OnInit } from '@angular/core';
import { Ligne } from 'src/app/models/ligne.model';
import { SectionModel } from 'src/app/models/section.model';
import { Tarif } from 'src/app/models/tarif.model';
import { TypeLigne } from 'src/app/models/typeLigne.model';
import { LigneService } from 'src/app/services/ligne.service';
import { ReseauService } from 'src/app/services/reseau.service';
import { SectionService } from 'src/app/services/section.service';
import { TarifService } from 'src/app/services/tarif.service';
import { TypeLigneService } from 'src/app/services/typeLigne.service';

@Component({
  selector: 'app-lignes',
  templateUrl: './lignes.component.html',
  styleUrls: ['./lignes.component.css']
})
export class LignesComponent implements OnInit{
  // Déclaration des variables 
  isUrbaine:boolean = true;
  isBanlieue:boolean = false;
  isAIBD:boolean = false;

  // Les inputs pour rechercher depart et arricher 
  departInput: string = "";
  arriveeInput: string = "";
  isSerach: boolean = false;

  // Les réseaux 
  tabReseauxActifs: any [] = [];
  idAftu: number = 0;
  idDemDikk: number = 0;

  // Pour ce qui concerne les lignes 
  // Les lignes actifs 
  tabLigne: Ligne[] = [];
  tabLigneFilterActifs: Ligne[] = [];
  ligneObject = new Ligne; 

  tabAftu: Ligne[] = [];
  tabLigneAftuFilter: Ligne[] = [];
  tabLigneAftu: Ligne[] = [];
  
  tabLigneDemDikk: Ligne[] = [];
  tabLigneDemDikkFilter: Ligne[] = [];

  // Les Sections actifs 
  tabSection: SectionModel[] = [];

  // Les tarifs 
  tabTarif: Tarif[] = [];
  tarif_id :number = 0;
  prixSection :number = 0;
  prixEntreSection :number = 0;

  prixSectionAftu :number = 0;
  prixEntreSectionAftu :number = 0;

  prixSectionDemDikk :number = 0;
  prixEntreSectionDemDikk :number = 0;


  tabTypeLigne: TypeLigne[] = [];
  idUrbaine: number = 0;
  idBanlieu: number = 0;
  idDiamniadio: number = 0;

  // Le tableau filtrer peu importe la liste 
  tabFilter:any[] = [];
  filterValue: string = "";
  filterValueDemDikk: string = "";

  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle

  messageInfo: string = "";

  isAll: boolean = true;

  
// Déclaration des méthodes 
  constructor(
    private reseauService: ReseauService,
    private ligneService: LigneService, 
    private sectionService: SectionService,
    private tarifService: TarifService, 
    private typeLigneService: TypeLigneService,
  ){}

  ngOnInit(): void {
    this.listeReseau();
    this.listetarif();
    this.listeSections();
    this.listeLigne();
    this.listeTypeLigne();
    // this.listeSectionLigneAftu();
    
    if (!localStorage.getItem("lignesAftu")){
      localStorage.setItem("lignesAftu", JSON.stringify(this.tabAftu));  
    }

    this.tabLigneAftu = JSON.parse(localStorage.getItem("lignesAftu") || "");
    console.log("Les lignes de AFTU", this.tabLigneAftu);


  }
  
  // Liste des réseaux 
  listeReseau(){
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
    )
  }

  // Liste des tarifs des réseau 
  listetarif(){
    this.tarifService.getAllTarif().subscribe(
      (data:any) =>{
        console.log(data);
        this.tabTarif = data.tarifs;

        // Les tarifs de AFTU 
        // Tarif des section : 
        let tarifSectionAftu = this.tabTarif.find((tarif:any) => (tarif.type.toLowerCase() == "tarif section") && (tarif.reseau_id == this.idAftu));
        if(tarifSectionAftu){
          this.prixSectionAftu = parseInt(tarifSectionAftu.prix);
          // console.log("Tarif des section du reseau AFTU", this.prixSectionAftu);
        }

        // Tarif des entre section : 
        let tarifEntreSectionAftu = this.tabTarif.find((tarif:any) => (tarif.type.toLowerCase() == "tarif entre section") && (tarif.reseau_id == this.idAftu));
        if(tarifEntreSectionAftu){
          this.prixEntreSectionAftu = parseInt(tarifEntreSectionAftu.prix);
          // console.log("Tarif entre section du reseau AFTU", this.prixEntreSectionAftu);
        }

        // Les tarifs de Dakar Dem Dikk 
        // Tarif des section : 
        let tarifSectionDemDikk = this.tabTarif.find((tarif:any) => (tarif.type.toLowerCase() == "tarif section") && (tarif.reseau_id == this.idDemDikk));
        if(tarifSectionDemDikk){
          this.prixSectionDemDikk = parseInt(tarifSectionDemDikk.prix);
          // console.log("Tarif des section du reseau DemDikk", this.prixSectionDemDikk);
        } 

        // Tarif des entre section : 
        let tarifEntreSectionDemDikk = this.tabTarif.find((tarif:any) => (tarif.type.toLowerCase() == "tarif entre section") && (tarif.reseau_id == this.idDemDikk));
        if(tarifEntreSectionDemDikk){
          this.prixEntreSectionDemDikk = parseInt(tarifEntreSectionDemDikk.prix);
          // console.log("Tarif entre section du reseau DemDikk", this.prixEntreSectionDemDikk);
        }

        // let tarifSectionExist = this.tabTarif.find((tarif:any) => tarif.type.toLowerCase() == "tarif section");
        // if (tarifSectionExist){
        //   this.isTarifSection = true;
        // }

        // let tarifEntreSectionExist = this.tabTarif.find((tarif:any) => tarif.type.toLowerCase() == "tarif entre section");
        // if (tarifEntreSectionExist){
        //   this.isTarifEntreSection = true;
        // }

        
      }
    )
  }
  
  // les sections 
  // Liste des sections
  listeSections(){
    this.sectionService.getAllSection().subscribe(
      (data:any) =>{
        console.log(data);
        this.tabSection = data.sections;    
        this.isAll = false;   
      }
    )
  }

  // Liste des tous les Ligne 
  listeLigne(){
    this.messageInfo = "";
    this.ligneService.getAllLigne().subscribe(
      (data:any) =>{
        // console.log(data);

        this.tabLigne = this.tabLigneFilterActifs = data.lignes;

        // Les infos du réseau de AFTU 
        this.tabAftu = this.tabLigneAftuFilter = this.tabLigneFilterActifs.filter((element:any)=> element.reseau_id == this.idAftu);
        
        // console.log("Liste des lignes du reseau AFTU ",this.tabAftu);

        // this.tabAftu = this.tabSectionLigneFunction(tabAftu, this.prixSectionAftu, this.prixEntreSectionAftu);
        // console.log("Liste des lignes du reseau AFTU avec prix ",this.tabAftu);

        // Les infos du réseau de Dakar Dem Dikk 
        this.tabLigneDemDikk = this.tabLigneDemDikkFilter = this.tabLigneFilterActifs.filter((element:any)=> element.reseau_id == this.idDemDikk);
        console.log("Liste des lignes du reseau LigneDemDikk ",this.tabLigneDemDikk);

        
        
        
        // Algorithme pour avoir les différentes section d'une ligne avec le prix pour aftu
        for(let i = 0; i<this.tabAftu.length; i++){
          let tabSectionLigne:any[]=[];
          // On stocke d'abord le point de départ de la ligne comme premier élément du tableau pour la ligne;
          tabSectionLigne.push(this.tabAftu[i].lieuDepart);


          // Si des sections on été enregistré, on récupère les section de la ligne
          let tabSection: SectionModel[] = [];
          tabSection = this.tabSection.filter((section:any) => section.ligne_id == this.tabAftu[i].id);
          if(tabSection){
            // On prend les debut des sections sauf le premier qui est déjà enregistré
            for(let y = 1; y < tabSection.length; y++){
              tabSection[y].num = `${y+1}`;
              // console.log(tabSection[y].depart);
              
              tabSectionLigne.push(tabSection[y].depart)
            }
          }
          tabSectionLigne.push(this.tabAftu[i].lieuArrivee); // Stocke en dernier le lieu d'arrivé de la ligne;

          // console.log("Le tableau des sections test", tabSectionLigne);  
          // On stocke l'itinéraire dans le tableau des itinéraires de la ligne 
          this.tabAftu[i].itineraires = tabSectionLigne;   
          // console.log(this.tabAftu[i]);
                           

          // On a le tableau, on peut maintenant faire l'algo avec les prix 
          // let tabSectionPrix = this.calculPrixSection(tabSectionLigne);
          // console.log(tabSectionPrix);   
          this.tabAftu[i].sections = this.tabLigneAftuFilter[i].sections = this.calculPrixSection(tabSectionLigne, this.prixSectionAftu, this.prixEntreSectionAftu);
        }
        
        // Algorithme pour avoir les différentes section d'une ligne avec le prix pour Demdikk
        for(let i = 0; i<this.tabLigneDemDikk.length; i++){
          let tabSectionLigne:any[]=[];
          // On stocke d'abord le point de départ de la ligne comme premier élément du tableau pour la ligne;
          tabSectionLigne.push(this.tabLigneDemDikk[i].lieuDepart);


          // Si des sections on été enregistré, on récupère les section de la ligne
          let tabSection: SectionModel[] = [];
          tabSection = this.tabSection.filter((section:any) => section.ligne_id == this.tabLigneDemDikk[i].id);
          if(tabSection){
            // On prend les debut des sections sauf le premier qui est déjà enregistré
            for(let y = 1; y < tabSection.length; y++){
              tabSection[y].num = `${y+1}`;
              // console.log(tabSection[y].depart);
              
              tabSectionLigne.push(tabSection[y].depart)
            }
          }
          tabSectionLigne.push(this.tabLigneDemDikk[i].lieuArrivee); // Stocke en dernier le lieu d'arrivé de la ligne;

          // console.log("Le tableau des sections test", tabSectionLigne);  
          // On stocke l'itinéraire dans le tableau des itinéraires de la ligne 
          this.tabLigneDemDikk[i].itineraires = tabSectionLigne;   
          // console.log(this.tabLigneDemDikk[i]);
                           

          // On a le tableau, on peut maintenant faire l'algo avec les prix 
          // let tabSectionPrix = this.calculPrixSection(tabSectionLigne);
          // console.log(tabSectionPrix);   
          this.tabLigneDemDikk[i].sections = this.tabLigneDemDikkFilter[i].sections = this.calculPrixSection(tabSectionLigne, this.prixSectionDemDikk, this.prixEntreSectionDemDikk);
        }
        

        
        if(!this.tabLigne.length){
          console.log(this.tabLigne)
          this.messageInfo = "Aucune ligne enregistrée pour le moment";
        }
      }
    )
  }

  // Les types de lignes 
  listeTypeLigne(){
    this.typeLigneService.getAllTypesLigne().subscribe(
      (data:any) =>{
        console.log(data);
        this.tabTypeLigne = data.types;  
        this.isAll = true;      

        // // On trouve l'identiifant du type banlieue 
        // let typeBanlieu = data.types.find((element:any) => element.nom.toLowerCase() === "banlieue" && element.reseau_id === this.idDemDikk);
        // console.log("Le type banlieue trouvé", typeBanlieu);
        // if(typeBanlieu){
        //   this.idBanlieu = typeBanlieu.id
        // }
        // // On trouve l'identiifant du type urbaine 
        // let typeUrbaine = data.types.find((element:any) => element.nom.toLowerCase() === "urbaine" && element.reseau_id === this.idDemDikk);
        // console.log("Le type urbaine trouvé", typeUrbaine);
        // if(typeBanlieu){
        //   this.idUrbaine = typeUrbaine.id
        // }
        // // On trouve l'identiifant du type diamniadio 
        // let typeDiamniadio = data.types.find((element:any) => element.nom.toLowerCase() === "diamniadio" && element.reseau_id === this.idDemDikk);
        // console.log("Le type diamniadio trouvé", typeDiamniadio);
        // if(typeDiamniadio){
        //   this.idDiamniadio = typeDiamniadio.id
        // }
      }
    )
  }

  // Voir les lignes du type filtré 
  showLigneFilter(typeLigne:any, index:number){
    this.isAll = false;
    console.log(typeLigne);
    this.tabLigneDemDikkFilter = this.tabLigneDemDikk.filter((ligne:Ligne)=> ligne.type_id == typeLigne.id);
    console.log("Les lignes du filtre ", this.tabLigneDemDikkFilter);
    for(let i=0; i<=this.tabTypeLigne.length; i++){
      if (i != index){
        this.tabTypeLigne[i].isActif = false;
      } else{

        typeLigne.isActif = true;
      }
    }
    
  }

  // Voir toutes les lignes 
  showAllLigne(){
    this.isAll = true;    
    this.tabLigneDemDikkFilter = this.tabLigneDemDikk;
    // alert(this.tabLigneDemDikkFilter.length);
    console.log(this.tabLigneDemDikkFilter);
    for(let i=0; i<=this.tabTypeLigne.length; i++){
      this.tabTypeLigne[i].isActif = false;
    }
  }

  

  // Fonction qui permet de calculer les prix des sections 
  calculPrixSection(tabSectionElement:any[], prixSection:any, prixEntreSection:any){
    let tabSectionPrix : any [] =[];
    let c: number = 1;
    for (let j = 0; j< tabSectionElement.length ; j++){
      for(let x = j+1; x < tabSectionElement.length; x++){
        if(tabSectionElement[j]== tabSectionElement[x]){
          c += 1;
          continue;
        } else {
          let objetTest = {
            num : x + j,
            depart: tabSectionElement[j],
            arrivee: tabSectionElement[x],
            prix: prixSection + (prixEntreSection* (x-j-c)),
          }
          // console.log(objetTest);
          tabSectionPrix.push(objetTest);
          // console.log(tabSectionPrix);

        }
      }
    }
    return tabSectionPrix;
  }

  // itinéraire d'une ligne 
  showItineraire(ligne:any){
    this.ligneObject = ligne;
    console.log(this.ligneObject);
  }

  // Voir les lignes urbaines 
  showUrbaine(){
    this.isUrbaine = true;
    this.isBanlieue = false;
    this.isAIBD = false;
  }

  // Voir les lignes de banlieue 
  showBanlieue(){
    this.isUrbaine = false;
    this.isBanlieue = true;
    this.isAIBD = false;
  }

  // Voir les lignes AIBD 
  showAIBD(){
    this.isUrbaine = false;
    this.isBanlieue = false;
    this.isAIBD = true; 
  }


  // Rechercher une ligne   
  onSearch(){
    this.tabLigneAftuFilter = this.searchSections(this.tabAftu, this.filterValue);
    this.tabLigneDemDikkFilter = this.searchSections(this.tabLigneDemDikk, this.filterValueDemDikk);
    this.isAll = true;    
    for(let i=0; i<=this.tabTypeLigne.length; i++){
      this.tabTypeLigne[i].isActif = false;
    }
  }
  

  // Methode pour trouver les sections de la ligne pendant la saisie
  searchSections(tab: any[], filterValue: string): any[] {
    return tab.map(objet => {
      return {
        ...objet,
        sections: objet.sections.filter(section => section.depart.toLowerCase().includes(filterValue.toLowerCase()))
      };
    });
  }


  // Rechercher l'itinéraire suivant la date de depart et d'arrivee 
  onSearchItineraire(){
    // this.tabLigneAftuFilter = this.searchSections(this.tabAftu, this.filterValue);
    this.isSerach = true;
    this.tabLigneAftuFilter = this.searchItineraire(this.tabAftu, this.departInput, this.arriveeInput);
    this.tabLigneDemDikkFilter = this.searchItineraire(this.tabLigneDemDikk, this.departInput, this.arriveeInput);
  }
  annulerSearch(){
    this.isSerach = false;
    this.tabLigneAftuFilter = this.tabAftu;
    this.tabLigneDemDikkFilter = this.tabLigneDemDikk;
    this.departInput = "";
    this.arriveeInput = "";
  }
  
  searchItineraire(tab: any[], lieuDepart: string, lieuArrivee: string): any[] {
    return tab.map((objet:any) => {
      return {
        ...objet,
        sections: objet.sections.filter((section:any) => ( 
          (section.depart.toLowerCase() === lieuDepart.toLowerCase() && section.arrivee.toLowerCase() === lieuArrivee.toLowerCase())|| 
          (section.depart.toLowerCase() === lieuArrivee.toLowerCase() && section.arrivee.toLowerCase() === lieuDepart.toLowerCase()) )
        )
      };
    });

  }
  


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
