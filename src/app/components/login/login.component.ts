import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../auth/auth.service';
import { LoginCredentials } from '../../models/login-credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{


  loginForm = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [Validators.required])
  });

  get email() { return this.loginForm.get('email')?.value }

  get password() { return this.loginForm.get('password')?.value }




  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


  

  onSubmit() {
  
  if (this.loginForm.invalid) {
    alert('Por favor, complete todos los campos correctamente.');
    return;
  }
  
  let userCredentials = new LoginCredentials();
  userCredentials.email = this.email!;
  userCredentials.password = this.password!;

  this.authService.login(userCredentials)
    .then(response => {

      if (response && this.authService.token) {


        
        let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/viewCurso';
        
        this.router.navigateByUrl(redirect);
        
        
       
        
      }else {
        alert('Usuario o contraseña incorrectos');
      }
    })
    .catch(error => {
      alert("Usuario o contraseña invalida")
      console.log(error);
    }); }



  
}


