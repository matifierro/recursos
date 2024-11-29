import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials } from '../models/login-credentials';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userTypeSubject = new BehaviorSubject<string | null> (sessionStorage.getItem('type')); //lee valor inicial de session storage
  userType$ = this.userTypeSubject.asObservable(); 


  token!: string | null ;
  userDetails = undefined;
  userType!: string;

  loginUrl = "http://localhost:3000/users";
  redirectUrl: string = "";

  constructor (private http: HttpClient){

  }

    login(loginCredentials: { email: string, password: string }): Promise<any> {
        return this.http.get<any[]>(this.loginUrl).toPromise()
          .then(users => {
            if (users && users.length > 0) {
              // Buscar coincidencia en el array de usuarios
              const user = users.find(u => 
                u.email === loginCredentials.email && 
                u.password === loginCredentials.password
              );
    
              if (user) {
                // Guardar el userId como token
                this.token = user.id.toString();
                sessionStorage.setItem('token', this.token!);
                console.log('guardo el token:', this.token);
                this.userType = user.type;
                sessionStorage.setItem('type', this.userType);
                console.log('guardo el type:', this.userType);

                this.setUserType(this.userType);

                return Promise.resolve({ success: true, userId: this.token });
              } else {
                return Promise.reject('Invalid email or password');
              }
            } else {
              return Promise.reject('No users found');
            }
          })
          .catch(error => {
            console.log(error);
            return Promise.reject(error);
          });
      }

      setUserType(type: string){
        sessionStorage.setItem('type', type);
        this.userTypeSubject.next(type); //notifica cambios
         console.log('tipo de usuario', type);
      }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('type');
    /* this.token = null; */
    this.userTypeSubject.next(null); //resetea el estado
  }
}