import { Injectable } from '@angular/core';
import { Curso } from '../models/curso';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private apiUrl: string = 'http://localhost:3000/cursos';
   private cursosList = new Array<Curso>();
   private cursoId=0;
  
  constructor(private http: HttpClient) { }


   addCurso(curso: Curso): Observable<Curso> {
      return new Observable<Curso>((observer) => {
        // Primero, obtenemos todos los cursos para encontrar el último ID
        this.getCursos().subscribe((cursos) => {
          const maxId = cursos.length > 0 ? Math.max(...cursos.map((c: Curso) => c.id)) : 0;
    
          // Asignar el nuevo ID autoincremental
          curso.id= (maxId + 1);
          curso.date = new Date().toLocaleDateString('es-ES'); // Formato dd/mm/aaaa
          curso.online = true;
    
          console.log('Tipo de ID:', typeof curso.id, curso.id);

          // Luego, enviamos el nuevo curso al servidor
          this.http.post<Curso>(this.apiUrl, curso).subscribe({
            next: (nuevoCurso) => {
              observer.next(nuevoCurso);
              observer.complete();
            },
            error: (err) => {
              observer.error(err);
            },
          });
        });
      });
    }

  getCursos(): Observable<Curso[]>{
    return this.http.get<Curso[]>(this.apiUrl);
  }

  /* getCursoById(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/${id}`);
  } */

  getCursoById(id: number): Observable<Curso | null> {
    return this.http.get<Curso[]>(this.apiUrl).pipe(
      map((cursos) => cursos.find((curso) => `${curso.id}` === `${id}`) || null)
    );
  }


}


  /*   this.cursoId++;
    curso.id=this.cursoId;
    curso.date = new Date();
    curso.online = false;
    this.cursosList.push(curso); */