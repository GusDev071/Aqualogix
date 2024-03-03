import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-usuario',
  templateUrl: './nav-usuario.component.html',
  styleUrls: ['./nav-usuario.component.css']
})
export class NavUsuarioComponent implements OnInit {
  user$: Observable<any> = new Observable<any>(); // Initialize the "user$" property

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user$ = this.authService.getUser();
  }

  // Add the 'getUser' method to the 'AuthService' class
  getUser(): Observable<any> {
    // Implementation of the 'getUser' method
    return new Observable<any>(); // Add a return statement to fix the problem
  }
}