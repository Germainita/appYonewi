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
import { validateLengthField, validateLigneName } from 'src/app/validation/validation';

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
  tabSectionsLigne: SectionModel[] = [];
  tabSectionFilterActifs: SectionModel[] = [];

  tabSectionLigneActifs: SectionModel[] = [];
  tabSectionLigneFilter: SectionModel[] = [];
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

  // Les validations 
  // Le nom de la ligne 
  isNomValide:boolean = false;
  verifMessageNom: string = "";

  // Début ligne 
  isFieldValide:boolean = false;
  isDebutValide:boolean = false;
  verifMessageDebut: string = "";

  // Fin Ligne 
  isFinValide:boolean = false;
  verifMessageFin: string = "";

  // Nombre de sections 
  isNombreSection:boolean = false;
  verifMessageNbreSection: string = "";

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

    this.tabSectionLigneActifs = this.tabSectionLigneFilter = ligne.sections;
    console.log(this.tabSectionLigneActifs)

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
    this.viderChamps();
    // this.tabAjoutSections = [];
  }

  // Voir ajout ligne 
  // Voir l'ajout d'une ligne 
  showAjoutLigne(){
    this.isAjoutLigne = true;
    this.isAjoutSection = false;
    this.isFinalisation = false;
    this.tabAjoutSections = [];
  }
  
 

  // Voir l'ajout d'une section 
  showAjoutSection(){ 
    // On vérifie si les champs sont vides 
    this.isAjoutLigne = false;
    this.isAjoutSection = true;
    this.isFinalisation = false;
    // if (!this.ligne.nom || !this.ligne.lieuArrivee || !this.ligne.lieuDepart || !this.nombreLigne){
    //   sweetAlertMessage("error", "", "Vueillez saisir les informations requises");
    // } 
    // else 
    if(!this.tabAjoutSections.length){
      for(let i=0; i< parseInt(this.nombreLigne); i++ ){
        // this.objectSection.num = (i + 1).toString();
        if( i== 0){
          let objet = {
            num: (i + 1).toString(),
            depart: this.ligne.lieuDepart,
            arrivee: "",
            messageInfo: "",
            prix:0,
            isExact: true,
          }
          this.tabAjoutSections.push(objet);
        } 
        else{
          let ojetTest = {
            num: (i + 1).toString(),
            depart: "",
            arrivee: "",
            messageInfo: "",
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
      if (section.depart != this.tabAjoutSections[parseInt(section.num) - 2].arrivee){
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
    
    // On récupère les sections de la ligne 
    this.tabSectionsLigne= this.tabSection.filter((section:any) => section.ligne_id == this.ligne.id);
    console.log(this.tabSectionsLigne);
  }

  // Variable pour le nom de la fin de la section 
  setFin(index:any){
    return `Fin ${index}`
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
        console.log("Les lignes recu",data);

        this.tabLigne = data.lignes;
        // Pour les sections enregistrés par l'administrateur réseau 
        for(let i = 0; i<this.tabLigne.length; i++){
          let tabSection = this.tabSection.filter((section:any) => section.ligne_id == this.tabLigne[i].id);
          this.tabLigne[i].sections = tabSection;
          if(tabSection){
            for(let y = 0; y < tabSection.length; y++){
              tabSection[y].num = (y + 1).toString();
              tabSection[y].prix = this.prixSection;
              tabSection[y].messageInfo = "";
            }   
            
            // console.log(tabSection);         
          }
          // On enregistre la dernière section qui est le debut et la fin de la ligne 
          // if(tabSection.length) {
          //   let lastSection = new SectionModel;
          //   lastSection.depart = this.tabLigne[i].lieuDepart;
          //   lastSection.arrivee = this.tabLigne[i].lieuArrivee;
          //   lastSection.created_at = this.tabLigne[i].created_at;
          //   lastSection.created_by = this.tabLigne[i].created_by;
          //   lastSection.updated_at = this.tabLigne[i].updated_at;
          //   lastSection.updated_by = this.tabLigne[i].updated_by;
          //   lastSection.num = (tabSection.length + 1).toString();
          //   lastSection.prix = this.prixSection + ((tabSection.length - 1 )* this.prixEntreSection);

          //   // On ajoute la derniere section dans le tableau 
          //   tabSection.push(lastSection);
          // }

          // this.tabLigne[i].sections = tabSection;

          // console.log(this.tabLigne[i].sections );
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
        //       console.log(tabSection[y].depart);
              
        //       tabSectionTest.push(tabSection[y].depart)
        //     }
        //     tabSectionTest.push(this.tabLigne[i].lieuArrivee); // Stocke en dernier le lieu d'arrivé de la ligne;

        //     // console.log(tabSection[tabSection.length - 1].arrivee);  
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
        console.log("Le tableau des lignes filtré", this.tabLigneFilterActifs);
        

        
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
            lastSection.depart = this.tabLignesSup[i].lieuDepart;
            lastSection.arrivee = this.tabLignesSup[i].lieuArrivee;
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
        if (data.types){
          // console.log("Il ya un type de ligne");
          this.tabTypeLigne = data.types;
          
        } else{
          console.log("Il n'y a pas de getTypeLigneNameype de ligne");
          this.tabTypeLigne = [];
        }
        
        // if(data){
        //   this.tabTypeLigne = data.types;
        // } else{
        //   this.tabTypeLigne = [];
        // }
        console.log("La longueur du tableau des type de ligne", this.tabTypeLigne.length);
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

  // Vérification des infos de la ligne pout la premiere étape 
  // Vérification du nom de la ligne 
  verifNomLigneFunction(nomLigne:any){
    this.verifMessageNom = "";
    this.isNomValide = validateLigneName(nomLigne);
    let ligneExist = this.tabLigne.find((ligne:any) => ligne.nom.toLowerCase() == nomLigne.toLowerCase());
    let ligneExist1 = this.tabLignesSup.find((ligne:any) => ligne.nom.toLowerCase() == nomLigne.toLowerCase());

    if (!nomLigne){
      this.verifMessageNom = "Le numéro de la ligne est obligatoire";
    } else if (!this.isNomValide){
      this.verifMessageNom = "Le numéro de la ligne doit commencer par un chiffre positif différent de 0";
    }else if (ligneExist1) {
      this.verifMessageNom = "Ce numéro de ligne est déjà dans la corbeille. Vueillez le restaure";
    } else if (ligneExist){
      this.verifMessageNom = "Ce numéro existe déja";
    } else {
      this.verifMessageNom = "";
    }
  }

  // Pour la modification, on ne vérifie pas si pour l'instant le nom existe 
  veriModiffNomLigneFunction(nomLigne:any){
    this.verifMessageNom = "";
    this.isNomValide = validateLigneName(nomLigne);

    if (!nomLigne){
      this.verifMessageNom = "Le numéro de la ligne est obligatoire";
    } else if (!this.isNomValide){
      this.verifMessageNom = "Le numéro de la ligne doit commencer par un chiffre positif différent de 0";
    }else {
      this.verifMessageNom = "";
    }
  }

  // Vérification du départ 
  verifDepart(){
    this.isDebutValide = validateLengthField(this.ligne.lieuDepart, 3);
    if (!this.ligne.lieuDepart){
      this.verifMessageDebut = "Le depart est obligatoire";
    } else if(this.ligne.lieuDepart == this.ligne.lieuArrivee){
      this.verifMessageDebut = "Les lieux de depart et d'arrivée ne peuvent etre identique";
    } else if(!this.isDebutValide){
      this.verifMessageDebut = "La longueur doit etre supérieur ou égale à 3";
    } else {
      this.verifMessageDebut = "";
    }
  }

  // Vérification de la fin 
  verifArrivee(){
    this.isFinValide = validateLengthField(this.ligne.lieuArrivee, 3);
    if (!this.ligne.lieuArrivee){
      this.verifMessageFin = "L'arrivee est obligatoire";
    }else if(this.ligne.lieuDepart == this.ligne.lieuArrivee){
      this.verifMessageFin = "Les lieux de depart et d'arrivée ne peuvent etre identique";
    } else if(!this.isFinValide){
      this.verifMessageFin = "La longueur doit etre supérieur ou égale à 3";
    } else {
      this.verifMessageFin = "";
    }
  }

  // Vérification du nombre de section 
  verifNombreSection(){
    this.verifMessageNbreSection = "";
    this.isNombreSection = false;
    if (parseInt(this.nombreLigne) < 2){
      this.verifMessageNbreSection = "Le nombre de sections doit etre au minimum égale à 2";
    } else if (!this.nombreLigne){
      this.verifMessageNbreSection = "Le nombre de sections est obligatoire";
    } else {
      this.verifMessageNbreSection = "";
      this.isNombreSection = true;
    }
  }

  // Ajouter une Ligne à vérifier 
  ajouterEtape1(){
    this.verifNomLigneFunction(this.ligne.nom);
    this.verifDepart();
    this.verifArrivee();
    this.verifNombreSection();
    
    if (this.isNomValide && this.isDebutValide && this.isFinValide){
      // this.verifMessageNom = "";
      this.showAjoutSection();
    } else {
      this.showAjoutLigne();
    }
    
  }

  // Vérification des sections 
  verifSections(section:any, tabSections:any[]){
    let validLenght = validateLengthField(section.arrivee, 3);
    for (let i =1; i < tabSections.length; i++ ){
      tabSections[i].depart = tabSections[i-1].arrivee;
    } 
    tabSections[tabSections.length-1].arrivee = this.ligne.lieuArrivee;
    console.log(tabSections);

    if(!section.arrivee) {
      section.messageInfo = "La fin de la section est obligatoire";
    } else if(section.depart == section.arrivee) {
      section.messageInfo = "Le debut et la fin de la section ne peuvent etre identique";
    } else if(section.arrivee == this.ligne.lieuDepart ||section.arrivee == this.ligne.lieuArrivee){
      section.messageInfo = "Le nom de la section doit etre unique";
    } else if(!validLenght){
      section.messageInfo = "La longueur doit etre supérieur ou égale à 3";
    } else {
      section.messageInfo = "valide";
    }
  }

  // Ajout section vérification 
  ajouterEtape2(){
    let isValid:boolean = false;
    // Le début de La ligne suivante prend la fin de la ligne d'avant
    for (let i =0; i < this.tabAjoutSections.length -1; i++ ){
      this.verifSections(this.tabAjoutSections[i],this.tabAjoutSections );
      // alert(this.tabAjoutSections[i].messageInfo);
      if(this.tabAjoutSections[i].messageInfo == "valide"){
        isValid = true;
      } else {
        isValid = false;
      }
    }
    if(isValid){
      this.showFinalisation();
    }

    
    // On vérifie d'abord si les sections de la ligne ne sont pas vide 
    let sectionNotValide = this.tabAjoutSections.find((element:any) => element.messageInfo != "valide");
    if(!sectionNotValide) {
      this.showFinalisation();
    }
    // let sectionIdentique = this.tabAjoutSections.find((element:any) => element.depart == element.fin);
    // if(sectionNotValide){
    //   sweetAlertMessage("error", "", "Les données ne peuvent pas etre vide");
    // } else if( sectionIdentique){
    // sweetAlertMessage("error", "", "Le début et la fin d'une section ne peuvent etre identique");
    // } else if (this.tabAjoutSections[this.tabAjoutSections.length-1].fin != this.ligne.lieuArrivee){
    //   sweetAlertMessage("error", "", "Le point d'arrivée de la ligne et la fin de la dernière section doivent etre identique");
    // } 
    // else{
    // this.showFinalisation();
    // }
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
        depart: this.tabAjoutSections[i].depart,
        arrivee: this.tabAjoutSections[i].arrivee,
        tarif_id: this.tarif_id,
        ligne_id: this.lastidLigne + 1,
      }
      console.log(section);
      this.ajoutSection(section);
    }
  }


  // Ajouter une section 
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

  

  // isLigneUpdated: boolean = false;
  // Modifier une Ligne et ses section
  modifierLigne(){ 
    this.veriModiffNomLigneFunction(this.ligne.nom);
    this.verifDepart();
    this.verifArrivee();
    this.verifNombreSection();
    
    if (this.isNomValide && this.isDebutValide && this.isFinValide){
      sweetMessageConfirm("Vous allez modifier cette Ligne", "Oui, je modifie").then( (result) =>{
        if(result.isConfirmed ){

          // On modifie la ligne 
          // console.log(this.ligne);
          this.ligneService.updateLigne(this.ligne.id, this.ligne).subscribe(
            (data:any) =>{
              // console.log(data);
              // Les sections de la ligne 
              this.tabSectionsLigne[0].depart = this.ligne.lieuDepart; //Debut de la premiere section = lieu de depart de la ligne
              this.tabSectionsLigne[this.tabSectionsLigne.length-1].arrivee = this.ligne.lieuArrivee; // Fin de la derniere section = lieu d'arrivée de la ligne
    
              // Le début de La ligne suivante prend la fin de la ligne d'avant
              for (let i =1; i < this.tabSectionsLigne.length; i++ ){
                this.tabSectionsLigne[i].depart = this.tabSectionsLigne[i-1].arrivee;
              }
              sweetAlertMessage("success", "", data.message);
              this.listeLigne();
              this.listeLigneSup();
            },
            (err) => {
              alert("Error");
              console.log(err);
            }
          )

          // On modifie les sections 
          let isValid: boolean = false;
          for(let i = 0; i <this.tabSectionsLigne.length; i++){
            let section = {
              depart: this.tabSectionsLigne[i].depart,
              arrivee: this.tabSectionsLigne[i].arrivee,
              tarif_id: this.tabSectionsLigne[i].tarif_id,
              ligne_id: this.tabSectionsLigne[i].ligne_id,
            }

            // On vérifie les sections             
            this.verifSections(this.tabSectionsLigne[i], this.tabSectionsLigne);
            // alert(this.tabAjoutSections[i].messageInfo);
            if(this.tabAjoutSections[i].messageInfo == "valide"){
              isValid = true;
            } else {
              isValid = false;
            }
            // console.log(section);
            // On met à jour la sectiion 
            if (isValid){
              this.updateSectionFonction(this.tabSectionsLigne[i].id, section);
              sweetAlertMessage("success", "", "Les sections de la ligne ont été mis à jour");
            }
          }
        }
      }) 
    }
    // if  (!this.ligne.nom || !this.ligne.lieuArrivee || !this.ligne.lieuDepart){
    //   sweetAlertMessage("error", "", "Vueillez saisir les informations requises");
    // } else{
        
    // }
  }

  // Charger les infos de la section 
  sectionObject:any;
  indexObject:any;
  messageUpdated:string= "";

  // Charger les informations d'une section d'une ligne 
  infosSection(section:any, index:any){
    this.sectionObject = section;
    this.indexObject = index;
  }
  // Modifier une section d'une ligne c'est bon 
  modifSection(){
    let section = {
      depart: this.sectionObject.depart,
      arrivee: this.sectionObject.arrivee,
      ligne_id: this.sectionObject.ligne_id,
      tarif_id: this.sectionObject.tarif_id
    }
    this.updateSectionFonction(this.sectionObject.id, section);

    let sectionsLigne = this.ligne.sections;
    if (this.indexObject < sectionsLigne.length-1){
      sectionsLigne[this.indexObject + 1].depart = this.sectionObject.arrivee;
      console.log(sectionsLigne[this.indexObject + 1]);

      let section = {
        depart: sectionsLigne[this.indexObject + 1].depart,
        arrivee: sectionsLigne[this.indexObject + 1].arrivee,
        ligne_id: sectionsLigne[this.indexObject + 1].ligne_id,
        tarif_id: sectionsLigne[this.indexObject + 1].tarif_id
      }

      this.updateSectionFonction(sectionsLigne[this.indexObject + 1].id, section);
    }

    sweetAlertMessage("sucess", "", "La section a bien été modifiée");
    console.log(sectionsLigne);

    console.log("Les sections modifiées");
  }

  // suprrimer une section d'une ligne
  supprimerSection(section:any, index:any){
    console.log("La section à supprimer: ");
    console.log(section);
    let tabSections = this.ligne.sections;
    console.log("Le tableau des sections de la ligne: ");
    console.log(tabSections);    
  }

  // Methode qui fait appel au service pour la modification d'une section 
  updateSectionFonction(id:any, section:any){
    this.sectionService.updateSection(id, section).subscribe(
      (data:any) =>{
        console.log(data);
      },
      (err:any)=>{
          console.log(err);
      }
    )
  }

  // Methode qui fait appel au service pour la suppression d'une section
  deleteSectionFunction(idSection:any){
    this.sectionService.deleteSection(idSection).subscribe(
      (data:any)=>{
        console.log("Sucess");
        console.log(data);  
      },
      (err: any) =>{
        console.log("Erreur");
        console.log(err);
      }
    )
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
    if(this.tabTypeLigne.length !=0){
      let typeLigne = this.tabTypeLigne.find((type:any) => type.id == parseInt(idTypeLigne));
      if(typeLigne){
        nom = typeLigne.nom;
      } else {
        nom = "Aucun";
      }
      
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


  // Pagination pour tous les tableaux des sections
  getItemsPageSection(){
    const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
    const indexFin = indexDebut + this.itemsParPage;
    // this.tabSectionLigneFilter = tabSectionLigneFilter;
    return this.tabSectionLigneFilter.slice(indexDebut, indexFin);

  }

  // Méthode pour générer la liste des pages
  get pagesSections(): number[] {
    const totalPages = Math.ceil(this.tabSectionLigneFilter.length / this.itemsParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPagesSection(): number {
    return Math.ceil(this.tabSectionLigneFilter.length / this.itemsParPage);
  }
}
