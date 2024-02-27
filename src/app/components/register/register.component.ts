import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    const { email, password } = this.registerForm.value;

    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      // Registro exitoso, redirigir al inicio
      this.router.navigate(['/Home']);
    } catch (error) {
      // Manejo de errores
    }
  }
}