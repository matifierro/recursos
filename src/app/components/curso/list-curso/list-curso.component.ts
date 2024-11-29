import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-list-curso',
  templateUrl: './list-curso.component.html',
  styleUrl: './list-curso.component.css'
})
export class ListCursoComponent implements OnInit{

  cursosComprados: Curso[] = [];
  cursosDictados: Curso[] = [];
  currentUser!: User; // Usuario actual

constructor(private cursoService : CursoService, private userService : UserService){}

cursos: Curso[] = [];


  ngOnInit(): void {

    this.loadUserAndCourses();

    /* this.cursoService.getCursos().subscribe((data) =>{
      this.cursos = data;
      
    }) */
  }

  loadUserAndCourses(): void {
    const userId = this.getCurrentUserId(); // Método para obtener el ID del usuario actual (puedes ajustarlo)
    this.userService.getUserById(userId).subscribe((user) => {
      this.currentUser = user;

      // Obtener los cursos comprados
      this.cursoService.getCursos().subscribe((cursos) => {
        this.cursosComprados = cursos.filter((curso) =>
          user.cursosComprados.includes(Number(curso.id))
        );
        this.cursosDictados = cursos.filter((curso) =>
          user.cursosDictados.includes(Number(curso.id))
        );
      });
    });
  }

  // Método de ejemplo para obtener el ID del usuario actual
  getCurrentUserId(): number {
    // Aquí puedes usar sessionStorage, una variable global, o un servicio de autenticación
    console.log('el id del session storage es:',sessionStorage.getItem('token') );
    return Number(sessionStorage.getItem('token'));
    
  }
}
