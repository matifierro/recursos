import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  
  constructor(/* private sessionService: SessionService, */ private authService : AuthService, private cdr: ChangeDetectorRef) {}

  
  userId!: string | null;
  userType: string | null = null;
  
 
 /*  token = sessionStorage.getItem("token");
  type = sessionStorage.getItem("type"); */


  ngOnInit(): void {




    this.authService.userType$.subscribe((type) => {
      this.userType = type;
       this.cdr.detectChanges();  // Forzar actualización de la vista
       console.log('tipo de usuario actualizado', type)
    });
    // this.userId = this.session.getUsuarioLogueadoId();
   // this.userType= this.session.getTipoUsuarioLogueado(); 

    /* this.userId = this.token;
    console.log('user id', this.userId);
    this.userType = this.type;
    console.log('tipo',this.userType); */
    //window.location.reload();
  }
 
  logout(): void {
    this.authService.logout();
    this.userType = null; // Actualizar inmediatamente la vista
  }
 
}




