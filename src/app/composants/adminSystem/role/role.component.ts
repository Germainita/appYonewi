import { Component } from '@angular/core';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {
  // Déclaration des variables 
  tabRole: Role[] = [
    {
      id: 1,
      nom: "admin",
      createdAt: "10/11/2023"
    },
    {
      id: 2,
      nom: "adminReseau",
      createdAt: "11/11/2023"
    },
    {
      id: 3,
      nom: "citoyen",
      createdAt: "20/11/2023"
    },
    {
      id: 4,
      nom: "client",
      createdAt: "14/11/2023"
    },

  ]

  tabRoleFilter: Role[] = [];
  role = new Role;
  filterValue: string = "";

  // Attribut pour ajouter ou modifier 
  isAjout: boolean = true;
  isModifier: boolean = false;

  // Attribut pour la pagination
  itemsParPage = 2; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle


  // Déclaration des méhodes 
  ngOnInit(): void {
    this.tabRoleFilter = this.tabRole
  }

  // Methode de recherche automatique pour les reseaux
  onSearch(){
    // Recherche se fait selon le nom ou le prenom 
    this.tabRoleFilter = this.tabRole.filter(
      (elt:any) => (elt?.nom.toLowerCase().includes(this.filterValue.toLowerCase()))   
    );
  }


  // Voir Formulaire d'ajout 
  showAjoutRole(){
    this.isAjout = true;
    this.isModifier = false;
  }

  // showModifRoleForm()

  // Voir Formulaire de modification 
  showModifRole(element:any){
    this.isAjout = false;
    this.isModifier = true;
    this.role = element;
  }

  // Les détails du role 
  showDetailsRole(element:any){
    this.role = element;
  }


  // Pagination pour tous les tableaux de manières automatique
  getItemsPage(){
    const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
    const indexFin = indexDebut + this.itemsParPage;
    return this.tabRoleFilter.slice(indexDebut, indexFin);

  }

  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.tabRoleFilter.length / this.itemsParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.tabRoleFilter.length / this.itemsParPage);
  }
}
