import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SessionService } from './session.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sessionService: SessionService, private router: Router) { }


  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const usuarioId = this.sessionService.getUsuarioLogueadoId();
    if (usuarioId === null) {
      // Redirige al usuario a la página de inicio de sesión si no está autenticado
      return this.router.parseUrl('/viewCurso');
    }

    const tipoUsuario = this.sessionService.getTipoUsuarioLogueado();
    const rolesPermitidos = route.data['roles']; // Roles permitidos en la ruta

    // Si el tipo de usuario está dentro de los roles permitidos, permite el acceso
    if (rolesPermitidos && rolesPermitidos.includes(tipoUsuario)) {
      return true;
    } else {
      // Si el rol no está permitido, redirige a otra página
      return this.router.parseUrl('/viewCurso');
    }
  }


 /*  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ):  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
   // Verifica si el usuario está autenticado
   if (this.sessionService.getUsuarioLogueadoId === null) {
    // Redirige al usuario a la página de inicio de sesión si no está autenticado
    return this.router.parseUrl('/viewCurso');
  }

  // Obtiene el tipo de usuario
  const tipoUsuario = this.sessionService.getTipoUsuarioLogueado();



if(tipoUsuario! === 'ADMIN'){
  console.log('Administrador logueado');
  return true;
}else if(tipoUsuario! === 'USER'){
  console.log('Usuario logueado');
  return true;
}else {
  return this!.router!.parseUrl('/viewCurso')
}

} */

}