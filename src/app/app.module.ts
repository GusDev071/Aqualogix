import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { Enviroment } from './enviroments/enviroment';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EditarComponent } from './components/editar/editar.component';
import { CrearComponent } from './components/crear/crear.component';
import { MostrarComponent } from './components/mostrar/mostrar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavUsuarioComponent } from './components/nav-usuario/nav-usuario.component';
import { Home2Component } from './components/home2/home2.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    EditarComponent,
    CrearComponent,
    MostrarComponent,
    NavbarComponent,
    NavUsuarioComponent,
    Home2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(Enviroment.firebaseConfig),
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
