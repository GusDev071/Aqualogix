import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { AuthService } from '../../auth.service'; // Asegúrate de usar la ruta correcta a tu servicio AuthService


@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  postForm: FormGroup = new FormGroup({
    'nombre': new FormControl(null, Validators.required),
    'calle': new FormControl(null, Validators.required),
    'colonia': new FormControl(null, Validators.required),
    'litros': new FormControl(null, Validators.required)
  });

  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit() {
    this.postForm = new FormGroup({
      'nombre': new FormControl(null, Validators.required),
      'calle': new FormControl(null, Validators.required),
      'colonia': new FormControl(null, Validators.required),
      'litros': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      this.authService.getUser().subscribe(user => {
        console.log('User:', user); // Agrega esta línea para registrar el objeto user en la consola
        if (user) {
          console.log('User ID:', user.uid); // Agrega esta línea para registrar el ID del usuario en la consola
          const newPost: Post = {
            ...this.postForm.value,
            userId: user.uid
          };
          this.postService.createPost(newPost).then(() => {
            this.postForm.reset();
          }).catch(error => {
            console.error('Error creating post:', error); // Agrega esta línea para registrar cualquier error que ocurra al crear el post
          });
        } else {
          console.log('User is not authenticated'); // Agrega esta línea para registrar un mensaje si el usuario no está autenticado
        }
      });
    }
  }
}