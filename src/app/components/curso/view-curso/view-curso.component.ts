import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-curso',
  templateUrl: './view-curso.component.html',
  styleUrls: ['./view-curso.component.css']
})
export class ViewCursoComponent implements OnInit {
 
  cursos: any[] = [];
  cursosFiltrados: Curso[] = [];
 
  constructor(private cursoService : CursoService, private router: Router, private userService : UserService){}


  /* comprarCurso(cursoId : number): void{
    console.log('Navegando a curso:', cursoId);
    // Redirigir al componente de presentación del curso
    this.router.navigate(['/creditCard', cursoId]);
  }
 */
  comprarCurso(cursoId: number): void {
    const userId = Number(sessionStorage.getItem('token')); // Obtén el ID del usuario logueado
  
    if (!userId) {

      
      Swal.fire({
        
        text: 'Inicia sesión para comprar el curso',
        icon: 'warning',
        confirmButtonText: 'OK'
      })
      
      return;
    }
  
    this.userService.getUserById(userId).subscribe(
      (user) => {
        // Verificamos si el curso está en los cursos dictados
        if (user.cursosDictados.includes(cursoId)) {
          

          
          Swal.fire({
            
            text: 'No puedes comprar un curso que tu dictas',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        } else {
          // Continúa con el flujo de compra
          console.log("puedes comprar este curso")
          this.router.navigate(['/creditCard/', cursoId]);
          console.log("el id del curso es", cursoId)
        }
      },
      (error) => {
        console.error('Error al verificar los cursos dictados:', error);
        
        Swal.fire({
          title: 'Error!',
          text: 'Error al verificar los cursos dictados',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    );
  }

  ngOnInit(): void {
    this.cursoService.getCursos().subscribe((data) =>{
      this.cursos = data;
      this.cursosFiltrados = this.cursos.filter(curso => curso.online === true); // Solo cursos online
    });
  }

}
