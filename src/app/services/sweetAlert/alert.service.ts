import { Injectable } from "@angular/core";
import Swal from "sweetalert2";
// import '../../../style.css'


// @Injectable({
//     providedIn: "root"
// })

export const sweetAlertMessage = (icone:any, title:any, text:any) =>{
    Swal.fire({
        position: 'center',
        icon: icone,
        title: title,
        text: text,
        timer: 3000,
        showConfirmButton: false,
    })
}
// export class SweetAlertService {
//     sweetMessage(icone:any, title:any, text:any){
//         Swal.fire({
//             position: 'center',
//             icon: icone,
//             title: title,
//             text: text,
//             showConfirmButton: true,
//         })
//     }
// }

// Methode pour modifier la matière 
 export const sweetMessageConfirm = (text: any, textConfimBtn: any ) =>{
   return Swal.fire({
    title: "Etes-vous sur???",
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#2CCED2",
    // cancelButtonColor: "#F05941",
    confirmButtonText: textConfimBtn,
    cancelButtonText: "Annuler",
    customClass: {  
      actions: 'my-actions',
      cancelButton: 'order-1 btnClancelAlert',
      confirmButton: 'order-2',
    },
  })
  // .then((result) => {
  //   if (result.isConfirmed) {
  //   //   this.matiereFound.description = this.description;
  //   //   this.matiereFound.updateAt = new Date();
  //   //   this.matiereFound.updateBy = this.adminConnect.email;
  //   //   console.log(this.matiereFound);
  //   //   console.log(this.tabMatieres);

  //   //   // Mis à jour du localStorage
  //   //   localStorage.setItem("matieres", JSON.stringify(this.tabMatieres));
  //   }
  // });
}