import { Component } from '@angular/core';
import { Reseau } from 'src/app/models/reseau.model';
import { Role } from 'src/app/models/role.model';
import { Utilisateur } from 'src/app/models/utilisateur';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent {
  // Déclaration des variables 
  tabUtilisateur: Utilisateur[] = [
    {
      id: 1,
      nom: "diouf",
      prenom: "germaine",
      email: "gg@gmail.com",
      password: "passer123",
      adresse: "ouakam",
      telephone: "7777777",
      roleID: 1,
      reseauID: 1,
      createdAt: "10/11/2023",
      etat: "actif"
    },
    {
      id: 2,
      nom: "fall",
      prenom: "germaine",
      email: "gg@gmail.com",
      password: "passer123",
      adresse: "ouakam",
      telephone: "7777777",
      roleID: 2,
      reseauID: 2,
      createdAt: "10/11/2023",
      etat: "actif"
    },
    {
      id: 3,
      nom: "Gueye",
      prenom: "germaine",
      email: "gg@gmail.com",
      password: "passer123",
      adresse: "ouakam",
      telephone: "7777777",
      roleID: 1,
      reseauID: 2,
      createdAt: "10/11/2023",
      etat: "actif"
    },
    {
      id: 4,
      nom: "Bah",
      prenom: "germaine",
      email: "gg@gmail.com",
      password: "passer123",
      adresse: "ouakam",
      telephone: "7777777",
      roleID: 2,
      reseauID: 1,
      createdAt: "10/11/2023",
      etat: "actif"
    },

  ]

  // Le tableau des role 
  tabRole : any[] = [
    {
      id: 1,
      nom: "admin",
      createdAt: "10/12/2023"
    },
    {
      id: 2,
      nom: "client",
      createdAt: "10/12/2023"
    },

  ]

  // le tableau des reseau 
  tabReseaux: Reseau[] = [
    {
      id: 1,
      nom: "AFTU",
      lignes: [],
      description: ""
    },
    {
      id: 2,
      nom: "Dakar Dem Dikk",
      lignes: [],
      description: ""
    }
  ]


  tabUtilisateurFilter: Utilisateur[] = [];
  filterValue: string = "";
  utilisateur = new Utilisateur;

  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle


  // Déclaration des méhodes 
  ngOnInit(): void {
    this.tabUtilisateurFilter = this.tabUtilisateur;
  }

  // Methode de recherche automatique pour les reseaux
  onSearch(){
    // Recherche se fait selon le nom ou le prenom 
    this.tabUtilisateurFilter = this.tabUtilisateur.filter(
      (elt:any) => (elt?.nom.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.prenom.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.email.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.createdAt.toString().toLowerCase().includes(this.filterValue.toLowerCase())) 
    );
  }

  // Methode pour avoir le nom du role 
  getRoleName(idRole:number): string {
    let roleFound = this.tabRole.find((elemt:any) => (elemt.id == idRole) )
    if (roleFound){
      return roleFound.nom;
    }
    return ""
  }

  // Methode pour avoir le nom du role 
  getReseauName(idReseau:number): string {
    let reseauFound = this.tabReseaux.find((elemt:any) => (elemt.id == idReseau) )
    if (reseauFound){
      return reseauFound.nom;
    }
    return ""
  }


  // Modifier un compte 
  infosCompte(user:any){
    this.utilisateur = user;
  }






  // Pagination pour tous les tableaux de manières automatique
  getItemsPage(){
    const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
    const indexFin = indexDebut + this.itemsParPage;
    return this.tabUtilisateurFilter.slice(indexDebut, indexFin);

  }

  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.tabUtilisateurFilter.length / this.itemsParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.tabUtilisateurFilter.length / this.itemsParPage);
  }
}
