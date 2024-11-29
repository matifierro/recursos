import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  
  constructor(private router: Router) { }

 // Cierre de sesion 
  logOut(){
  localStorage.clear();
  this.router.navigateByUrl("/viewCurso");
  //window.location.reload();
}

// retorna un numero con el id del usuario logueado, o null si no hay logueado
getUsuarioLogueadoId(): number | null {
  const userIdString = localStorage.getItem("token");


  if (userIdString !== null && typeof userIdString === 'string') {
    const userId = parseInt(userIdString, 10);


    if (!isNaN(userId)) {
      return userId;
    }
  }
  return null;
}

 // Retorna el e tipo usuario ó null si no estuviera logueado.
  //NOTA: se deberia usar junto con el metodo usuarioLogueadoId
  getTipoUsuarioLogueado(): string | null {
    let userType = localStorage.getItem("type");
   
    return (userType !== null) ? JSON.parse(userType) : null;
}

}
