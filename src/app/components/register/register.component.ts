import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service'; // Import the AuthService


  @Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
  })
  export class RegisterComponent implements OnInit {
    registerForm: FormGroup = new FormGroup({});
    // Declare the authService property
    constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private router: Router, private authService: AuthService) {}

    ngOnInit() {
      this.registerForm = this.fb.group({
        nombre: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
    }

    onSubmit() {
      if (this.registerForm.valid) {
        const { nombre, email, password } = this.registerForm.value;
        this.authService.register(nombre, email, password).then(() => {
          // manejar éxito...
          this.router.navigate(['/Login']);
        }).catch(() => {
          // manejar error...
        });
      }
    }
  }

