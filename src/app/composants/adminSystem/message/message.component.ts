import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit{
  // Déclaration des variables 
  tabMessage: any[] = [
    {
      id: 1,
      email: "gg@gmail.com",
      sujet: "Demande d'info",
      message: "Je veux un compte",
      createdAt: "10/11/2023"
    },
    {
      id: 2,
      email: "gg@gmail.com",
      sujet: "Demande d'info",
      message: "Je veux un compte",
      createdAt: "11/11/2023"
    },
    {
      id: 3,
      email: "gg@gmail.com",
      sujet: "Demande d'aide",
      message: "Je veux un compte",
      createdAt: "20/11/2023"
    },
    {
      id: 4,
      email: "gg@gmail.com",
      sujet: "Demande de renseignement",
      message: "Je veux un compte",
      createdAt: "14/11/2023"
    },

  ]

  tabMessageFilter: any[] = [];

  tabContacts: Contact[] = [];
  tabContactsFilter: Contact[] = [];
  filterValue: string = "";

  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle


  // Déclaration des méhodes 
  constructor(private contactService: ContactService){}

  ngOnInit(): void {
    // this.tabMessageFilter = this.tabMessage
    this.listeContacts();
  }

  // Methode de recherche automatique pour les reseaux
  onSearch(){
    // Recherche se fait selon le nom ou le prenom 
    this.tabContactsFilter = this.tabContacts.filter(
      (elt:any) => (elt?.email.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.sujet.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.message.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.createdAt.toString().toLowerCase().includes(this.filterValue.toLowerCase())) 
    );
  }

  // Methode pour récupérer la liste des messages 
  listeContacts(){
    this.contactService.getAllContacts().subscribe(
      (data:any) =>{
        console.log(data)
        this.tabContacts = this.tabContactsFilter = data.contact;
        console.log(this.tabContacts)
      }, 
      (err:any)=>{
        this.tabContacts = [];
      }
    )
  }
  // Pagination pour tous les tableaux de manières automatique
  getItemsPage(){
    const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
    const indexFin = indexDebut + this.itemsParPage;
    return this.tabContactsFilter.slice(indexDebut, indexFin);

  }

  // Méthode pour générer la liste des pages
  get pages(): number[] {
    const totalPages = Math.ceil(this.tabContactsFilter.length / this.itemsParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.tabContactsFilter.length / this.itemsParPage);
  }
}
