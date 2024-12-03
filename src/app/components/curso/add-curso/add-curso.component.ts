import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso } from '../../../models/curso';
import { CursoService } from '../../../services/curso.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-curso',
  templateUrl: './add-curso.component.html',
  styleUrls: ['./add-curso.component.css']
})
export class AddCursoComponent implements OnInit{

  cursoForm : FormGroup;
  urlImagen:string = ''; 

  constructor(private cursoService: CursoService, 
              private userService : UserService,
              private formBuilder: FormBuilder, 
              private router: Router){

    this.cursoForm = this.formBuilder.group({

      name: ['', [Validators.required]],
      description:['',[Validators.required]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+$')]],
      image: ['', [Validators.required, Validators.pattern(/.*\.(jpg|jpeg|png)$/)]],
      url:['', [Validators.required]],
      online: [true]
    })
  }
  
  get name() {return this.cursoForm.get('name')}
  get description() {return this.cursoForm.get('description')}
  get category() {return this.cursoForm.get('category')}
  get price() {return this.cursoForm.get('price')}
  get url() {return this.cursoForm.get('url')}
  get image() {return this.cursoForm.get('image')}
  

  ngOnInit(): void {}

    onImageSelected(event: Event): void {

      
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
       // Aquí puedes agregar validaciones de tipo de archivo y tamaño
       this.urlImagen = '/img/' + file.name;
       this.cursoForm.patchValue({
         image: this.urlImagen
       });
     }
    }  


  onSubmit(){
    if(this.cursoForm.valid){
      
    const curso = new Curso();

    curso.name = this.cursoForm.get('name')?.value!;
    curso.description = this.cursoForm.get('description')?.value!;
    curso.category = this.cursoForm.get('category')?.value!;
    curso.price = this.cursoForm.get('price')?.value!;
    curso.image = this.urlImagen; 
    curso.url = this.cursoForm.get('url')?.value;
    curso.online = this.cursoForm.get('online')?.value || true;

    console.log(curso);

    this.cursoService.addCurso(curso).subscribe(
          response => {
            console.log('Curso guardado:', response);


          // Ahora vincular el curso con el usuario
          this.linkCursoWithUser(response.id); // Pasamos el ID del curso guardado

          Swal.fire({
            
            text: 'Curso guardado con exito',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })

          },
          error => {
            console.error('Error al guardar el curso:', error);

            
          Swal.fire({
            
            text: 'Error al guardar el curso',
            icon: 'error',
            confirmButtonText: 'OK'
          })

          }
    )}
    /* this.router.navigateByUrl("/listCurso"); */

  }

  // Vincular el curso creado con el usuario
  linkCursoWithUser(cursoId: number) {
    // Supongo que el usuario está en sessionStorage, ajusta según tu lógica
    const userId = sessionStorage.getItem('token'); // O el método que uses para obtener el ID del usuario

    if (userId) {
      this.userService.getUserById(Number(userId)).subscribe(
        (user) => {
          user.cursosDictados.push(cursoId); // Añadimos el ID del curso al array de cursos dictados

          // Actualizamos el usuario con el nuevo curso
          this.userService.updateUser(user).subscribe(
            () => {
              console.log('Curso cargado al usuario');
              this.router.navigate(['/listCurso']); // Redirigimos al listado de cursos
            },
            (error) => {
              console.error('Error al actualizar el usuario:', error);
            }
          );
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    }
  }
  
  
}
