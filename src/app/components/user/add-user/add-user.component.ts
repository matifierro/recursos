import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent  {

  userForm!: FormGroup;

  constructor(private userService: UserService, 
    private formBuilder: FormBuilder, 
    private router: Router){

      this.userForm = this.formBuilder.group({

        firstName: ['', [Validators.required,Validators.minLength(3)]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]

      })

    }

    get firstName() {return this.userForm.get('firstName')}
    get lastName() {return this.userForm.get('lastName')}
    get email() {return this.userForm.get('email')}
    get password() {return this.userForm.get('password')}


  onSubmit(){
    if (this.userForm.valid) {

      console.log('Formulario válido, datos del usuario:', this.userForm.value);
    
      const user = new User();

      user.firstName = this.userForm.get('firstName')?.value!;
      user.lastName = this.userForm.get('lastName')?.value!;
      user.email = this.userForm.get('email')?.value!;
      user.password = this.userForm.get('password')?.value!;

      console.log(user);

      this.userService.addUser(user).subscribe(
        response => {
          console.log('usuario guardado:', response);

          Swal.fire({
            text: 'Usuario creado con exito',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.router.navigateByUrl('login');
        },
        error => {
          console.error('Error al guardar el curso:', error);
          Swal.fire({
            text: 'Error al guardar el usuario',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      )} 
      else {
      console.log('Formulario no válido');
    }
  }
}
