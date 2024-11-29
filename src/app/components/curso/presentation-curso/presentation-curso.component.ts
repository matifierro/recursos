import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from '../../../models/curso';
import { CursoService } from '../../../services/curso.service';

@Component({
  selector: 'app-presentation-curso',
  templateUrl: './presentation-curso.component.html',
  styleUrls: ['./presentation-curso.component.css']
})
export class PresentationCursoComponent implements OnInit {
  
  
 videoId: string | null = null;

 curso: Curso | null = null;

  constructor(private route: ActivatedRoute,
              private router : Router,
              private cursoService : CursoService
  ) {}



  ngOnInit(): void {
    // Captura el ID del video desde la URL
    /* this.videoId = this.route.snapshot.paramMap.get('videoId'); */

    const cursoId = this.route.snapshot.paramMap.get('cursoId');
    console.log('el id del curso es:', cursoId)
    if (cursoId) {
      console.log("curso id aca es de tipo", typeof(cursoId));

      const numericCursoId = +cursoId; // Convierte el cursoId a número
     console.log("El cursoId numérico es:", numericCursoId);

     console.log("curso id aca es de tipo", typeof(numericCursoId));
      this.cursoService.getCursoById(numericCursoId).subscribe(
        (data) => {
          this.curso = data;
        
          console.log("el id del json es de tipo:" , typeof(this.curso!.id))

          
          if (this.curso!.url) {


          }
        },
        (error) => {
          console.error('Error al obtener el curso:', error);
          // Redirigir si no se encuentra el curso
          this.router.navigate(['/login']);
        }
      );
    } else {
      // Manejar el caso en el que no se recibe un cursoId
      this.router.navigate(['/login']);
    }
  }






}


