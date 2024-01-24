import { Component, OnInit } from '@angular/core';
import { Newsletter } from 'src/app/models/newsletter';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit{
  // Déclaration des variables 
  tabNewsletter: Newsletter[] = [
    {
      id: 1,
      email: "gg@gmail.com",
      createdAt: "10/11/2023"
    },
    {
      id: 2,
      email: "gg@gmail.com",
      createdAt: "11/11/2023"
    },
    {
      id: 3,
      email: "gg@gmail.com",
      createdAt: "20/11/2023"
    },
    {
      id: 4,
      email: "gg@gmail.com",
      createdAt: "14/11/2023"
    },

  ]

  tabNewsletterFilter: Newsletter[] = [];
  filterValue: string = "";

  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle


  // Déclaration des méhodes 
  ngOnInit(): void {
    this.tabNewsletterFilter = this.tabNewsletter
  }

  // Methode de recherche automatique pour les reseaux
  onSearch(){
    // Recherche se fait selon le nom ou le prenom 
    this.tabNewsletterFilter = this.tabNewsletter.filter(
      (elt:any) => (elt?.email.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.createdAt.toString().toLowerCase().includes(this.filterValue.toLowerCase()))  
    );
  }

  // Pagination pour tous les tableaux de manières automatique
  getItemsPage(){
    const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
    const indexFin = indexDebut + this.itemsParPage;
    return this.tabNewsletterFilter.slice(indexDebut, indexFin);

  }

  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.tabNewsletterFilter.length / this.itemsParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.tabNewsletterFilter.length / this.itemsParPage);
  }
}
