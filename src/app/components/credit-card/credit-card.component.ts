import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreditCardService } from '../../services/credit-card.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditCard } from '../../models/creditCard';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrl: './credit-card.component.css'
})
export class CreditCardComponent implements OnInit{

  creditCardForm = new FormGroup({
    nombre_titular: new FormControl('', [ Validators.required ]),
    numero: new FormControl('', [ Validators.required ]),
    expiracion: new FormControl('', [ Validators.required ]),
    codigo_seguridad: new FormControl('', [Validators.required])
  });

  public isLoading: boolean = false;
  public tarjetaValida : CreditCard[] = [];
  private cursoId!: number; // ID del curso que se está comprando

  get nombre_titular() { return this.creditCardForm.get('nombre_titular')?.value }
  get numero () {return this.creditCardForm.get('numero')?.value}
  get expiracion () {return this.creditCardForm.get('expiracion')?.value}
  get codigo_seguridad () {return this.creditCardForm.get('codigo_seguridad')?.value}
  
  constructor(private creditCard : CreditCardService, 
              private router: Router,
              private userService: UserService,
              private route: ActivatedRoute){}


  ngOnInit(): void {

     // Capturar el cursoId desde la URL
     
     const id = this.route.snapshot.paramMap.get('cursoId');
     console.log('el id curso del snapshot es:', id);
     if (id) {
       this.cursoId = +id;
     } else {
       alert('Error: No se pudo determinar el curso a comprar.');
       this.router.navigate(['/viewCurso']); // Redirigir a la página principal o de cursos
     }
  }

  
  onSubmit() {

  /*   console.log('Valores del formulario:', {
      nombre: this.creditCardForm.get('nombre_titular')?.value,
      numero: this.creditCardForm.get('numero')?.value,
      expiracion: this.creditCardForm.get('expiracion')?.value,
      codigo: this.creditCardForm.get('codigo_seguridad')?.value
    }); */


    if (this.creditCardForm.invalid) {
      

      Swal.fire({
        
        text: 'Por favor completa todos los campos',
        icon: 'warning',
        confirmButtonText: 'OK'
      })
      return;
    }
  
    // 1. Obtengo los valores del formulario
    const formData = {
      nombre_titular: this.creditCardForm.get('nombre_titular')?.value?.toLowerCase().trim(),
      number: Number(this.creditCardForm.get('numero')?.value),
      expiracion: this.creditCardForm.get('expiracion')?.value?.trim(),
      codigo_seguridad: Number(this.creditCardForm.get('codigo_seguridad')?.value)
    };
  
    // 2. Obtengo la tarjeta del servidor y comparo con la ingresada
    this.creditCard.getCreditCard().subscribe({
      next: (tarjetas) => {
        
        // 3. Buscar una tarjeta que coincida
        const tarjetaValida = tarjetas.find(tarjeta => 
          tarjeta.nombre_titular.toLowerCase().trim() === formData.nombre_titular &&
          tarjeta.number === formData.number &&
          tarjeta.expiracion === formData.expiracion &&
          tarjeta.codigo_seguridad === formData.codigo_seguridad
        );
  
        // 4. Si encontramos una tarjeta válida
        if (tarjetaValida) {
           
         

          Swal.fire({
            title: 'Tarjeta Valida!',
            text: 'Procesando compra...',
            icon: 'success',
            confirmButtonText: 'OK'
          })
        
           // Obtener el id del usuario actual 
           const userId = sessionStorage.getItem('token'); // Asegúrate de almacenar esto al loguear
          
 
           if (!userId) {
             alert('Error: No estás autenticado. Por favor, inicia sesión.');

             Swal.fire({
              title: 'Error!',
              text: 'No estas logueado. Por favor, inica sesion.',
              icon: 'warning',
              confirmButtonText: 'OK'
            })
             this.router.navigate(['/viewCurso']); // Redirigir a la página de login
             return;
           }
 
           const userIdNumber = parseInt(userId, 10);
           if (isNaN(userIdNumber)) {
           

            Swal.fire({
              title: 'Error!',
              text: 'EL id de usuario es invalido',
              icon: 'error',
              confirmButtonText: 'OK'
            })
            this.router.navigate(['/viewCurso']); // Redirigir a login
            return;
            }
            this.userService.getUserById(userIdNumber).subscribe((user) => {
              if (user) {
  
                  // Inicializar cursosComprados si está undefined
                  user.cursosComprados = user.cursosComprados || [];
  
                // Verificar si el curso ya ha sido comprado
                if (user.cursosComprados.includes(this.cursoId)) {

                  Swal.fire({
                    
                    text: 'Ya compraste este curso',
                    icon: 'warning',
                    confirmButtonText: 'Cool'
                  })
               
                 return;
                 }
  
                // Agregar el curso al array cursosComprados
                user.cursosComprados.push(this.cursoId);
  
                // Actualizar el usuario en json-server
                this.userService.updateUser(user).subscribe(() => {

                  Swal.fire({
                   
                    text: 'Compra realizada con exito',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  })
                 
                  
                  // Redirigir al componente del curso comprado
                  this.router.navigate(['/curso', this.cursoId]);
  
                },
                (error) => {
                  Swal.fire({
                   title: 'Error al actualizar el usuario',
                    text: error.message ,
                    icon: 'error',
                    confirmButtonText: 'OK'
                  })
                  
                }
              
              );
              } else {

                Swal.fire({
                  
                   text: 'Usuario no encontrado' ,
                   icon: 'warning',
                   confirmButtonText: 'OK'
                 })
                
                
              }
            });

         
        } else {
          
          Swal.fire({
            
             text:'Tarjeta inválida. Por favor verifica los datos.' ,
             icon: 'error',
             confirmButtonText: 'OK'
           })
        }
      },
      error: (error) => {
        console.error('Error:', error);
        Swal.fire({
            
          text:'Ocurrió un error al validar la tarjeta' ,
          icon: 'error',
          confirmButtonText: 'OK'
        })

      }
    });
  }


}



   
  
