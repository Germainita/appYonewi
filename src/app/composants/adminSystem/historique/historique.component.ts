import { Component, OnInit } from '@angular/core';
import { HistoriqueService } from 'src/app/services/historique.service';
import { UserService } from 'src/app/services/user.service';
import { Loading, Notify } from 'notiflix';


@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit{
  // Déclaration des variables 
  tabAllHistotiques: any[] = [];
  tabHistotiquesByClasseUser: any[] = [];
  tabHistotiquesByClasse: any[] = [];
  tabHistotiquesByUser: any[] = [];
  tabHistotiquesFiltered: any[] = [];

  tabUtilisateurs: any[] = [];
  historique:any;

  // Attribut pour la pagination
  itemsParPage = 50; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle

  filterValue: string = "";

  // Déclaration des methodes
  constructor(private historiqueService: HistoriqueService, private userService:UserService) {}
  ngOnInit(): void {
    Loading.dots();

    // Liste de tous les historiques 
    this.historiqueService.getAllHistorique().subscribe(
      (response:any) =>{
        // console.log(response.historiques);  
        this.tabHistotiquesByClasseUser = this.tabHistotiquesFiltered =  this.tabAllHistotiques = response.historiques;    
        
        Loading.remove();
      }
    )

    // Liste des utilisateurs 
    this.userService.getAllUsers().subscribe(
      (data:any) =>{
        // console.log(data);
        this.tabUtilisateurs = data.users;
      },
      (error) =>{
        // console.log(error);
        this.tabUtilisateurs = [];
      }
    )
  }

  // Methode de recherche 
  onSearch(){

  }

  entiteFiltered:string = "";
  messageInfoEntity: string = "";
  // Filtrer suivant l'entité 
  filteredByEntite (){
    this.userFiltered = "";
    this.messageInfoUser = "";
    this.messageInfoEntity = "";
    // alert(this.entiteFiltered);
    if(this.entiteFiltered && this.entiteFiltered != "tout"){ // Si on a selectionné une entité
      let tabFilterEntity =  this.tabHistotiquesByClasseUser.filter((historique:any)=> historique.Entite == this.entiteFiltered);
      if(tabFilterEntity.length){
        this.tabHistotiquesFiltered = tabFilterEntity;
        // if(!this.userFiltered){ // Si on n'as pas encore sélectionner de l'autre coté
        //   this.tabHistotiquesByClasseUser = this.tabHistotiquesFiltered;
        // }
      } else{
        this.messageInfoEntity = "Aucun resultat"
      }
    } 
    // else if(this.userFiltered){
    //   this.tabHistotiquesFiltered = this.tabAllHistotiques.filter((historique:any)=> historique.Utilisateur == this.userFiltered);
    // }
    // else if (!this.entiteFiltered || this.entiteFiltered == "tout"){
    //   this.tabHistotiquesFiltered = this.tabAllHistotiques;
    // }
  }

  userFiltered:string = "";
  messageInfoUser: string = "";
  // Filtrer suivant l'entité 
  filteredUser (){
    this.messageInfoUser = "";
    this.entiteFiltered = "";
    this.messageInfoEntity = "";
    // alert(this.userFiltered);
    if(this.userFiltered && this.userFiltered != "tout"){
      let tabFilterByUser =  this.tabHistotiquesByClasseUser.filter((historique:any)=> historique.Utilisateur == this.userFiltered);
      if(tabFilterByUser.length){
        this.tabHistotiquesFiltered = tabFilterByUser;
        // if(!this.entiteFiltered){
        //   this.tabHistotiquesByClasseUser = this.tabHistotiquesFiltered;
        // }
      } else{
        this.messageInfoUser = "Aucun resultat"
      }
    } 
    // else if(this.entiteFiltered){
    //   this.tabHistotiquesFiltered = this.tabAllHistotiques.filter((historique:any)=> historique.Entite == this.entiteFiltered);
    // }
    // else if(!this.userFiltered || this.userFiltered == "tout"){
    //   this.tabHistotiquesFiltered = this.tabAllHistotiques;
    // }
  }

  // Détails de l'historique 
  detailsHistorique(item:any){
    this.historique = item;
  }

  

  // Pagination pour tous les tableaux de manières automatique
  getItemsPage(){
    const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
    const indexFin = indexDebut + this.itemsParPage;
    return this.tabHistotiquesFiltered.slice(indexDebut, indexFin);

  }

  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.tabHistotiquesFiltered.length / this.itemsParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.tabHistotiquesFiltered.length / this.itemsParPage);
  }

  
}
