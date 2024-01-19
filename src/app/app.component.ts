import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appYonewi';

  alertSwet (){
    Swal.fire("Success", "alert test", "success")
  }

  test() {
    alert("Bonjour");
  }

  alert2() {
    Swal.fire({
    title: "Good job!",
    text: "You clicked the button!",
    icon: "success"
  });
  }
}
