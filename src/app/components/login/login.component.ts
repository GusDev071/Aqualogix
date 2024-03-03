import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app'; // Import the 'firebase' module

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private router: Router) {}

  async onSubmit() {
    const { email, password } = this.loginForm.value;

    if (email && password) {
      try {
        await this.afAuth.signInWithEmailAndPassword(email, password);
        // Inicio de sesión exitoso, redirigir al inicio
        this.router.navigate(['/Home2']); //aqui pones a donde quieres que redirija
      } catch (error) {
        // Manejo de errores
      }
    }
  }

  async loginWithGoogle() {
    try {
      await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      // Inicio de sesión exitoso, redirigir al inicio
      this.router.navigate(['/Home']); //aqui pones a donde quieres que redirija
    } catch (error) {
      // Manejo de errores
    }
  }
}