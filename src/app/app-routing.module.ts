import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearComponent } from './components/crear/crear.component';
import { EditarComponent } from './components/editar/editar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MostrarComponent } from './components/mostrar/mostrar.component';

const routes: Routes = [
  {path: '', redirectTo: 'Home', pathMatch: 'full'},
    {path: 'Home', component: HomeComponent},
    {path: 'Crear', component: CrearComponent},
    {path: 'Editar', component: EditarComponent},
    {path: 'Mostrar', component: MostrarComponent},
    {path: 'Login', component: LoginComponent},
    {path: 'Register', component: RegisterComponent},
    { path: 'Editar/:id', component: EditarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
