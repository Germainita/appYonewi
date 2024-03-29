import { Component, OnInit } from '@angular/core';
import { Role} from 'src/app/models/role.model';
import { sweetAlertMessage, sweetMessageConfirm } from 'src/app/services/sweetAlert/alert.service';
import { RoleService } from 'src/app/services/role.service';
import { validateLengthField, validateLigneName } from 'src/app/validation/validation';
import { Loading, Notify } from 'notiflix';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit{
  // Déclaration des variables 

  // tabRole: Role[] = [
  //   {
  //     id: 1,
  //     nom: "admin",
  //     createdAt: "10/11/2023"
  //   },
  //   {
  //     id: 2,
  //     nom: "adminReseau",
  //     createdAt: "11/11/2023"
  //   },
  //   {
  //     id: 3,
  //     nom: "citoyen",
  //     createdAt: "20/11/2023"
  //   },
  //   {
  //     id: 4,
  //     nom: "client",
  //     createdAt: "14/11/2023"
  //   },

  // ]

  // tabRoleFilter: Role[] = [];
  // role = new Role;

  tabRole: Role[] = [];
  // tabRoleFilter: Role[] = [];
  
  // Tableau des roles actifs 
  tabRolesActif: Role[] = [];
  tabRoleFilterActifs: Role[] = [];

  // Tableau des roles supprimés
  tabRolesSup: Role [] = []; 
  tabRoleFilterSup: Role[] = [];

  role = new Role;
  filterValue: string = "";
  nomRole: string = "";

  // Attribut pour ajouter ou modifier 
  isAjout: boolean = true;
  isModifier: boolean = false;

  // Attribut pour voir la liste ou la corbeille
  isActifs: boolean = true; 
  isSup: boolean = false; 

  // Attribut pour la pagination
  itemsParPage = 2; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle

  // Le tableau filtrer peu importe la liste 
  tabFilter:any[] = [];

  constructor(private roleService:RoleService){}

  // Déclaration des méhodes 
  ngOnInit(): void {
    // On charge les roles à l'initialisation 
    this.listeRoles();

    this.listeRolesSup();

  }

  // Voir la liste des roles actifs 
  showRolesActifs(){
    this.isActifs = true;
    this.isSup = false;
    this.filterValue = "";
  }

  // Voir la liste des roles supprime 
  showCorbeille(){
    this.isSup = true;
    this.isActifs = false;
    this.filterValue = "";
    this.listeRolesSup();
  }

  // Methode de recherche automatique pour les reseaux
  onSearch(){
    // Recherche se fait selon le nom ou le prenom 
    this.tabRoleFilterActifs = this.tabRolesActif.filter(
      (elt:any) => (elt?.nom.toLowerCase().includes(this.filterValue.toLowerCase()))   
    );
  }

  // Recheche pour les roles actifs ou inactifs
  onSearchRoleSup(){
    // Recherche se fait selon le nom ou le prenom 
    this.tabRoleFilterSup = this.tabRolesSup.filter(
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

  // Liste des tous les roles 
  listeRoles(){
    Loading.dots();
    let response: any;
    this.roleService.getAllRoles().subscribe(
      (data) =>{
        response = data;
        this.tabRole = response.roles;

        // On filtre les roles actifs 
        this.tabRolesActif = this.tabRole.filter((role:any) => role.etat == "actif");
        // // console.log(this.tabRolesActif);
        this.tabRoleFilterActifs = this.tabRolesActif;  
        Loading.remove();
      },
      (err:any) =>{
        this.tabRolesActif = [];
        Loading.remove();
      }
    )
  }

  // Liste des roles supprimés 
  listeRolesSup(){
    this.roleService.getRolesDeleted().subscribe(
      (data:any) =>{
        // response = data.roles;
        // On filtre les roles supprimés 
        this.tabRolesSup = this.tabRoleFilterSup = data.roles;
      },
      (err) =>{
        // console.log(err);
        this.tabRolesSup = [];
      }
    )
  }

  // Vérification du nom de la ligne 
  verifMessageNom:string = "";
  isNomValide: boolean = false;
  verifNomRoleFunction(nom:any){
    this.verifMessageNom = "";
    this.isNomValide = validateLengthField(nom, 3);;
    let roleExist = this.tabRole.find((role:any) => role.nom.toLowerCase() == nom.toLowerCase());

    let roleExist1 = this.tabRolesSup.find((ligne:any) => ligne.nom.toLowerCase() == nom.toLowerCase());

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

  // Ajouter un role 
  ajoutRole(){
    this.verifNomRoleFunction(this.nomRole);
    if(this.isNomValide){
      let nom = {"nom": this.nomRole}
      this.roleService.addRole(nom).subscribe( 
        (data) =>{
          // console.log(data);
          sweetAlertMessage("success", "", "Role ajouté avec succes");
          this.listeRoles();
          this.nomRole = ""; // On vide le champs
        },
        (err) =>{
          // console.log(`Erreur lors de l'ajout ${err}`);
        }
      )
    }
  }

  
  verifModifNomRoleFunction(nom:any){
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
 // Modifier role 
  modifierRole(){
    this.verifModifNomRoleFunction(this.nomRole);
    if(this.isNomValide){
      let nom = {"nom": this.role.nom} 
    
      this.roleService.updateRole(this.role.id, nom).subscribe( 
        (resp) =>{
          sweetAlertMessage("success", "", "Role mis à jour avec succes");
          this.listeRoles();
          this.role.nom = "";
          this.showAjoutRole();
        },
        (err) =>{
          // console.log (err)

        }
      )
    }
  }

  // Supprimer un role
  supprimerRole(role:any){
    sweetMessageConfirm("Vous allez supprimer ce role", "Oui, je supprime").then( (result) =>{
      if(result.isConfirmed ){
        let response: any;
        this.roleService.deleteRole(role.id).subscribe(
          (data) =>{
            // console.log(data);
            response = data;
            sweetAlertMessage("success", "", response.message);
            this.listeRoles();
          },
          (err) => {
            alert("Error");
            // console.log(err);
          }
        )
      }
    })
    
  }

  // Restaurer un role 
  restaureRole(role:any){
    sweetMessageConfirm("Vous allez restaurer ce role", "Oui, je restaure").then( (result) =>{
      if(result.isConfirmed ){
        let response: any;
        role.etat = "actif";
        this.roleService.restaureRole(role.id).subscribe(
          (data) =>{
            // console.log(data);
            response = data;
            sweetAlertMessage("success", "", response.message);
            this.listeRoles();
            this.listeRolesSup();
          },
          (err) => {
            alert("Error");
            // console.log(err);
          }
        )
      }
    })
  }


  // Supprimer d"finitivement ce role 
  supprimerDefinitif(role:any){
    sweetMessageConfirm("Vous allez supprimer définitivement ce role", "Oui, je supprime").then( (result) =>{
      if(result.isConfirmed ){
        this.roleService.deleteDefinitif(role.id).subscribe(
          (data:any) =>{
            sweetAlertMessage("success", "", data.message);
            this.listeRolesSup();
          },
          (err) =>{
            // console.log(err);
          }
        )
        // this.roleService.restaureRole(role.id).subscribe(
        //   (data) =>{
        //     // console.log(data);
        //     response = data;
        //     sweetAlertMessage("success", "", response.message);
        //     this.listeRoles();
        //   },
        //   (err) => {
        //     alert("Error");
        //     // console.log(err);
        //   }
        // )
      }
    })
  }

  // Méthode pour vider la corbeille 
  viderCorbeille(){
      sweetMessageConfirm("Vous allez vider la corbeille", "Oui, je vide").then( (result) =>{
        if(result.isConfirmed ){
          this.roleService.emptyTrash().subscribe(
            (data:any) =>{
              sweetAlertMessage("success", "", data.message);
              this.listeRolesSup();
            }
          )
        }
      })
  }
  // Pagination pour tous les tableaux de manières automatique
  // getItemsPage(){
  //   const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
  //   const indexFin = indexDebut + this.itemsParPage;
  //   return this.tabRoleFilter.slice(indexDebut, indexFin);

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
