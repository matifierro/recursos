import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = 'http://localhost:3000/users';
  private userList = new Array<User>();
  private cursoId= 0;

  constructor(private http: HttpClient) { }


  /* addUser(user : User): Observable<User>{
    return this.http.post<User>(this.apiUrl, user)
  } */


  addUser(user: User): Observable<User> {
    return new Observable<User>((observer) => {
      // Primero, obtenemos todos los cursos para encontrar el último ID
      this.getUsers().subscribe((users) => {
        const maxId = users.length > 0 ? Math.max(...users.map((c: User) => c.id)) : 0;
  
        console.log("recibo este parametro como ultimo id", maxId);
        // Asignar el nuevo ID autoincremental
        user.id= (maxId + 1);
       

        // Luego, enviamos el nuevo curso al servidor
        this.http.post<User>(this.apiUrl, user).subscribe({
          next: (nuevoUser) => {
            observer.next(nuevoUser);
            observer.complete();
          },
          error: (err) => {
            observer.error(err);
          },
        });
      });
    });
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl)
  }

   // Método para obtener un usuario por su ID

   getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  checkCursoInDictados(userId: number, cursoId: number): boolean {
    let isDictado = false;
    this.getUserById(userId).subscribe(
      (user) => {
        isDictado = user.cursosDictados.includes(cursoId);
      },
      (error) => {
        console.error('Error al verificar los cursos dictados:', error);
      }
    );
    return isDictado;
  }


}
