import { Component } from '@angular/core';
import { Ligne } from 'src/app/models/ligne.model';
import { Section, SectionModel } from 'src/app/models/section.model';
import { Tarif } from 'src/app/models/tarif.model';
import { TypeLigne } from 'src/app/models/typeLigne.model';
import { LigneService } from 'src/app/services/ligne.service';
import { SectionService } from 'src/app/services/section.service';
import { sweetAlertMessage, sweetMessageConfirm } from 'src/app/services/sweetAlert/alert.service';
import { TarifService } from 'src/app/services/tarif.service';
import { TypeLigneService } from 'src/app/services/typeLigne.service';

@Component({
  selector: 'app-gestion-ligne',
  templateUrl: './gestion-ligne.component.html',
  styleUrls: ['./gestion-ligne.component.css']
})
export class GestionLigneComponent {
  // Les lignes actifs 
  tabLigne: Ligne[] = [];
  tabLigneFilterActifs: Ligne[] = [];

  // Tableau des Lignes supprimés
  tabLignesSup: Ligne [] = []; 
  tabLigneFilterSup: Ligne[] = [];

  // Les Sections actifs 
  tabSection: SectionModel[] = [];
  tabSectionFilterActifs: SectionModel[] = [];

  tabSectionLigneActifs: SectionModel[] = [];
  tabSectionLigneSup: SectionModel[] = [];

  // Tableau des Sections supprimés
  tabSectionsSup: SectionModel [] = []; 
  tabSectionFilterSup: SectionModel[] = [];

  ligne = new Ligne;
  filterValue: string = "";
  // nomLigne: string = "";

  // Attribut pour ajouter ou modifier 
  isModifier: boolean = false;

  // Attributs pour voir les lignes ou les sections 
  isLignes: boolean = true;
  isSections: boolean = false;

  // Attribut pour voir la liste ou la corbeille
  isActifs: boolean = true; 
  isAjout: boolean = false;
  isSup: boolean = false; 

  // Attribut pour la pagination
  itemsParPage = 5; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle

  // Le nombre de ligne 
  nombreLigne?: string;

  // Ajout ligne ou ajout section 
  isAjoutLigne:boolean = true;
  isAjoutSection:boolean = false;
  isFinalisation:boolean = false;

  messageInfo: string = "Aucune ligne enregistrée pour le moment";

  messageInfo1: string = "Aucune ligne  dans la corbeille"


  // Le tableau filtrer peu importe la liste 
  tabFilter:any[] = [];

  tabTarif: Tarif[] = [];
  tarif_id ?: number;
  prixSection : number = 0;
  prixEntreSection : number = 0;

  lastidLigne: number = 0;
  // taridAugment_id ?: number;

  // Le tableau pour ajouter les sections
  // tabSectionsStorage: Section[] = [];
  tabAjoutSections:Section[] = [];
  objectSection = new SectionModel;
  isInfosValid:boolean = true; //Vérifie si le début de la section est pareille que la fin de la section précédente

  tabTypeLigne: TypeLigne[] = [];

  constructor(
    private ligneService: LigneService, 
    private typeLigneService: TypeLigneService, 
    private sectionService: SectionService,
    private tarifService: TarifService, 
  ){}


  // Déclaration des méhodes 
  ngOnInit(): void {
    // On charge les Lignes à l'initialisation 
    this.listeTypeLignes();

    this.listetarif();

    this.listeSections();

    this.listeLigne();

    this.listeLigneSup();

    
  }

  // Voir les lignes 
  showLignes(){
    this.isLignes = true;
    this.isSections = false;
  }

  // Voir les sections 
  showSections(ligne:any){
    this.isLignes = false;
    this.isSections = true;

    this.ligne = ligne;

    this.tabSectionLigneActifs = ligne.sections;

    // On récupère les sections actifs de la ligne
    // this.tabSectionLigneActifs = this.tabSection.filter((section:any) => section.ligne_id == ligne.id);

    // Les sections supprimées de la ligne 
    this.tabSectionLigneSup = this.tabSectionsSup.filter((section:any) => section.ligne_id == ligne.id);
    // let tabSectionsLigne = this.tabSection.filter((section:any) => section.ligne_id == ligne.id);
    // console.log(tabSectionsLigne);
  }

  // on recupère le tarif 
  // Methode pour avoir le nom du role 
  getTarifPrice(idTarif:number): string {
    let tarifFound = this.tabTarif.find((elemt:any) => (elemt.id == idTarif) )
    if (tarifFound){
      return tarifFound.prix;
    }
    return ""
  }

  // Voir la liste des Ligne actifs 
  showLigneActifs(){
    this.messageInfo = ""
    this.isActifs = true;
    this.isSup = false;
    this.isAjout = false;
    this.filterValue = "";  
    this.messageInfo = "Aucune ligne enregistrée pour le moment";
    this.messageInfo1 = ""
  }

  // Voir la liste des Ligne supprime 
  showCorbeille(){
    this.messageInfo = "";
    this.messageInfo1 = "Aucune ligne  dans la corbeille"
    this.isSup = true;
    this.isAjout = false;
    this.isActifs = false;
    this.filterValue = "";
    this.listeLigneSup();
  }

  // Voir l'ajout d'une ligne 
  showAjout(){
    this.isAjout = true;
    this.isActifs = false;
    this.isSup = false;
    // this.tabAjoutSections = [];
  }

  // Voir ajout ligne 
  // Voir l'ajout d'une ligne 
  showAjoutLigne(){
    this.isAjoutLigne = true;
    this.isAjoutSection = false;
    this.isFinalisation = false;
    this.tabAjoutSections = [];
    // this.viderChamps();
  }

  // Voir l'ajout d'une section 
  showAjoutSection(){ 
    // On vérifie si les champs sont vides 
    this.isAjoutLigne = false;
    this.isAjoutSection = true;
    this.isFinalisation = false;
    if (!this.ligne.nom || !this.ligne.lieuArrivee || !this.ligne.lieuDepart || !this.nombreLigne){
      sweetAlertMessage("error", "", "Vueillez saisir les informations requises");
    } 
    else if(!this.tabAjoutSections.length){
      for(let i=0; i< parseInt(this.nombreLigne); i++ ){
        // this.objectSection.num = (i + 1).toString();
        if( i== 0){
          let objet = {
            num: (i + 1).toString(),
            debut: this.ligne.lieuDepart,
            fin: "",
            prix:0,
            isExact: true,
          }
          this.tabAjoutSections.push(objet);
        } 
        else{
          let ojetTest = {
            num: (i + 1).toString(),
            debut: "",
            fin: "",
            prix:0,
            isExact: true,
          }
          this.tabAjoutSections.push(ojetTest);
        }
      }

    }
  }

  showFinalisation(){
    this.isAjoutLigne = false;
    this.isAjoutSection = false;
    this.isFinalisation = true;
  }


  // Vérifier les informations saisie 
  verifInfosSection(section:Section){
    section.isExact = true;
    if(section.num != "1"){
      if (section.debut != this.tabAjoutSections[parseInt(section.num) - 2].fin){
        section.isExact = false;
      }else{
        section.isExact = true;
      }

    }
  }

  // showModifLigneForm()

  // Voir Formulaire de modification 
  showModif(element:any){
    this.isAjout = false;
    this.isModifier = true;
    this.ligne = element;
  }


  // Les détails du Ligne 
  showDetails(element:any){
    this.ligne = element;
  }

  // Liste des tous les Ligne 
  listeLigne(){
    this.messageInfo = "";
    this.ligneService.getAllLigneReseau().subscribe(
      (data:any) =>{
        console.log(data);

        this.tabLigne = data.lignes;
        // Pour les sections enregistrés par l'administrateur réseau 
        for(let i = 0; i<this.tabLigne.length; i++){
          let tabSection = this.tabSection.filter((section:any) => section.ligne_id == this.tabLigne[i].id);
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
            lastSection.Depart = this.tabLigne[i].lieuDepart;
            lastSection.Arrivee = this.tabLigne[i].lieuArrivee;
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

        // Test2 
        // Algorithme pour avoir les différentes section d'une ligne avec le prix 
        // for(let i = 0; i<this.tabLigne.length; i++){
        //   let tabSectionTest:any[]=[];
        //   // On stocke d'abord le point de départ de la ligne comme premier élément du tableau pour la ligne;
        //   tabSectionTest.push(this.tabLigne[i].lieuDepart);


        //   // Si des sections on été enregistré, on récupère les section de la ligne
        //   let tabSection: SectionModel[] = [];
        //   tabSection = this.tabSection.filter((section:any) => section.ligne_id == this.tabLigne[i].id);
        //   if(tabSection){
        //     // On prend les debut des sections sauf le premier qui est déjà enregistré
        //     for(let y = 1; y < tabSection.length; y++){
        //       tabSection[y].num = `${y+1}`;
        //       console.log(tabSection[y].Depart);
              
        //       tabSectionTest.push(tabSection[y].Depart)
        //     }
        //     tabSectionTest.push(this.tabLigne[i].lieuArrivee); // Stocke en dernier le lieu d'arrivé de la ligne;

        //     // console.log(tabSection[tabSection.length - 1].Arrivee);  
        //     // tabSectionTest.push(tabSection[tabSection.length-1].fin)   
        //     console.log("Le tableau des sections test", tabSectionTest); 
        //     // On a le tableau, on peut maintenant faire l'algo avec les prix 
        //     let tabSectionPrix = this.calculPrixSection(tabSectionTest);
        //     console.log(tabSectionPrix);
        //     // for (let j = 0; j< tabSectionTest.length ; j++){
        //     //   for(let x = j+1; x < tabSectionTest.length; x++){
        //     //     let objetTest = {
        //     //       num : x + j,
        //     //       depart: tabSectionTest[j],
        //     //       arrivee: tabSectionTest[x],
        //     //       prix: 150 + (50* (x-j-1)),
        //     //     }
        //     //     console.log(objetTest);
        //     //     tabSectionPrix.push(objetTest);
        //     //     console.log(tabSectionPrix);
        //     //   }
        //     // } 
        //     // tabSectionPrix = this.calculPrixSection(tabSectionTest);      
        //   }
        // }
        
        // console.log(this.tabLigne)
        this.tabLigneFilterActifs = this.tabLigne;

        
        if(!this.tabLigne.length){
          console.log(this.tabLigne)
          this.messageInfo = "Aucune ligne enregistrée pour le moment";
        }
      }
    )
  }

  // Fonction qui permet de calculer les prix des sections 
  calculPrixSection(tabSectionElement:any[]){
    let tabSectionPrix : any [] =[];
    for (let j = 0; j< tabSectionElement.length ; j++){
      for(let x = j+1; x < tabSectionElement.length; x++){
        let objetTest = {
          num : x + j,
          depart: tabSectionElement[j],
          arrivee: tabSectionElement[x],
          prix: this.prixSection + (this.prixEntreSection* (x-j-1)),
        }
        // console.log(objetTest);
        tabSectionPrix.push(objetTest);
        // console.log(tabSectionPrix);
      }
    }
    return tabSectionPrix;
  }

  // Liste des Ligne supprimés 
  listeLigneSup(){
    this.messageInfo = "";
    this.ligneService.getLigneDeleted().subscribe(
      (data:any) =>{
        // On filtre les Lignes supprimés 
        // console.log(data)
        this.tabLignesSup = this.tabLigneFilterSup = data.lignes;
        // Pour les sections enregistrés par l'administrateur réseau 
        for(let i = 0; i<this.tabLignesSup.length; i++){
          let tabSection = this.tabSection.filter((section:any) => section.ligne_id == this.tabLignesSup[i].id);
          // let tabSection = this.tabLignesSup[i].sections;
          if(tabSection){
            for(let y = 0; y < tabSection.length; y++){
              tabSection[y].num = `${y+1}`;
              tabSection[y].prix = this.prixSection;
            }   
            
            console.log(tabSection);         
          }
          // On enregistre la dernière section qui est le debut et la fin de la ligne 
          if(tabSection.length > 1) {
            let lastSection = new SectionModel;
            lastSection.Depart = this.tabLignesSup[i].lieuDepart;
            lastSection.Arrivee = this.tabLignesSup[i].lieuArrivee;
            lastSection.created_at = this.tabLignesSup[i].created_at;
            lastSection.created_by = this.tabLignesSup[i].created_by;
            lastSection.updated_at = this.tabLignesSup[i].updated_at;
            lastSection.updated_by = this.tabLignesSup[i].updated_by;
            lastSection.num = tabSection.length.toString();
            lastSection.prix = this.prixSection + (tabSection.length * this.prixEntreSection);

            // On ajoute la derniere section dans le tableau 
            tabSection.push(lastSection);
          }

          this.tabLignesSup[i].sections = tabSection;
        }
      },
      (err) =>{
        console.log(err);
        this.tabLignesSup = [];
        this.messageInfo1 = "Aucune ligne  dans la corbeille";
      }
    )
  }

  // Liste des tous les TypeLignes 
  listeTypeLignes(){
    this.typeLigneService.getTypesLigneReseau().subscribe(
      (data:any) =>{
        console.log(data);
        this.tabTypeLigne = data.types;
      }
    )
  }

  // liste des tarifs du réseau
  listetarif(){
    this.tarifService.getAllTarifReseau().subscribe(
      (data:any) =>{
        console.log(data);
        this.tabTarif = data.tarifs;
        
        // On récupère le tarif entre section 
        let tarifSection = this.tabTarif.find((tarif:any) => tarif.type.toLowerCase() == "tarif section");
        if(tarifSection){
          this.tarif_id = tarifSection.id;
          this.prixSection = parseInt(tarifSection.prix);
        }

        // On récupère le tarif d'augmentation entre section 
        let tarifEntreSection = this.tabTarif.find((tarif:any) => tarif.type.toLowerCase() == "tarif entre section");
        if(tarifEntreSection){
          this.tarif_id = tarifEntreSection.id;
          this.prixEntreSection = parseInt(tarifEntreSection.prix);
        }
        
      }
    )
  }

  // Liste des sections
  listeSections(){
    this.sectionService.getAllSectionReseau().subscribe(
      (data:any) =>{
        // console.log(data);
        this.tabSection = this.tabSectionFilterActifs = data.sections;       
      }
    )
  }

  // Vider Ligne 
  viderChamps(){
    this.ligne.nom = "";
    this.ligne.lieuArrivee = "";
    this.ligne.lieuDepart = "";
    this.ligne.type_id = "";
    this.nombreLigne = "";
  }

  // Ajouter un Ligne à vérifier 
  ajouterEtape1(){
    // On vérifie si les champs sont vides 
    if (!this.ligne.nom || !this.ligne.lieuArrivee || !this.ligne.lieuDepart || !this.ligne.type_id){
      sweetAlertMessage("error", "", "Vueillez saisir les informations requises");
    } else{
      // On vérifie si le Ligne n'existe pas déjà 
      let LigneExist = this.tabLigne.find((ligne:any) => ligne.nom.toLowerCase() == this.ligne.nom.toLowerCase());
      let LigneExist1 = this.tabLignesSup.find((ligne:any) => ligne.nom.toLowerCase() == this.ligne.nom.toLowerCase());
      if(LigneExist){
        sweetAlertMessage("error", "", "Ce nom existe déjà ");
      }
      else if (LigneExist1) {
        sweetAlertMessage("error", "", "Ce type est déjà dans la corbeille. Vueillez le restaure");
      } 
      else{
        this.showAjoutSection();
      }
    }
  }

  // Ajout section vérification 
  ajouterEtape2(){
    // Le début de La ligne suivante prend la fin de la ligne d'avant
    for (let i =1; i < this.tabAjoutSections.length; i++ ){
      this.tabAjoutSections[i].debut = this.tabAjoutSections[i-1].fin;
    }
    console.log(this.tabAjoutSections);
    // On vérifie d'abord si les sections de la ligne ne sont pas vide 
    let sectionVide = this.tabAjoutSections.find((element:any) => element.debut == "" || element.fin == "" );
    let sectionIdentique = this.tabAjoutSections.find((element:any) => element.debut == element.fin);
    if(sectionVide){
      sweetAlertMessage("error", "", "Les données ne peuvent pas etre vide");
    } else if( sectionIdentique){
    sweetAlertMessage("error", "", "Le début et la fin d'une section ne peuvent etre identique");
    } else if (this.tabAjoutSections[this.tabAjoutSections.length-1].fin != this.ligne.lieuArrivee){
      sweetAlertMessage("error", "", "Le point d'arrivée de la ligne et la fin de la dernière section doivent etre identique");
    } 
    else{
    this.showFinalisation();
    }
  }

  // Ajout de la ligne 
  ajoutLigne(){
    if(this.tabLigne.length){
      this.lastidLigne = this.tabLigne[this.tabLigne.length - 1].id; 
    } else if(this.tabLignesSup.length){
      this.lastidLigne = this.tabLignesSup[this.tabLignesSup.length - 1].id; 
    }
    else{
      this.lastidLigne = 0;
    }

    // On peut maintenant ajouter la ligne 
    // let newLigne: any;
    this.ligneService.addLigne(this.ligne).subscribe(
      (resp:any) =>{
        console.log(resp);
        sweetAlertMessage("success", "", resp.message);
        this.listeLigne();
        // this.ligneAjouter = resp.ligne;
        // console.log(this.ligneAjouter);
        this.viderChamps();
      },
      (err:any)=>{
        console.log(err);
        sweetAlertMessage("error", "", err.error.message);
      }
    );

    // on ajoute les sections
    // let lastLigne = this.tabLigne[this.tabLigne.length - 1].id; 

    for(let i = 0; i <this.tabAjoutSections.length; i++){
      let section = {
        depart: this.tabAjoutSections[i].debut,
        arrivee: this.tabAjoutSections[i].fin,
        tarif_id: this.tarif_id,
        ligne_id: this.lastidLigne + 1,
      }
      console.log(section);
      this.ajoutSection(section);
    }
  }


  ajoutSection(section:any){
    this.sectionService.addSection(section).subscribe(
      (data:any) =>{
        console.log(data);

      },
      (err:any)=>{
          console.log(err);
          sweetAlertMessage("error", "", err.error.message);
      }
    )
  }

  

  // Modifier Ligne 
  modifier(){ 
    if  (!this.ligne.nom || !this.ligne.lieuArrivee || !this.ligne.lieuDepart || !this.ligne.type_id){
      sweetAlertMessage("error", "", "Vueillez saisir les informations requises");
    } else{    
      this.ligneService.updateLigne(this.ligne.id, this.ligne).subscribe( 
        (data:any) =>{
          if(data.success == false) {
            sweetAlertMessage("error", "", "Le prix doit etre suppérieur à 1000");
          } else if(data.message) {
            sweetAlertMessage("success", "", data.message);
            this.listeLigne();
            this.viderChamps();
          }
        },
        (err) =>{
          console.log (err)

        }
      )
    }
  }

  // Supprimer un Ligne
  supprimer(ligne:any){
    sweetMessageConfirm("Vous allez supprimer cet Ligne", "Oui, je supprime").then( (result) =>{
      if(result.isConfirmed ){
        this.ligneService.deleteLigne(ligne.id).subscribe(
          (data:any) =>{
            console.log(data);
            sweetAlertMessage("success", "", data.message);
            this.listeLigne();
            this.listeLigneSup();
          },
          (err) => {
            alert("Error");
            console.log(err);
          }
        )
      }
    })
    
  }

  // Restaurer un Ligne 
  restaurer(ligne:any){
    sweetMessageConfirm("Vous allez restaurer cet Ligne", "Oui, je restaure").then( (result) =>{
      if(result.isConfirmed ){
        // Ligne.etat = "actif";
        this.ligneService.restaureLigne(ligne.id).subscribe(
          (data:any) =>{
            console.log(data);
            sweetAlertMessage("success", "", data.message);
            this.listeLigne();
            this.listeLigneSup();
          },
          (err) => {
            alert("Error");
            console.log(err);
          }
        )
      }
    })
  }


  // Supprimer d"finitivement ce Ligne 
  supprimerDefinitif(ligne:any){
    sweetMessageConfirm("Vous allez supprimer définitivement ce Ligne", "Oui, je supprime").then( (result) =>{
      if(result.isConfirmed ){
        this.ligneService.deleteDefinitif(ligne.id).subscribe(
          (data:any) =>{
            sweetAlertMessage("success", "", data.message);
            this.listeLigneSup();
          },
          (err) =>{
            console.log(err);
          }
        )
      }
    })
  }

  // Méthode pour vider la corbeille 
  viderCorbeille(){
      sweetMessageConfirm("Vous allez vider la corbeille", "Oui, je vide").then( (result) =>{
        if(result.isConfirmed ){
          this.ligneService.emptyTrash().subscribe(
            (data:any) =>{
              sweetAlertMessage("success", "", data.message);
              this.listeLigneSup();
            }
          )
        }
      })
  }


  // Methode de recherche automatique pour les reseaux
  onSearch(){
    // Recherche se fait selon le type ou la durée ou le prix
    this.tabLigneFilterActifs = this.tabLigne.filter(
      (elt:any) => (elt?.nom.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.lieuArrivee.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.lieuDepart.toLowerCase().includes(this.filterValue.toLowerCase()))  
    );
  }

  // Recheche pour les Ligne actifs ou inactifs
  onSearchLigneup(){
    // Recherche se fait selon le nom ou la durée ou le prix
    this.tabLigneFilterSup = this.tabLignesSup.filter(
      (elt:any) => (elt?.nom.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.lieuArrivee.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.lieuDepart.toLowerCase().includes(this.filterValue.toLowerCase()))   
    );
  }

  // Le nom du type de ligne 
  getTypeLigneName(idTypeLigne:any) : string{
    let nom: string ="";
    let typeLigne = this.tabTypeLigne.find((type:any) => type.id == parseInt(idTypeLigne));
    if(typeLigne){
      nom = typeLigne.nom;
    } else {
      nom = "Aucun";
    }
    return nom;
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
