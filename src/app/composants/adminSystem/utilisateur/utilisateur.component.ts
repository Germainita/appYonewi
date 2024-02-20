import { Component } from '@angular/core';
import { error } from 'highcharts';
import { Reseau } from 'src/app/models/reseau.model';
import { Role } from 'src/app/models/role.model';
import { User, UserModif } from 'src/app/models/user.model';
import { ReseauService } from 'src/app/services/reseau.service';
import { RoleService } from 'src/app/services/role.service';
import { sweetAlertMessage, sweetMessageConfirm } from 'src/app/services/sweetAlert/alert.service';
import { UserService } from 'src/app/services/user.service';
import { validateEmail, validateLengthField, validateName, validatePassword, validatePhone } from 'src/app/validation/validation';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent {
  // Déclaration des variables 
  isUsersActifs:boolean = true;
  isUsersBloqued:boolean = false;

  // Le tableau des role 
  tabRole : Role[] = []
  
  // le tableau des reseau 
  tabReseaux: Reseau[] = []
  
  
  tabUtilisateur: User[] = []
  tabUtilisateurFilter: User[] = [];
  filterValue: string = "";
  utilisateur = new User;

  tabFilter: any;

  // user blocked 
  tabUtilisateurBlocked: User[] = []
  tabUtilisateurBlockedFilter: User[] = [];

  role_id?: number;

  emailModif: string = "";
  passwordModif: string = "";

  messageText?: string
  messagebtn?: string
  textMotif?: string
  motif: string = "";

  motifObject: any;

  // Parametre pour bloquer ou supprimer 
  block:boolean = false; //Pour bloquer un utilisateur
  unblock:boolean = false; //Pour bloquer un utilisateur
  delete:boolean = false; //Pour supprimer un utilisateur

  // Attribut pour la pagination
  itemsParPage = 3; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle

  // Validations 
  // Mot de passe 
  isPasswordValid:boolean = false;
  passwordMessage: string = "";

  // Nom 
  isNameValid: boolean = false;
  nameMessage: string = "";

  // Prénom 
  isPrenomValid: boolean = false;
  prenomMessage: string = "";

  // Téléphone 
  isPhoneValid: boolean = false;
  phoneMessage: string = "";

  // Adresse 
  adresseMessage: string = "";
  isAdresseValid: boolean = false;

  // Email 
  isEmailValid: boolean = false;
  emailMessage: string = "";


  // Déclaration des méhodes 
  constructor(private reseauService:ReseauService,  private roleService: RoleService, private userService:UserService ){}

  ngOnInit(): void {
    // this.tabUtilisateurFilter = this.tabUtilisateur;
    this.listeUsers();
    this.listeReseau();
    this.listeRoles();
    this.listeUsersBlocked();
  }

  showUsersActifs(){
    this.isUsersActifs = true;
    this.isUsersBloqued= false;
    this.filterValue = "";
  }

  showUsersBlocked(){
    this.isUsersActifs = false;
    this.isUsersBloqued= true;
    this.filterValue = "";
  }

  // Methode de recherche pour les users actifs
  onSearch(){
    // Recherche se fait selon le nom ou le prenom 
    this.tabUtilisateurFilter = this.tabUtilisateur.filter(
      (elt:any) => (elt?.nom.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.prenom.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.email.toLowerCase().includes(this.filterValue.toLowerCase())) 
    );
  }

  // Methode de recherche pour les users bloqués
  onSearchBlocked(){
    // Recherche se fait selon le nom ou le prenom 
    this.tabUtilisateurBlockedFilter = this.tabUtilisateurBlocked.filter(
      (elt:any) => (elt?.nom.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.prenom.toLowerCase().includes(this.filterValue.toLowerCase())) || (elt?.email.toLowerCase().includes(this.filterValue.toLowerCase())) 
    );
  }
  

  // Liste des réseaux actifs 
  listeReseau(){
    this.reseauService.getAllReseaux().subscribe(
      (data:any) =>{
        console.log (data)
        this.tabReseaux  = data.reseaux;
        console.log(this.tabReseaux);
      },
      (error) =>{
        console.log (error)
      }
    )
  }

  // Liste des roles actifs
  listeRoles(){
    this.roleService.getAllRoles().subscribe(
      (data: any) =>{
        // On filtre les roles actifs 
        // console.log(data);
        this.tabRole = data.roles.filter((role:any) => role.etat == "actif");
        console.log(this.tabRole);
      }
    )
  }

  // Liste des utilisateurs 
  listeUsers(){
    this.userService.getAllUsers().subscribe(
      (data:any) =>{
        console.log(data);
        this.tabUtilisateur = this.tabUtilisateurFilter = data.users;
      },
      (error) =>{
        console.log(error);
        this.tabUtilisateur = [];
      }
    )
  }

  // Liste des utilisateurs 
  listeUsersBlocked(){
    this.userService.getAllUsersBlocked().subscribe(
      (data:any) =>{
        // console.log(data);
        this.tabUtilisateurBlocked = this.tabUtilisateurBlockedFilter = data.users;
      },
      (error) =>{
        console.log(error);
        this.tabUtilisateurBlocked = [];
      }
    )
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

  // Vérification des infos avant ajout ou modification   
  
  // Vérif mot de passe par défaut
  verifPasswordFunction(password:any){
    this.passwordMessage = "";
    this.isPasswordValid = validatePassword(password);
    if(!this.isPasswordValid){
      this.passwordMessage = "Le format du mot de passe est incorrect";
    } else if(!password){
      this.passwordMessage = "Le mot de passe est obligatoire";
    }
     else {
      this.passwordMessage = "";
    }
  }
  

  // Vérification du nom 
  verifNameFunction(name:any){
    this.nameMessage = "";
    this.prenomMessage = "";

    // Vérification du format du nom ou du prénom 
    let nameLengthvalidate = validateLengthField(name, 2)
    let nameFormatValidate = validateName(name);
    if(!name){
      this.nameMessage = "Le nom est obligatoire";
    } else if (!nameLengthvalidate) {
      this.nameMessage = "La longueur doit être supérieur ou égale à 2";
    }
    else if(!nameFormatValidate){
      this.nameMessage = "Ce champ ne doit pas contenir de chiffre ni de caractères speciaux.";
    } else {
      this.nameMessage = "";
      this.isNameValid =  true;
    }
  }

  // Vrification du prénom 
  verifPrenomFunction(name:any){
    this.prenomMessage = "";

    let nameLengthvalidate = validateLengthField(name, 2)
    let nameFormatValidate = validateName(name);
    if(!name){
      this.prenomMessage = "Le prenom est obligatoire";
    } else if (!nameLengthvalidate) {
      this.prenomMessage = "La longueur doit être supérieur ou égale à 2";
    }
    else if(!nameFormatValidate){
      this.prenomMessage = "Ce champ ne doit pas contenir de chiffre ni de caractères speciaux.";
    } else {
      this.prenomMessage = "";
      this.isPrenomValid = true;
    }
  }

  // Vérification du numéro de téléphone 
  verifPhoneFunction(Phone:any){
    this.phoneMessage = "";

    let PhoneFormatValidate = validatePhone(Phone);
    if(!Phone){
      this.phoneMessage = "Le numéro de telephone est obligatoire";
    }else if(!PhoneFormatValidate){
      this.phoneMessage = "Le format est incorrect";
    } else {
      this.phoneMessage = "";
      this.isPhoneValid = true;
    }
  }

  
  // Vérification de l'email 
  verifEmailFunction(email: any){
    this.emailMessage = "";
    this.isEmailValid = validateEmail(email);
    if(!email){
      this.emailMessage = "L'email est obligatoire"
    }else if(!this.isEmailValid){
      this.emailMessage = "Le format de l'email est incorrect";
    } else{
      this.emailMessage = "";
      this.isEmailValid = true;
    }
  }

  // Vérification de l'adresse 
  verifAdresseFunction(adresse:any){
    this.adresseMessage = "";

    let adresseLengthvalidate = validateLengthField(adresse, 3)
    if(!adresse){
      this.adresseMessage = "L'adresse est obligatoire";
    } else if (!adresseLengthvalidate) {
      this.adresseMessage = "La longueur doit être supérieur ou égale à 3";
    } else {
      this.adresseMessage = "";
      this.isAdresseValid = true;
    }
  }

  reseauMessage: string = "";
  isReseauValid: boolean = false;
  // Vérification du reseau  
  verifReseauFunction(reseau:any){
    this.reseauMessage = "";
    if(!reseau){
      this.reseauMessage = "L'reseau est obligatoire";
    }  else {
      this.reseauMessage = "";
      this.isReseauValid = true;
    }
  }

  // Ajouter un compte pour admin reseau 
  ajouterAdmin(){
    this.verifNameFunction(this.utilisateur.nom);
    this.verifPrenomFunction(this.utilisateur.prenom);
    this.verifAdresseFunction(this.utilisateur.adresse);
    this.verifEmailFunction(this.utilisateur.email);
    this.verifPasswordFunction(this.utilisateur.password);
    this.verifPhoneFunction(this.utilisateur.telephone);

    // On recherche dans la table réseau le role adminReseau 
    let roleAdminRoseau = this.tabRole.find((role:any) => role.nom.toLowerCase() == "adminreseau");

    if(this.isNameValid && this.isPrenomValid && this.isPhoneValid && this.isAdresseValid && this.isEmailValid && this.isPasswordValid) {
      // On peut faire appelle au service 
      // Le mot de passe de confirmation est le meme que celui par defaut 
      this.utilisateur.password_confirmation = this.utilisateur.password;
      this.utilisateur.role_id = roleAdminRoseau.id;
      
      this.userService.addAdminReseau(this.utilisateur).subscribe(
        (data:any) =>{
          // console.log(data);
          if(data.status){
            // console.log(data.message);
            sweetAlertMessage("success", "", "Compte créé avec succès");
            this.listeUsers();
            this.viderChamps();
          }
          else if(!data.success){
            console.log(data.errors);

            if(data.errors.email){
              sweetAlertMessage("error", "", data.errors.email);
            }
            if(data.errors.password){
              sweetAlertMessage("error", "", data.errors.password);
            }
            if(data.errors.telephone){
              sweetAlertMessage("error", "", data.error.errors.telephone);
            }
            
          } 
          else if (data.status){
            sweetAlertMessage("success", "", data.message);
          }
        },
        (err) =>{
          // console.log("Les erreurs");
          
          // console.log(err);
          // console.log(err.error.errors);
          // si l'email existe déjà 
          if(err.error.errors.email){
            this.emailMessage = err.error.errors.email[0];
          }          
          // si le mot de passe existe 
          if(err.error.errors.password){
            this.passwordMessage = err.error.errors.password[0];
          }          
          // si le téléphone existe déjà 
          if(err.error.errors.telephone){
            this.phoneMessage = err.error.errors.telephone[0];
          }          
        }
      )
    }
  }

  viderChamps(){
    this.utilisateur.nom = "";
    this.utilisateur.prenom = "";
    this.utilisateur.adresse = "";
    this.utilisateur.telephone = "";
    this.utilisateur.email = "";
    this.utilisateur.password = "";
    this.utilisateur.password_confirmation = "";
    this.utilisateur.role_id =0;
    this.utilisateur.reseau_id =0;
  }

  verifEmailModif(emailModif:any){
    this.emailMessage = "";
    if(emailModif){
      this.isEmailValid = validateEmail(emailModif);
      if(!this.isEmailValid){
        this.emailMessage = "Le format de l'email est incorrect";
        this.isEmailValid = false;
      } else{
        this.emailMessage = "";
        this.isEmailValid = true;
      }

    }
  }

  verifPhoneModif(phone:any){
    this.phoneMessage = "";
    if(this.telephoneModif){
      let phoneFormatValidate = validatePhone(phone);
      if(!phone){
        this.phoneMessage = "Le numéro de telephone est obligatoire";
      }else if(!phoneFormatValidate){
        this.phoneMessage = "Le format est incorrect";
      } else {
        this.phoneMessage = "";
        this.isPhoneValid = true;
      }

    }
  }

  // Vérif mot de passe par défaut
  verifPasswordModifFunction(passwordModif:any){
    this.passwordMessage = "";
    if(passwordModif){
      this.isPasswordValid = validatePassword(passwordModif);
      if(!this.isPasswordValid){
        this.passwordMessage = "Le format du mot de passe est incorrect";
      } 
       else {
        this.passwordMessage = "";
      }
    }
  }
  telephoneModif:string  = "";
  // Modifier un compte 
  infosCompte(user:any){
    this.utilisateur = user;
    this.telephoneModif = user.telephone;
    this.emailModif = user.email;
    // ici tout est ok 
    // this.isNameValid = true;
    // this.isPrenomValid = true;
    // this.isAdresseValid = true;
    // this.isEmailValid = true;
    // this.isAdresseValid = true;
    // this.isPasswordValid = true;
    // this.isPhoneValid = true;
    // this.isReseauValid = true;
    // alert(this.isNameValid);
  }

  // Bon 
  
  modifAdminReseau(){
    let dataModif = new UserModif
    dataModif.id = this.utilisateur.id;
    dataModif.nom = this.utilisateur.nom;
    dataModif.prenom = this.utilisateur.prenom;
    // dataModif.telephone = this.utilisateur.telephone;
    dataModif.adresse = this.utilisateur.adresse;
    dataModif.reseau_id = this.utilisateur.reseau_id;

    this.verifNameFunction(dataModif.nom);
    this.verifPrenomFunction(dataModif.prenom);
    this.verifAdresseFunction(dataModif.adresse);
    this.verifEmailModif(this.emailModif);
    this.verifPasswordModifFunction(this.passwordModif);
    this.verifPhoneModif(this.telephoneModif);

    if(this.isNameValid && this.isPrenomValid && this.isPhoneValid && this.isAdresseValid) {
      
      if(this.emailModif != this.utilisateur.email){
        dataModif.email = this.emailModif
      }
      if (this.passwordModif){
        dataModif.password = this.passwordModif;
      }

      if(this.telephoneModif!= this.utilisateur.telephone) {
        dataModif.telephone = this.telephoneModif;
      }
      
      // console.log(dataModif);
      sweetMessageConfirm("Vous allez modifier ce compte", "Oui je modifie").then( (result) =>{      
        if(result.isConfirmed ){
          this.userService.updateAdminReseau(dataModif.id, dataModif).subscribe(
            (data:any) =>{
              console.log(data);
              if(data.status){
                // console.log(data.message);
                sweetAlertMessage("success", "", data.message);
                this.listeUsers();
                this.viderChamps();
              }
              else if(!data.success){
                if(data.errors.email){
                  sweetAlertMessage("error", "", data.errors.email);
                }
                if(data.errors.password){
                  sweetAlertMessage("error", "", data.errors.password);
                }
                if(data.errors.telephone){
                  sweetAlertMessage("error", "", data.errors.telephone);
                }
              } 
              // sweetAlertMessage("success", "", data.message);
              // this.viderChamps()
            },
            (err) =>{
              // console.log("Les erreurs");
              
              // console.log(err);
              // console.log(err.error.errors);
              // si l'email existe déjà 
              if(err.error.errors.email){
                this.emailMessage = err.error.errors.email[0];
              }          
              // si le mot de passe existe 
              if(err.error.errors.password){
                this.passwordMessage = err.error.errors.password[0];
              }          
              // si le téléphone existe déjà 
              if(err.error.errors.telephone){
                this.phoneMessage = err.error.errors.telephone[0];
              }          
            }
          )
        }
      })

    }
  }

  // Les infos à envoyer pour la confirmation de la suppression
  supInfos(user:any){
    this.messageText = "Vous allez supprimer définitvement ce compte";
    this.messagebtn = "Oui je supprime"; 
    this.textMotif = "Motif de suppression"
    this.utilisateur = user;
    this.delete = true;
    this.block = false;
    this.unblock = false;
  }

  // Les infos à envoyer pour la confirmation du bloquage
  blockInfos(user:any){
    this.messageText = "Vous allez bloquer ce compte";
    this.messagebtn = "Oui je bloque"; 
    this.textMotif = "Motif de bloquage"
    this.utilisateur = user;
    this.delete = false;
    this.block = true;
    this.unblock = false;
  }

  // Les infos à envoyer pour la confirmation du débloquage
  unblockInfos(user:any){
    this.utilisateur = user;
  }

  // Supprimer bloquer ou débloquer un utilisateur 
  changeEtatAdminReseau(){
    if(!this.motif && (this.delete || this.block)){
      sweetAlertMessage("error", "", "Le motif est obligatoire");
    } else {
      this.motifObject = {
        "motif": this.motif
      };
      console.log(this.motif);
    }
    if(this.delete){
      // Suppression d'un admin réseau 
      this.userService.deleteAdminReseau(this.utilisateur.id, this.motifObject).subscribe(
        (data:any) =>{
          console.log(data); 
          sweetAlertMessage("success", "", data.message);
          this.listeUsers(); 
          this.motif = "";       
        },
        (error:any) =>{
          console.log(error);
        }
      )
    } else if(this.block){
      // Bloquer un admin réseau 
      this.userService.blockAdminReseau(this.utilisateur.id, this.motifObject).subscribe(
        (data:any) =>{
          console.log(data);
          sweetAlertMessage("success", "", data.message);
          this.listeUsers();
          this.listeUsersBlocked();
          this.motif = "";
        },
        (err) =>{
          console.log(err)
        }
      )
    } 
    // else if(this.unblock){
    //   // Débloquer un admin réseau 
    //   this.userService.unblockAdminReseau(this.utilisateur.id).subscribe(
    //     (data:any) =>{
    //       console.log(data);
    //       sweetAlertMessage("success", "", data.message);
    //     },
    //     (err) =>{
    //       console.log(err)
    //     }
    //   )
    // }
  }

  // Methode pour débloquer un utilisateur 
  unblockUser(){
    sweetMessageConfirm("Vous allez débloque ce compte", "Oui je débloque").then( (result) =>{
      if(result.isConfirmed ){
        this.userService.unblockAdminReseau(this.utilisateur.id).subscribe(
          (data:any) =>{
            console.log(data);
            sweetAlertMessage("success", "", data.message);
            this.listeUsersBlocked();
            this.listeUsers();
          },
          (err) =>{
            console.log(err)
          }
        )
      }
    })
  }

  // Pagination pour tous les tableaux de manières automatique
  // getItemsPage(){
  //   const indexDebut = (this.pageActuelle - 1) * this.itemsParPage;
  //   const indexFin = indexDebut + this.itemsParPage;
  //   return this.tabUtilisateurFilter.reverse().slice(indexDebut, indexFin);

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
