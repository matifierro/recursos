import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.authService.logout();
      Swal.fire({
       
        text: 'Sesion Cerrada',
        icon: 'success',
        /* confirmButtonText: 'Cool' */
      })
      this.router.navigateByUrl('/viewCurso');      
    }, 2000);      
  }

}
